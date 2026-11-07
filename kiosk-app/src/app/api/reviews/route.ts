import { NextRequest, NextResponse } from 'next/server';
import { getWriteClient, sanityFetch, urlForImage } from '@/lib/sanity';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const customerName = formData.get('customerName') as string | null;
    const ratingRaw = formData.get('rating') as string | null;
    const reviewText = formData.get('reviewText') as string | null;
    const phone = (formData.get('phone') as string | null) || '';
    const email = (formData.get('email') as string | null) || '';
    const imageFile = formData.get('productImage') as File | null;

    if (!customerName || !customerName.trim()) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }

    const rating = Number(ratingRaw);
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Valid rating between 1 and 5 is required' }, { status: 400 });
    }

    // Either phone or email is required
    if (!phone.trim() && !email.trim()) {
      return NextResponse.json(
        { error: 'Contact details required: Please provide either your phone number or your email address.' },
        { status: 400 }
      );
    }

    if (!reviewText || !reviewText.trim()) {
      return NextResponse.json({ error: 'Review text is required' }, { status: 400 });
    }

    const writeClient = getWriteClient();
    let imageAssetRef: any = undefined;

    // Handle optional product photo upload
    if (imageFile && imageFile.size > 0 && typeof imageFile.arrayBuffer === 'function') {
      try {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadedAsset = await writeClient.assets.upload('image', buffer, {
          filename: imageFile.name || 'product-review.jpg',
          contentType: imageFile.type || 'image/jpeg',
        });
        imageAssetRef = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedAsset._id,
          },
        };
      } catch (uploadErr) {
        console.error('Error uploading product photo to Sanity:', uploadErr);
        // Continue creating review even if image upload had an issue
      }
    }

    // Create the customer review document in PENDING state (approved: false)
    const createdReview = await writeClient.create({
      _type: 'customerReview',
      customerName: customerName.trim(),
      rating,
      reviewText: reviewText.trim(),
      phone: phone.trim(),
      email: email.trim(),
      approved: false, // Stays in pending until approved by CMS admin
      submittedAt: new Date().toISOString(),
      productImage: imageAssetRef,
      likes: 0,
      displayOrder: 1,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully! It is now pending approval in the CMS.',
        reviewId: createdReview._id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error creating review in Sanity:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to submit review' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // 1. Fetch Approved Customer Reviews from Sanity
    const approvedReviewsQuery = `*[_type == "customerReview" && approved == true] | order(displayOrder asc, submittedAt desc) {
      _id,
      customerName,
      rating,
      reviewText,
      productImage,
      submittedAt,
      likes
    }`;

    // 2. Fetch Google Reviews from Sanity
    const googleReviewsQuery = `*[_type == "googleReview" && visibility != false] | order(displayOrder asc, _createdAt desc) {
      _id,
      authorName,
      authorAvatar,
      rating,
      reviewText,
      reviewDate,
      likes,
      googleReviewScreenshot
    }`;

    const [approvedReviews, googleReviews] = await Promise.all([
      sanityFetch<any[]>(approvedReviewsQuery, {}, { bypassCache: true }),
      sanityFetch<any[]>(googleReviewsQuery, {}, { bypassCache: true }),
    ]);

    const formattedApproved = (approvedReviews || []).map((r) => ({
      id: r._id,
      platform: 'website' as const,
      name: r.customerName,
      avatar: r.customerName
        ?.split(' ')
        .map((p: string) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'CR',
      timeAgo: r.submittedAt
        ? new Date(r.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
        : 'Recent',
      rating: r.rating || 5,
      text: r.reviewText,
      likes: r.likes || 0,
      productImageUrl: r.productImage ? urlForImage(r.productImage) : null,
    }));

    const formattedGoogle = (googleReviews || []).map((r) => ({
      id: r._id,
      platform: 'google' as const,
      name: r.authorName,
      avatar: r.authorName
        ?.split(' ')
        .map((p: string) => p[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'GR',
      avatarUrl: r.authorAvatar ? urlForImage(r.authorAvatar) : null,
      timeAgo: r.reviewDate || 'Recent',
      rating: r.rating || 5,
      text: r.reviewText,
      likes: r.likes || 0,
      screenshotUrl: r.googleReviewScreenshot ? urlForImage(r.googleReviewScreenshot) : null,
    }));

    return NextResponse.json({
      approvedReviews: formattedApproved,
      googleReviews: formattedGoogle,
    });
  } catch (err: any) {
    console.error('Error fetching live reviews from Sanity:', err);
    return NextResponse.json({
      approvedReviews: [],
      googleReviews: [],
    });
  }
}
