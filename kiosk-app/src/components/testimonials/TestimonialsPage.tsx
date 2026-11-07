'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Star,
  ThumbsUp,
  ArrowRight,
  User,
  Edit3,
  Phone,
  Send,
  MessageSquareHeart,
  MapPin,
  PhoneCall,
  Mail,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Camera,
  UploadCloud,
  X,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { HomeFooter } from '@/components/layout/HomeFooter';

// ─── Types ──────────────────────────────────────────────────────────────────

type Platform = 'opinion' | 'addReview' | 'google' | 'all';

interface Review {
  id: number | string;
  platform: 'google' | 'website';
  name: string;
  avatar: string; // initials fallback
  avatarUrl?: string | null;
  timeAgo: string;
  rating: number;
  text: string;
  likes: number;
  productImageUrl?: string | null;
  screenshotUrl?: string | null;
}

interface RatingSummary {
  average: number;
  total: number;
  distribution: { stars: number; pct: number }[];
}

// ─── Review Data ─────────────────────────────────────────────────────────────

const googleReviews: Review[] = [
  {
    id: 21,
    platform: 'google',
    name: 'Vikram Nair',
    avatar: 'VN',
    timeAgo: '1 day ago',
    rating: 5,
    text: 'Outstanding freshness. The cod I purchased was restaurant-quality. Highly recommend to everyone.',
    likes: 8,
  },
  {
    id: 22,
    platform: 'google',
    name: 'Shreya Patel',
    avatar: 'SP',
    timeAgo: '4 days ago',
    rating: 5,
    text: 'Excellent service and top-grade products. The trout was perfectly cleaned and ready to cook.',
    likes: 12,
  },
  {
    id: 23,
    platform: 'google',
    name: 'Manish Tiwari',
    avatar: 'MT',
    timeAgo: '1 week ago',
    rating: 4,
    text: 'Great range of seafood. Prices are fair and quality is consistently high. Very satisfied.',
    likes: 6,
  },
  {
    id: 24,
    platform: 'google',
    name: 'Lakshmi Raj',
    avatar: 'LR',
    timeAgo: '10 days ago',
    rating: 5,
    text: 'Ordered tuna steaks and they were perfect. No fishy smell, just pure freshness.',
    likes: 9,
  },
  {
    id: 25,
    platform: 'google',
    name: 'Rahul Yadav',
    avatar: 'RY',
    timeAgo: '2 weeks ago',
    rating: 5,
    text: 'The delivery was right on time and the fish was packed in ice. Excellent service overall.',
    likes: 11,
  },
  {
    id: 26,
    platform: 'google',
    name: 'Sunita Devi',
    avatar: 'SD',
    timeAgo: '3 weeks ago',
    rating: 5,
    text: 'Best fish market experience online. The haddock fillets were superb quality.',
    likes: 7,
  },
  {
    id: 27,
    platform: 'google',
    name: 'Arun Krishnan',
    avatar: 'AK',
    timeAgo: '1 month ago',
    rating: 4,
    text: 'Good freshness guarantee. Fish arrived well-packaged and within the delivery window.',
    likes: 5,
  },
  {
    id: 28,
    platform: 'google',
    name: 'Preethi Soman',
    avatar: 'PR',
    timeAgo: '5 weeks ago',
    rating: 5,
    text: 'I was skeptical about online seafood but FishCart changed my mind completely. Fantastic!',
    likes: 13,
  },
  {
    id: 29,
    platform: 'google',
    name: 'Vijay Rajan',
    avatar: 'VR',
    timeAgo: '6 weeks ago',
    rating: 5,
    text: 'Fresh mackerel every week. The quality is consistent and the service is impeccable.',
    likes: 10,
  },
];

// ─── Rating summaries per platform ───────────────────────────────────────────

const ratingSummaries: Record<'opinion' | 'google' | 'all', RatingSummary> = {
  opinion: {
    average: 4.9,
    total: 380,
    distribution: [
      { stars: 5, pct: 92 },
      { stars: 4, pct: 6 },
      { stars: 3, pct: 1 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 0 },
    ],
  },
  google: {
    average: 4.9,
    total: 745,
    distribution: [
      { stars: 5, pct: 90 },
      { stars: 4, pct: 7 },
      { stars: 3, pct: 2 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 0 },
    ],
  },
  all: {
    average: 4.9,
    total: 1248,
    distribution: [
      { stars: 5, pct: 90 },
      { stars: 4, pct: 7 },
      { stars: 3, pct: 2 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 0 },
    ],
  },
};

// ─── Customer Opinions Data ──────────────────────────────────────────────────

const customerOpinions = [
  {
    id: 101,
    name: 'Aisha Al-Mansoori',
    title: 'Unmatched Freshness',
    text: 'Every order from Fishcart arrives chilled and as fresh as if caught this morning. Keep up the high standard!',
    date: 'Yesterday',
    badge: 'Verified Buyer',
  },
  {
    id: 102,
    name: 'David Robinson',
    title: 'First-class Service',
    text: 'The packaging and on-time delivery exceeded my expectations. The salmon fillets were exceptionally clean and succulent.',
    date: '3 days ago',
    badge: 'Regular Customer',
  },
  {
    id: 103,
    name: 'Priya Sharma',
    title: 'Best Seafood in the City',
    text: 'Fishcart makes ordering seafood effortless. Their customer support team is always helpful and friendly.',
    date: '1 week ago',
    badge: 'Verified Buyer',
  },
];

// ─── Platform config ─────────────────────────────────────────────────────────

