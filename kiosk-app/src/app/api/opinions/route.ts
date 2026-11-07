import { NextRequest, NextResponse } from 'next/server';
import { getWriteClient, sanityFetch } from '@/lib/sanity';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, phone, title, opinionText } = body;

    if (!customerName || typeof customerName !== 'string' || !customerName.trim()) {
      return NextResponse.json({ error: 'Customer name is required' }, { status: 400 });
    }

    if (!opinionText || typeof opinionText !== 'string' || !opinionText.trim()) {
      return NextResponse.json({ error: 'Opinion text is required' }, { status: 400 });
    }

    const writeClient = getWriteClient();
    const createdOpinion = await writeClient.create({
      _type: 'customerOpinion',
      customerName: customerName.trim(),
      phone: phone?.trim() || '',
      title: title?.trim() || '',
      opinionText: opinionText.trim(),
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your opinion has been received and sent to the team.',
        opinionId: createdOpinion._id,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error submitting opinion to Sanity:', err);
    return NextResponse.json(
      { error: err?.message || 'Failed to submit opinion' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const query = `*[_type == "customerOpinion"] | order(submittedAt desc)[0...20] {
      _id,
      customerName,
      title,
      opinionText,
      submittedAt,
      status
    }`;
    const opinions = await sanityFetch(query);
    return NextResponse.json({ opinions: opinions || [] });
  } catch (err: any) {
    console.error('Error fetching opinions:', err);
    return NextResponse.json({ opinions: [] });
  }
}