const PLATFORMS: {
  id: Platform;
  label: string;
  sublabel: string;
  renderIcon: (active: boolean) => React.ReactNode;
}[] = [
  {
    id: 'opinion',
    label: 'Share Opinion',
    sublabel: "We'd love to hear",
    renderIcon: (active: boolean) => (
      <svg
        viewBox="0 0 24 24"
        className={cn(
          'h-[20px] w-[20px]',
          active ? 'text-white' : 'text-[#0D55CF]'
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'addReview',
    label: 'Add Review',
    sublabel: 'Share your experience',
    renderIcon: (active: boolean) => (
      <Edit3
        className={cn(
          'h-[20px] w-[20px]',
          active ? 'text-white' : 'text-[#0D55CF]'
        )}
      />
    ),
  },
  {
    id: 'google',
    label: 'Google Reviews',
    sublabel: '4.9 (745 reviews)',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    ),
  },
  {
    id: 'all',
    label: 'All Reviews',
    sublabel: '1,248 reviews',
    renderIcon: (active: boolean) => (
      <svg
        viewBox="0 0 24 24"
        className={cn(
          'h-[20px] w-[20px]',
          active ? 'text-white' : 'text-[#0D55CF]'
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

// ─── Star Rating Input Component ─────────────────────────────────────────────

function StarRatingInput({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (r: number) => void;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        return (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-1 transition-transform hover:scale-110 focus:outline-none"
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              className={cn(
                'h-[26px] w-[26px] transition-colors',
                isFilled
                  ? 'fill-[#F59E0B] text-[#F59E0B]'
                  : 'fill-transparent text-slate-300 stroke-[1.6]'
              )}
            />
          </button>
        );
      })}
      <span className="ml-2 text-[13px] font-semibold text-slate-600">
        {rating > 0 ? `${rating}.0 / 5.0` : 'Tap to rate'}
      </span>
    </div>
  );
}

// ─── Platform icon (small, for use inside review cards) ──────────────────────

function PlatformIcon({
  platform,
  size = 'sm',
}: {
  platform: Review['platform'];
  size?: 'sm' | 'lg';
}) {
  const cls = size === 'lg' ? 'h-[28px] w-[28px]' : 'h-[18px] w-[18px]';

  if (platform === 'website') {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0D55CF]',
          size === 'lg' ? 'h-[36px] w-[36px]' : 'h-[26px] w-[26px]'
        )}
        title="Verified Website Review"
      >
        <Star className={cn('fill-[#0D55CF]', cls)} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-white',
        size === 'lg' ? 'h-[36px] w-[36px]' : 'h-[26px] w-[26px]'
      )}
    >
      <svg viewBox="0 0 24 24" className={cls}>
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
    </div>
  );
}

// ─── Star row ────────────────────────────────────────────────────────────────

function Stars({
  rating,
  size = 'sm',
}: {
  rating: number;
  size?: 'sm' | 'lg';
}) {
  const cls = size === 'lg' ? 'h-[16px] w-[16px]' : 'h-[13px] w-[13px]';
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            cls,
            i < rating
              ? 'fill-[#F59E0B] text-[#F59E0B]'
              : 'fill-slate-200 text-slate-200'
          )}
        />
      ))}
    </div>
  );
}

// ─── Review Card ─────────────────────────────────────────────────────────────

function ReviewCard({
  review,
  compact = false,
}: {
  review: Review;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex h-full flex-col justify-between overflow-hidden rounded-[14px] bg-white shadow-sm border border-slate-100',
        compact ? 'p-[12px]' : 'p-[16px]'
      )}
    >
      <div>
        {/* Header */}
        <div className="mb-[8px] flex items-start justify-between gap-2">
          <div className="flex items-center gap-[10px]">
            {review.avatarUrl ? (
              <div
                className={cn(
                  'relative shrink-0 overflow-hidden rounded-full border border-slate-200',
                  compact ? 'h-[30px] w-[30px]' : 'h-[36px] w-[36px]'
                )}
              >
                <Image
                  src={review.avatarUrl}
                  alt={review.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div
                className={cn(
                  'flex shrink-0 items-center justify-center rounded-full font-bold text-white',
                  compact
                    ? 'h-[30px] w-[30px] text-[11px]'
                    : 'h-[36px] w-[36px] text-[12px]',
                  review.platform === 'website' ? 'bg-[#0D55CF]' : 'bg-slate-700'
                )}
              >
                {review.avatar}
              </div>
            )}
            <div>
              <p
                className={cn(
                  'leading-tight font-bold text-slate-800',
                  compact ? 'text-[12px]' : 'text-[14px]'
                )}
              >
                {review.name}
              </p>
              <p
                className={cn(
                  'text-slate-400',
                  compact ? 'text-[10px]' : 'text-[11px]'
                )}
              >
                {review.timeAgo}
              </p>
            </div>
          </div>
          <PlatformIcon platform={review.platform} size="sm" />
        </div>

        {/* Stars */}
        <div className="mb-[7px]">
          <Stars rating={review.rating} />
        </div>

        {/* Text */}
        <p
          className={cn(
            'leading-snug text-slate-600',
            compact ? 'line-clamp-2 text-[11px]' : 'line-clamp-3 text-[12px]'
          )}
        >
          {review.text}
        </p>

        {/* Customer Product Image (if uploaded) */}
        {review.productImageUrl && (
          <div className="relative mt-2.5 h-28 w-full overflow-hidden rounded-[8px] border border-slate-100 bg-slate-50">
            <Image
              src={review.productImageUrl}
              alt={`Delivered seafood - ${review.name}`}
              fill
              className="object-cover transition-transform hover:scale-105 duration-300"
              sizes="200px"
            />
            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/65 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur-xs">
              📸 Customer Photo
            </span>
          </div>
        )}

        {/* Google Review Screenshot Proof (if uploaded) */}
        {review.screenshotUrl && (
          <div className="relative mt-2.5 h-28 w-full overflow-hidden rounded-[8px] border border-slate-100 bg-slate-50">
            <Image
              src={review.screenshotUrl}
              alt={`Google Review proof`}
              fill
              className="object-contain"
              sizes="200px"
            />
            <span className="absolute bottom-1.5 left-1.5 rounded-full bg-[#4285F4] px-2 py-0.5 text-[9px] font-semibold text-white">
              Google Review Proof
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className={cn(
          'flex items-center gap-3',
          compact ? 'mt-[6px]' : 'mt-[10px]'
        )}
      >
        <button className="flex items-center gap-1 text-slate-400 transition-colors hover:text-[#0D55CF]">
          <ThumbsUp
            className={cn(compact ? 'h-[8px] w-[8px]' : 'h-[12px] w-[12px]')}
          />
          <span
            className={cn(
              'font-medium',
              compact ? 'text-[10px]' : 'text-[11px]'
            )}
          >
            {review.likes}
          </span>
        </button>
        <button
          className={cn(
            'font-medium text-slate-400 transition-colors hover:text-slate-600',
            compact ? 'text-[10px]' : 'text-[11px]'
          )}
        >
          Helpful
        </button>
      </div>
    </div>
  );
}

// ─── Rating Bar ──────────────────────────────────────────────────────────────

function RatingBar({
  stars,
  pct,
  platform,
}: {
  stars: number;
  pct: number;
  platform: Platform;
}) {
  const barColor =
    platform === 'google'
      ? 'bg-[#4285F4]'
      : 'bg-[#0D55CF]';

  return (
    <div className="flex items-center gap-[8px]">
      <span className="w-3 shrink-0 text-right text-[11px] font-medium text-slate-500">
        {stars}
      </span>
      <Star className="h-[10px] w-[10px] shrink-0 fill-[#F59E0B] text-[#F59E0B]" />
      <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            barColor
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-7 shrink-0 text-right text-[11px] font-medium text-slate-500">
        {pct}%
      </span>
    </div>
  );
}

// ─── Happy Customer photos ────────────────────────────────────────────────────

const CUSTOMER_PHOTOS = [
  { src: '/assets/prod_1_salmon.jpg', rating: 4.5 },
  { src: '/assets/prod_6_tilapia.jpg', rating: 5 },
  { src: '/assets/prod_7_prawns.jpg', rating: 4.5 },
  { src: '/assets/prod_8_trout.jpg', rating: 5 },
  { src: '/assets/prod_2_seabass.jpg', rating: 5 },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export function TestimonialsPage() {
  const [activePlatform, setActivePlatform] = useState<Platform>('opinion');
  const [page, setPage] = useState(0);

  // Review Form States
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewPhoneCode, setReviewPhoneCode] = useState('+44');
  const [reviewPhone, setReviewPhone] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedReview, setSubmittedReview] = useState(false);

  // Live Sanity Data States
  const [liveApprovedReviews, setLiveApprovedReviews] = useState<Review[]>([]);
  const [liveGoogleReviews, setLiveGoogleReviews] = useState<Review[]>([]);
  const [liveOpinions, setLiveOpinions] = useState(customerOpinions);

  // Opinion Form States
  const [opinionName, setOpinionName] = useState('');
  const [opinionPhoneCode, setOpinionPhoneCode] = useState('+44');
  const [opinionPhone, setOpinionPhone] = useState('');
  const [opinionEmail, setOpinionEmail] = useState('');
  const [opinionTitle, setOpinionTitle] = useState('');
  const [opinionText, setOpinionText] = useState('');
  const [isSubmittingOpinion, setIsSubmittingOpinion] = useState(false);
  const [submittedOpinion, setSubmittedOpinion] = useState(false);
  const [opinionError, setOpinionError] = useState<string | null>(null);

  // Fetch live reviews and opinions from Sanity CMS
  useEffect(() => {
    async function loadData() {
      try {
        const [reviewsRes, opinionsRes] = await Promise.all([
          fetch('/api/reviews'),
          fetch('/api/opinions'),
        ]);

        if (reviewsRes.ok) {
          const revData = await reviewsRes.json();
          if (Array.isArray(revData.approvedReviews) && revData.approvedReviews.length > 0) {
            setLiveApprovedReviews(revData.approvedReviews);
          }
          if (Array.isArray(revData.googleReviews) && revData.googleReviews.length > 0) {
            setLiveGoogleReviews(revData.googleReviews);
          }
        }

        if (opinionsRes.ok) {
          const opData = await opinionsRes.json();
          if (Array.isArray(opData.opinions) && opData.opinions.length > 0) {
            const formatted = opData.opinions.map((o: any) => ({
              id: o._id,
              name: o.customerName,
              title: o.title || 'Customer Opinion',
              text: o.opinionText,
              date: o.submittedAt ? new Date(o.submittedAt).toLocaleDateString('en-GB') : 'Recent',
              badge: 'Verified Opinion',
            }));
            setLiveOpinions(formatted);
          }
        }
      } catch (err) {
        console.warn('Could not load live testimonials data:', err);
      }
    }

    loadData();
  }, []);

  const effectiveGoogleReviews =
    liveGoogleReviews.length > 0 ? liveGoogleReviews : googleReviews;

  // Compute displayed reviews: Approved customer reviews from CMS + Google reviews
  const allReviews = [...liveApprovedReviews, ...effectiveGoogleReviews];
  const sourceReviews =
    activePlatform === 'google'
      ? effectiveGoogleReviews
      : allReviews;

  const PAGE_SIZE = activePlatform === 'all' ? 8 : 3;
  const totalPages = Math.ceil(sourceReviews.length / PAGE_SIZE);
  const displayedReviews = sourceReviews.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  const summary =
    activePlatform === 'addReview'
      ? ratingSummaries['all']
      : ratingSummaries[activePlatform];

  // Reset page when platform changes
  const handlePlatformChange = (p: Platform) => {
    setActivePlatform(p);
    setPage(0);
  };

  const handleViewMore = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFormError('Image size should be less than 10MB.');
        return;
      }
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      if (formError) setFormError(null);
    }
  };

  // Submit Review to Sanity (Pending admin approval)
  const handleSubmitReview = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!reviewName.trim()) {
      setFormError('Please enter your name.');
      return;
    }
    if (!reviewRating || reviewRating < 1) {
      setFormError('Please select a star rating.');
      return;
    }
    if (!reviewPhone.trim() && !reviewEmail.trim()) {
      setFormError('Please provide either your phone number or your email address.');
      return;
    }
    if (reviewEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewEmail.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!reviewContent.trim()) {
      setFormError('Please write your review before submitting.');
      return;
    }

    setIsSubmittingReview(true);
    setFormError(null);

    try {
      const formData = new FormData();
      formData.append('customerName', reviewName.trim());
      formData.append('rating', String(reviewRating));
      formData.append('reviewText', reviewContent.trim());
      if (reviewPhone.trim()) {
        formData.append('phone', `${reviewPhoneCode} ${reviewPhone.trim()}`);
      }
      if (reviewEmail.trim()) {
        formData.append('email', reviewEmail.trim());
      }
      if (selectedImage) {
        formData.append('productImage', selectedImage);
      }

      const res = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setSubmittedReview(true);
    } catch (err: any) {
      console.error('Error submitting review:', err);
      setFormError(err.message || 'Error submitting review. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Submit Opinion to Sanity
  const handleSubmitOpinion = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!opinionName.trim()) {
      setOpinionError('Please enter your name.');
      return;
    }
    if (!opinionTitle.trim()) {
      setOpinionError('Please enter a title for your opinion.');
      return;
    }
    if (!opinionText.trim()) {
      setOpinionError('Please write your suggestions or opinion.');
      return;
    }
    if (!opinionPhone.trim() && !opinionEmail.trim()) {
      setOpinionError('Please provide either your phone number or email address.');
      return;
    }
    if (opinionEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(opinionEmail.trim())) {
      setOpinionError('Please enter a valid email address.');
      return;
    }

    setIsSubmittingOpinion(true);
    setOpinionError(null);

    try {
      const res = await fetch('/api/opinions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: opinionName.trim(),
          phone: opinionPhone.trim() ? `${opinionPhoneCode} ${opinionPhone.trim()}` : '',
          email: opinionEmail.trim(),
          title: opinionTitle.trim(),
          opinionText: opinionText.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit opinion');
      }

      setSubmittedOpinion(true);
      // Add immediately to local opinions list
      setLiveOpinions((prev) => [
        {
          id: Date.now(),
          name: opinionName.trim(),
          title: opinionTitle.trim() || 'Customer Opinion',
          text: opinionText.trim(),
          date: 'Just now',
          badge: 'Verified Opinion',
        },
        ...prev,
      ]);
    } catch (err: any) {
      console.error('Error submitting opinion:', err);
      setOpinionError(err.message || 'Error submitting opinion. Please try again.');
    } finally {
      setIsSubmittingOpinion(false);
    }
  };

  return (
    <div className="grid h-full min-h-0 w-full grid-rows-[minmax(0,1fr)_auto] gap-[var(--main-gap)] overflow-hidden portrait:flex portrait:flex-col portrait:h-auto portrait:overflow-visible portrait:pb-4">
      {/* ── Main Content ── */}
      <div className="flex min-h-0 flex-col gap-[12px] overflow-hidden">
        {/* ── ROW A: Hero + Platform tabs ── */}
        <div className="grid shrink-0 grid-cols-[1fr_auto] gap-[18px] portrait:flex portrait:flex-col portrait:gap-[12px]">
          {/* Left: heading + tabs */}
          <div className="flex min-w-0 flex-col gap-[12px]">
            <div className="relative flex flex-col justify-center overflow-hidden rounded-[8px] border border-white/20 bg-gradient-to-r from-[#F4F9FF] via-[#EAF3FF] to-[#D4E6FC] px-[clamp(8px,1.2vw,18px)] py-[clamp(6px,0.8vw,12px)]">
              <h1 className="text-[clamp(32px,min(3vw,4svh),44px)] leading-tight font-bold tracking-tight text-[#102B7B]">
                What Our Customers Say
              </h1>
              {/* Decorative wave */}
              <svg
                viewBox="0 0 80 12"
                className="mt-0.5 h-[clamp(8px,1vw,12px)] w-[clamp(50px,6vw,70px)]"
                fill="none"
              >
                <path
                  d="M0 6 Q10 0 20 6 T40 6 T60 6 T80 6"
                  stroke="#0D55CF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="mt-[clamp(2px,0.5vw,8px)] text-[clamp(11px,min(1vw,1.4svh),15px)] font-bold text-[#102B7B] opacity-90">
                We value every feedback. Here's what our amazing customers have
                to say about
                <br />
                Fishcart's fresh products and service.
              </p>
            </div>

            {/* Platform tabs */}
            <div className="grid grid-cols-4 gap-[10px] portrait:flex portrait:flex-wrap portrait:gap-[8px]">
              {PLATFORMS.map((p) => {
                const isActive = activePlatform === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handlePlatformChange(p.id)}
                    className={cn(
                      'flex items-center gap-[10px] rounded-[14px] border px-[14px] py-[12px] transition-all duration-200 text-left',
                      isActive
                        ? 'bg-[#0D55CF] text-white border-[#0D55CF] shadow-md shadow-blue-500/20'
                        : 'bg-white text-slate-800 border-slate-100 shadow-sm hover:border-[#0D55CF]/40'
                    )}
                  >
                    <span className="shrink-0">{p.renderIcon(isActive)}</span>
                    <span className="flex min-w-0 flex-col items-start">
                      <span className="truncate text-[13px] leading-tight font-bold">
                        {p.label}
                      </span>
                      <span
                        className={cn(
                          'text-[11px] leading-tight',
                          isActive ? 'text-blue-100' : 'text-slate-400'
                        )}
                      >
                        {p.sublabel}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── ROW B: Reviews section + Right panel ── */}
        <div
          className={cn(
            'grid min-h-0 flex-1 gap-[14px] overflow-hidden portrait:flex portrait:flex-col portrait:h-auto portrait:overflow-visible',
            activePlatform === 'google'
              ? 'grid-cols-[1fr_minmax(0,280px)]'
              : 'grid-cols-1'
          )}
        >
          {/* Main View Area */}
          {activePlatform === 'addReview' ? (
            <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto rounded-[16px] border border-slate-100 bg-white p-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              {submittedReview ? (
                <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 text-center p-8">
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
                    <CheckCircle2 className="h-[36px] w-[36px]" />
                  </div>
                  <div className="flex flex-col gap-1.5 max-w-md">
                    <h3 className="text-[22px] font-bold text-slate-900">
                      Thank You, {reviewName}!
                    </h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed">
                      Your review{selectedImage ? ' and product photo have' : ' has'} been submitted to our CMS. It will be verified by our team and published to the website shortly!
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => {
                        setReviewName('');
                        setReviewRating(0);
                        setReviewPhone('');
                        setReviewEmail('');
                        setReviewContent('');
                        setSelectedImage(null);
                        setImagePreview(null);
                        setSubmittedReview(false);
                        setFormError(null);
                      }}
                      className="rounded-[10px] border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Write Another Review
                    </button>
                    <button
                      onClick={() => {
                        setActivePlatform('all');
                        setSubmittedReview(false);
                      }}
                      className="rounded-[10px] bg-[#0D55CF] px-5 py-2.5 text-[13px] font-bold text-white hover:bg-[#0A40A0] transition-colors"
                    >
                      View All Reviews
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-[20px]">
                  {/* Header from user attachment */}
                  <div className="flex items-start gap-[16px]">
                    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#EBF3FF] text-[#0D55CF]">
                      <Edit3 className="h-[22px] w-[22px]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[22px] font-bold text-slate-900 leading-tight">
                        Share Your Review
                      </h2>
                      <p className="text-[13px] text-slate-500">
                        Tell us about your experience with Fishcart. Your feedback helps us serve you better.
                      </p>
                    </div>
                  </div>

                  {/* Row 1: Name and Rating */}
                  <div className="grid grid-cols-2 gap-[24px] portrait:flex portrait:flex-col">
                    {/* Your Name */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[13px] font-bold text-slate-800">
                        Your Name <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[16px] text-slate-400">
                          <User className="h-[18px] w-[18px]" />
                        </div>
                        <input
                          type="text"
                          value={reviewName}
                          onChange={(e) => {
                            setReviewName(e.target.value);
                            if (formError) setFormError(null);
                          }}
                          placeholder="Enter your name"
                          className="w-full rounded-[10px] border border-slate-200 py-[11px] pr-[16px] pl-[44px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                        />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[13px] font-bold text-slate-800">
                        Rating <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="flex h-[44px] items-center">
                        <StarRatingInput
                          rating={reviewRating}
                          setRating={(r) => {
                            setReviewRating(r);
                            if (formError) setFormError(null);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Contact Information (Either Phone Number or Email Address is required) */}
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <label className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5">
                        <span>Contact Information</span>
                        <span className="text-red-500 font-bold">*</span>
                        <span className="text-[12px] font-normal text-slate-500">
                          (Either Phone Number or Email is required)
                        </span>
                      </label>
                      <span className="text-[11px] font-medium">
                        {reviewPhone.trim() && reviewEmail.trim() ? (
                          <span className="text-emerald-600 font-semibold">✓ Both provided</span>
                        ) : reviewPhone.trim() ? (
                          <span className="text-emerald-600 font-semibold">✓ Phone provided (Email optional)</span>
                        ) : reviewEmail.trim() ? (
                          <span className="text-emerald-600 font-semibold">✓ Email provided (Phone optional)</span>
                        ) : (
                          <span className="text-amber-600 font-medium">Please enter at least one *</span>
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-[24px] portrait:flex portrait:flex-col">
                      {/* Phone Number */}
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-slate-700">
                            Phone Number {!reviewEmail.trim() && <span className="text-red-500 font-bold">*</span>}
                          </span>
                          {reviewPhone.trim() ? (
                            <span className="text-[11px] text-emerald-600 font-medium">Provided</span>
                          ) : !reviewEmail.trim() ? (
                            <span className="text-[11px] text-amber-600">Required if no email</span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Optional</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <select
                            value={reviewPhoneCode}
                            onChange={(e) => setReviewPhoneCode(e.target.value)}
                            className="rounded-[10px] border border-slate-200 bg-white px-[12px] py-[11px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                          >
                            <option value="+44">+44 (UK)</option>
                            <option value="+91">+91 (IN)</option>
                            <option value="+1">+1 (US)</option>
                            <option value="+971">+971 (UAE)</option>
                          </select>
                          <div className="relative flex-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[16px] text-slate-400">
                              <Phone className="h-[18px] w-[18px]" />
                            </div>
                            <input
                              type="tel"
                              value={reviewPhone}
                              onChange={(e) => {
                                setReviewPhone(e.target.value);
                                if (formError) setFormError(null);
                              }}
                              placeholder="Enter your phone number"
                              className="w-full rounded-[10px] border border-slate-200 py-[11px] pr-[16px] pl-[44px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-slate-700">
                            Email Address {!reviewPhone.trim() && <span className="text-red-500 font-bold">*</span>}
                          </span>
                          {reviewEmail.trim() ? (
                            <span className="text-[11px] text-emerald-600 font-medium">Provided</span>
                          ) : !reviewPhone.trim() ? (
                            <span className="text-[11px] text-amber-600">Required if no phone</span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Optional</span>
                          )}
                        </div>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[16px] text-slate-400">
                            <Mail className="h-[18px] w-[18px]" />
                          </div>
                          <input
                            type="email"
                            value={reviewEmail}
                            onChange={(e) => {
                              setReviewEmail(e.target.value);
                              if (formError) setFormError(null);
                            }}
                            placeholder="Enter your email address"
                            className="w-full rounded-[10px] border border-slate-200 py-[11px] pr-[16px] pl-[44px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Product Photo Upload (Customer Photo) */}
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-bold text-slate-800">
                      Product Photo{' '}
                      <span className="font-normal text-slate-400 text-[12px]">
                        (Optional - Show how your seafood or meat looked!)
                      </span>
                    </label>
                    {imagePreview ? (
                      <div className="relative flex items-center gap-3 rounded-[10px] border border-slate-200 bg-slate-50 p-2.5">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[8px] border border-slate-200">
                          <Image
                            src={imagePreview}
                            alt="Product preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col min-w-0">
                          <span className="text-[12px] font-semibold text-slate-800 truncate">
                            {selectedImage?.name}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {(selectedImage ? selectedImage.size / (1024 * 1024) : 0).toFixed(2)} MB • Ready to upload
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                          }}
                          className="rounded-full bg-slate-200 p-1.5 text-slate-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                          title="Remove photo"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-slate-200 bg-slate-50/60 p-4 transition-colors hover:border-[#0D55CF]/50 hover:bg-blue-50/30">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Camera className="h-[20px] w-[20px] text-[#0D55CF]" />
                          <span className="text-[13px] font-semibold text-slate-700">
                            Click to upload photo of your product
                          </span>
                        </div>
                        <span className="mt-1 text-[11px] text-slate-400">
                          Show other customers how your fish looked (PNG, JPG, WEBP up to 10MB)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Row 4: Your Review */}
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-bold text-slate-800">
                      Your Review <span className="text-red-500 font-bold">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={reviewContent}
                      onChange={(e) => {
                        setReviewContent(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="Write your review or experience here..."
                      className="w-full resize-none rounded-[10px] border border-slate-200 p-[14px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                    />
                  </div>

                  {/* Row 5: Submit Row */}
                  <div className="flex items-center justify-between pt-2 portrait:flex-col portrait:gap-3 portrait:items-stretch">
                    <div>
                      {formError && (
                        <div className="flex items-center gap-1.5 text-[12px] font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-[8px]">
                          <AlertCircle className="h-[14px] w-[14px] shrink-0" />
                          <span>{formError}</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      disabled={isSubmittingReview}
                      onClick={handleSubmitReview}
                      className={cn(
                        'flex items-center justify-center gap-2 rounded-[10px] bg-[#0D55CF] px-[32px] py-[12px] text-[14px] font-bold text-white shadow-sm transition-all hover:bg-[#0A40A0] hover:shadow active:scale-[0.99] portrait:w-full',
                        isSubmittingReview && 'opacity-70 cursor-not-allowed'
                      )}
                    >
                      {isSubmittingReview ? (
                        <>
                          <Loader2 className="h-[16px] w-[16px] animate-spin" />
                          Submitting Review...
                        </>
                      ) : (
                        <>
                          <Send className="h-[16px] w-[16px]" />
                          Submit Review
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : activePlatform === 'opinion' ? (
            <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto rounded-[16px] border border-slate-100 bg-white p-[24px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
              {submittedOpinion ? (
                <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 text-center p-8">
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
                    <CheckCircle2 className="h-[36px] w-[36px]" />
                  </div>
                  <div className="flex flex-col gap-1.5 max-w-md">
                    <h3 className="text-[22px] font-bold text-slate-900">
                      Thank You, {opinionName}!
                    </h3>
                    <p className="text-[13px] text-slate-600 leading-relaxed">
                      Your opinion has been received in our CMS and sent directly to our team. We appreciate your valuable feedback!
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => {
                        setOpinionName('');
                        setOpinionTitle('');
                        setOpinionText('');
                        setOpinionPhone('');
                        setOpinionEmail('');
                        setSubmittedOpinion(false);
                        setOpinionError(null);
                      }}
                      className="rounded-[10px] border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Send Another Opinion
                    </button>
                    <button
                      onClick={() => {
                        setActivePlatform('all');
                        setSubmittedOpinion(false);
                      }}
                      className="rounded-[10px] bg-[#0D55CF] px-5 py-2.5 text-[13px] font-bold text-white hover:bg-[#0A40A0] transition-colors"
                    >
                      View All Reviews
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-[20px]">
                  {/* Top Header from 2nd image */}
                  <div className="flex items-start gap-[16px]">
                    <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-[#EBF3FF] text-[#0D55CF]">
                      <MessageSquareHeart className="h-[24px] w-[24px]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[22px] font-bold text-slate-900 leading-tight">
                        We Value Your Opinion!
                      </h2>
                      <p className="text-[13px] text-slate-500">
                        Your opinion helps us improve our products and service every day.
                      </p>
                    </div>
                  </div>

                  {/* Row 1: Your Name & Title */}
                  <div className="grid grid-cols-2 gap-[24px] portrait:flex portrait:flex-col">
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[13px] font-bold text-slate-800">
                        Your Name <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[16px] text-slate-400">
                          <User className="h-[18px] w-[18px]" />
                        </div>
                        <input
                          type="text"
                          value={opinionName}
                          onChange={(e) => {
                            setOpinionName(e.target.value);
                            if (opinionError) setOpinionError(null);
                          }}
                          placeholder="Enter your name"
                          className="w-full rounded-[10px] border border-slate-200 py-[11px] pr-[16px] pl-[44px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[13px] font-bold text-slate-800">
                        Title <span className="text-red-500 font-bold">*</span>
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[16px] text-slate-400">
                          <Edit3 className="h-[18px] w-[18px]" />
                        </div>
                        <input
                          type="text"
                          value={opinionTitle}
                          onChange={(e) => {
                            setOpinionTitle(e.target.value);
                            if (opinionError) setOpinionError(null);
                          }}
                          placeholder="e.g. Great Service, Excellent Quality"
                          className="w-full rounded-[10px] border border-slate-200 py-[11px] pr-[16px] pl-[44px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Your Suggestion / Opinion */}
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[13px] font-bold text-slate-800">
                      Your Suggestion / Opinion <span className="text-red-500 font-bold">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={opinionText}
                      onChange={(e) => {
                        setOpinionText(e.target.value);
                        if (opinionError) setOpinionError(null);
                      }}
                      placeholder="Write your suggestions or opinion here..."
                      className="w-full resize-none rounded-[10px] border border-slate-200 p-[14px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                    />
                  </div>

                  {/* Row 3: Contact Information (Either Phone Number or Email Address is required) */}
                  <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <label className="text-[13px] font-bold text-slate-800 flex items-center gap-1.5">
                        <span>Contact Information</span>
                        <span className="text-red-500 font-bold">*</span>
                        <span className="text-[12px] font-normal text-slate-500">
                          (Either Phone Number or Email is required)
                        </span>
                      </label>
                      <span className="text-[11px] font-medium">
                        {opinionPhone.trim() && opinionEmail.trim() ? (
                          <span className="text-emerald-600 font-semibold">✓ Both provided</span>
                        ) : opinionPhone.trim() ? (
                          <span className="text-emerald-600 font-semibold">✓ Phone provided (Email optional)</span>
                        ) : opinionEmail.trim() ? (
                          <span className="text-emerald-600 font-semibold">✓ Email provided (Phone optional)</span>
                        ) : (
                          <span className="text-amber-600 font-medium">Please enter at least one *</span>
                        )}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-[24px] portrait:flex portrait:flex-col">
                      {/* Phone Number */}
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-slate-700">
                            Phone Number {!opinionEmail.trim() && <span className="text-red-500 font-bold">*</span>}
                          </span>
                          {opinionPhone.trim() ? (
                            <span className="text-[11px] text-emerald-600 font-medium">Provided</span>
                          ) : !opinionEmail.trim() ? (
                            <span className="text-[11px] text-amber-600">Required if no email</span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Optional</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <select
                            value={opinionPhoneCode}
                            onChange={(e) => setOpinionPhoneCode(e.target.value)}
                            className="rounded-[10px] border border-slate-200 bg-white px-[12px] py-[11px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                          >
                            <option value="+44">+44 (UK)</option>
                            <option value="+91">+91 (IN)</option>
                            <option value="+1">+1 (US)</option>
                            <option value="+971">+971 (UAE)</option>
                          </select>
                          <div className="relative flex-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[16px] text-slate-400">
                              <Phone className="h-[18px] w-[18px]" />
                            </div>
                            <input
                              type="tel"
                              value={opinionPhone}
                              onChange={(e) => {
                                setOpinionPhone(e.target.value);
                                if (opinionError) setOpinionError(null);
                              }}
                              placeholder="Enter your phone number"
                              className="w-full rounded-[10px] border border-slate-200 py-[11px] pr-[16px] pl-[44px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-[6px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-slate-700">
                            Email Address {!opinionPhone.trim() && <span className="text-red-500 font-bold">*</span>}
                          </span>
                          {opinionEmail.trim() ? (
                            <span className="text-[11px] text-emerald-600 font-medium">Provided</span>
                          ) : !opinionPhone.trim() ? (
                            <span className="text-[11px] text-amber-600">Required if no phone</span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Optional</span>
                          )}
                        </div>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[16px] text-slate-400">
                            <Mail className="h-[18px] w-[18px]" />
                          </div>
                          <input
                            type="email"
                            value={opinionEmail}
                            onChange={(e) => {
                              setOpinionEmail(e.target.value);
                              if (opinionError) setOpinionError(null);
                            }}
                            placeholder="Enter your email address"
                            className="w-full rounded-[10px] border border-slate-200 py-[11px] pr-[16px] pl-[44px] text-[13px] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Submit Button (matching 2nd image) */}
                  <div className="flex items-center justify-between pt-2 portrait:flex-col portrait:gap-3 portrait:items-stretch">
                    <div>
                      {opinionError && (
                        <div className="flex items-center gap-1.5 text-[12px] font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-[8px]">
                          <AlertCircle className="h-[14px] w-[14px]" />
                          <span>{opinionError}</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      disabled={isSubmittingOpinion}
                      onClick={handleSubmitOpinion}
                      className={cn(
                        'flex items-center justify-center gap-2 rounded-[10px] bg-[#0D55CF] px-[36px] py-[12px] text-[14px] font-bold text-white shadow-sm transition-all hover:bg-[#0A40A0] hover:shadow active:scale-[0.99] portrait:w-full',
                        isSubmittingOpinion && 'opacity-70 cursor-not-allowed'
                      )}
                    >
                      {isSubmittingOpinion ? (
                        <>
                          <Loader2 className="h-[16px] w-[16px] animate-spin" />
                          Submitting Opinion...
                        </>
                      ) : (
                        <>
                          <Send className="h-[16px] w-[16px]" />
                          Submit Opinion
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex min-h-0 flex-col gap-[10px] overflow-hidden">
              {/* Rating summary + cards row */}
              <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,180px)_1fr] gap-[14px] overflow-hidden portrait:flex portrait:flex-col portrait:h-auto portrait:overflow-visible">
                {/* Rating summary */}
                <div className="flex min-h-0 flex-col justify-start gap-[6px] pt-2 portrait:px-6 portrait:pb-2">
                  <div
                    className={cn(
                      'leading-none font-bold text-[#0D55CF]',
                      'text-[40px]'
                    )}
                  >
                    {summary.average}
                  </div>
                  <Stars rating={5} size="lg" />
                  <p className="text-[11px] text-slate-500">
                    Based on {summary.total} reviews
                  </p>
                  <div className="mt-[8px] flex flex-col gap-[4px]">
                    {summary.distribution.map((d) => (
                      <RatingBar
                        key={d.stars}
                        stars={d.stars}
                        pct={d.pct}
                        platform={activePlatform}
                      />
                    ))}
                  </div>
                </div>

                {/* Right column: Review cards + View More + Happy Customers */}
                <div className="flex min-h-0 flex-col gap-[10px] overflow-hidden portrait:h-auto portrait:overflow-visible">
                  {/* Review cards */}
                  {activePlatform === 'all' ? (
                    <div className="grid min-h-0 grid-cols-4 grid-rows-2 gap-[8px] overflow-hidden portrait:grid-cols-1 portrait:grid-rows-none portrait:h-auto portrait:overflow-visible">
                      {displayedReviews.map((r) => (
                        <ReviewCard key={r.id} review={r} compact />
                      ))}
                    </div>
                  ) : (
                    <div className="grid min-h-0 grid-cols-3 gap-[8px] overflow-hidden portrait:grid-cols-1 portrait:h-auto portrait:overflow-visible">
                      {displayedReviews.map((r) => (
                        <ReviewCard key={r.id} review={r} />
                      ))}
                    </div>
                  )}

                  {/* View More button */}
                  {totalPages > 1 && (
                    <div className="flex shrink-0 justify-end">
                      <button
                        onClick={handleViewMore}
                        className="flex items-center gap-2 rounded-full border border-[#0D55CF] px-[22px] py-[10px] text-[13px] font-bold text-[#0D55CF] transition-all hover:bg-[#0D55CF] hover:text-white"
                      >
                        View More Reviews{' '}
                        <ArrowRight className="h-[14px] w-[14px]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Happy Customers row ── */}
              {activePlatform !== 'all' && (
                <div className="mt-auto shrink-0">
                  <h3 className="mb-[8px] text-center text-[18px] font-bold text-[#0D55CF]">
                    Happy Customers
                  </h3>
                  <div className="grid w-full grid-cols-5 gap-[8px] portrait:grid-cols-3 portrait:overflow-hidden">
                    {CUSTOMER_PHOTOS.map((c, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-[12px] bg-white"
                      >
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={c.src}
                            alt="Happy customer"
                            fill
                            className="object-cover"
                            sizes="150px"
                          />
                        </div>
                        <div className="flex justify-center py-[5px]">
                          <Stars rating={Math.floor(c.rating)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Right panel: We're Everywhere + Hygiene rating */}
          {activePlatform === 'google' && (
            <div className="flex min-h-0 flex-col gap-[10px] overflow-x-hidden overflow-y-auto">
              {/* We're Everywhere */}
              <div className="shrink-0 rounded-[14px] bg-white p-[16px]">
                <h3 className="mb-[5px] text-[14px] font-bold text-[#0D55CF]">
                  We're Everywhere!
                </h3>
                <p className="mb-[9px] text-[11px] leading-snug text-slate-500">
                  Follow us on social media to stay updated with fresh arrivals,
                  recipes &amp; more.
                </p>
                <div className="mb-[8px] flex gap-[10px]">
                  {/* Facebook */}
                  <a
                    href="#"
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="#"
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] text-white transition-opacity hover:opacity-90"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="#"
                    className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FF0000] text-white transition-opacity hover:opacity-90"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                      fill="currentColor"
                    >
                      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                    </svg>
                  </a>
                </div>
                <p className="text-[11px] font-semibold text-slate-600">
                  @fishcart.dailyfresh
                </p>
                <a
                  href="#"
                  className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#0D55CF] hover:underline"
                >
                  View All Posts <ArrowRight className="h-[10px] w-[10px]" />
                </a>
              </div>

              {/* Food Hygiene Rating */}
              <div className="shrink-0 rounded-[14px] bg-white p-[16px]">
                <h3 className="mb-[5px] text-[14px] font-bold text-[#0D55CF]">
                  Food Hygiene Rating
                </h3>
                <p className="mb-[8px] text-[11px] leading-snug text-slate-500">
                  We are committed to the highest standards of hygiene and food
                  safety.
                </p>
                <div className="flex items-center justify-between">
                  {/* Rating circles 0–5 */}
                  <div className="flex items-center gap-[5px]">
                    {[0, 1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="flex h-[28px] w-[28px] items-center justify-center rounded-full border-2 border-slate-300 text-[11px] font-bold text-slate-500"
                      >
                        {n}
                      </div>
                    ))}
                    <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#2E7D32] text-[13px] font-bold text-white">
                      5
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="flex flex-col items-end">
                    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#2E7D32]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-[22px] w-[22px] text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p className="mt-0.5 text-right text-[9px] leading-tight font-semibold text-slate-400">
                      Rated by
                      <br />
                      Food Standards
                      <br />
                      Agency
                    </p>
                  </div>
                </div>
                <p className="mt-[5px] text-[10px] font-bold tracking-widest text-[#2E7D32] uppercase">
                  Very Good
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer row ── */}
      <div className="shrink-0 portrait:hidden">
        <HomeFooter />
      </div>

      {/* Portrait-only Mobile Footer */}
      <div className="hidden portrait:flex portrait:flex-col portrait:gap-3 portrait:px-2 portrait:pb-4">
        <div className="flex shrink-0 gap-3 w-full">
          <div className="relative flex aspect-[4/3] flex-1 flex-col overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="relative z-10 flex flex-col">
              <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">About Us</h4>
              <p className="text-[13px] leading-[1.3] font-medium text-slate-500">Delivering fresh & healthy food to your family.</p>
            </div>
          </div>
          <div className="relative flex aspect-[4/3] flex-1 flex-col overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="relative z-10 flex flex-col">
              <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">Our Stories</h4>
              <p className="max-w-[90%] text-[13px] leading-[1.3] font-medium text-slate-500">From ocean to your kitchen, journey of freshness.</p>
            </div>
            <div className="absolute right-1 bottom-1 h-12 w-16 opacity-90 mix-blend-multiply">
              <Image src="/assets/boat_exact.png" alt="Our Stories" fill className="object-contain object-right-bottom" />
            </div>
          </div>
        </div>
        <div className="relative flex shrink-0 flex-col justify-center gap-2 overflow-hidden rounded-[12px] border border-gray-50 bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="relative z-10 flex w-full flex-col items-center gap-2 text-center">
            <h4 className="mb-1 text-[18px] font-bold text-[#0D55CF]">Contact Us</h4>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-[#0D55CF]" />
              <span className="text-[14px] leading-tight font-medium text-slate-600">Unit 5 Hythe Quay, England, CO2 8JB</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <PhoneCall className="h-4 w-4 shrink-0 text-[#0D55CF]" />
              <span className="text-[14px] font-bold text-[#0B1F5B]">+44 1206 123456</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[#0D55CF]" />
              <span className="text-[14px] font-bold text-[#0D55CF]">hello@fishcart.co.uk</span>
            </div>
          </div>
          <div className="absolute top-1/2 right-2 h-14 w-16 -translate-y-1/2 opacity-20 mix-blend-multiply">
            <Image src="/assets/fishdd.png" alt="Address" fill className="object-contain object-right" />
          </div>
        </div>
      </div>
    </div>
  );
}
