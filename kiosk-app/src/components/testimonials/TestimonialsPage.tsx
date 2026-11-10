'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Star,
  ArrowRight,
  User,
  Edit3,
  Phone,
  Send,
  MessageSquareHeart,
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
import { HomeFooter, MobileFooter } from '@/components/layout/HomeFooter';

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
  productImageUrl?: string | null;
  screenshotUrl?: string | null;
}

interface RatingSummary {
  average: number;
  total: number;
  distribution: { stars: number; pct: number }[];
}

// ─── Review Data ─────────────────────────────────────────────────────────────

// ─── Input Validation Helpers ────────────────────────────────────────────────

function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return false;
  // Disallow any letters
  if (/[a-zA-Z]/.test(trimmed)) return false;
  // Must have between 7 and 15 digits
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// ─── Google SVG & Avatar helpers ─────────────────────────────────────────────

function GoogleGIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
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
  );
}

function getAvatarBg(name: string, avatar: string) {
  if (name.includes('Arun') || avatar === 'A') return 'bg-[#00897B]';
  if (name.includes('Lekshmi') || avatar === 'L') return 'bg-[#5B54D6]';
  if (name.includes('Praveen') || avatar === 'P') return 'bg-[#5B54D6]';
  const colors = ['bg-[#5B54D6]', 'bg-[#00897B]', 'bg-[#1E88E5]', 'bg-[#E53935]', 'bg-[#8E24AA]', 'bg-[#D81B60]'];
  const charCode = (name.charCodeAt(0) || 0) + (name.charCodeAt(name.length - 1) || 0);
  return colors[charCode % colors.length];
}

// ─── Review Data (Dummy Google Reviews as in attached image) ─────────────────

const googleReviews: Review[] = [
  {
    id: 'g-praveen-das',
    platform: 'google',
    name: 'Praveen Das',
    avatar: 'P',
    timeAgo: '3 days ago',
    rating: 5,
    text: 'Excellent quality and super fresh products. Very satisfied!',
  },
  {
    id: 'g-lekshmi-p',
    platform: 'google',
    name: 'Lekshmi P',
    avatar: 'L',
    timeAgo: '5 days ago',
    rating: 5,
    text: 'Great service and fresh fish every time.',
  },
  {
    id: 'g-arun-raj',
    platform: 'google',
    name: 'Arun Raj',
    avatar: 'A',
    timeAgo: '6 days ago',
    rating: 5,
    text: 'Wide variety and good pricing. Highly recommend Fishcart.',
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
    label: 'Your Suggestions',
    sublabel: "Customers' voices",
    renderIcon: (active: boolean) => (
      <MessageSquareHeart
        className={cn(
          'h-[20px] w-[20px]',
          active ? 'text-white' : 'text-[#0D55CF]'
        )}
      />
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
    renderIcon: () => <GoogleGIcon className="h-[20px] w-[20px]" />,
  },
  {
    id: 'all',
    label: 'All Reviews',
    sublabel: '1,248 reviews',
    renderIcon: (active: boolean) => (
      <Star
        className={cn(
          'h-[20px] w-[20px]',
          active ? 'text-white' : 'text-[#0D55CF]'
        )}
        fill="none"
        strokeWidth={1.8}
      />
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

// ─── Contact Information Fields Component ────────────────────────────────────

function ContactInfoFields({
  phoneCode,
  onPhoneCodeChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
}: {
  phoneCode: string;
  onPhoneCodeChange: (code: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <label className="text-[clamp(13px,1.3svh,16px)] font-bold text-slate-800 flex items-center gap-1.5 flex-wrap">
        <span>Contact Information</span>
        <span className="text-[clamp(12px,1.15svh,14px)] font-normal text-slate-500">
          (Either Phone Number or Email is required)
        </span>
      </label>

      <div className="grid grid-cols-2 gap-[24px] portrait:flex portrait:flex-col portrait:gap-[14px]">
        {/* Phone Number */}
        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center justify-between">
            <span className="text-[clamp(12px,1.2svh,14px)] font-semibold text-slate-700">
              Phone Number
            </span>
            {isValidPhone(phone) ? (
              <span className="text-[11px] text-emerald-600 font-medium">✓ Valid</span>
            ) : phone.trim() ? (
              <span className="text-[11px] text-red-500 font-medium">Invalid (digits only)</span>
            ) : null}
          </div>
          <div className="flex gap-2">
            <select
              value={phoneCode}
              onChange={(e) => onPhoneCodeChange(e.target.value)}
              className="rounded-[10px] border border-slate-200 bg-white px-[12px] py-[clamp(10px,1.35svh,16px)] text-[clamp(13px,1.3svh,15px)] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
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
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full rounded-[10px] border border-slate-200 py-[clamp(10px,1.35svh,16px)] pr-[16px] pl-[44px] text-[clamp(13px,1.3svh,15px)] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
              />
            </div>
          </div>
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-[6px]">
          <div className="flex items-center justify-between">
            <span className="text-[clamp(12px,1.2svh,14px)] font-semibold text-slate-700">
              Email Address
            </span>
            {isValidEmail(email) ? (
              <span className="text-[11px] text-emerald-600 font-medium">✓ Valid</span>
            ) : email.trim() ? (
              <span className="text-[11px] text-red-500 font-medium">Invalid email</span>
            ) : null}
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[16px] text-slate-400">
              <Mail className="h-[18px] w-[18px]" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-[10px] border border-slate-200 py-[clamp(10px,1.35svh,16px)] pr-[16px] pl-[44px] text-[clamp(13px,1.3svh,15px)] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
            />
          </div>
        </div>
      </div>
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
          fetch(`/api/reviews?t=${Date.now()}`, { cache: 'no-store' }),
          fetch(`/api/opinions?t=${Date.now()}`, { cache: 'no-store' }),
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

  // When reviews are added manually in CMS, they appear first, alongside default reviews
  const effectiveGoogleReviews = [
    ...liveGoogleReviews,
    ...googleReviews.filter(
      (d) => !liveGoogleReviews.some((lg) => lg.name?.toLowerCase().trim() === d.name.toLowerCase().trim())
    ),
  ];

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
    if (!reviewName.trim() || reviewName.trim().length < 2) {
      setFormError('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!reviewRating || reviewRating < 1) {
      setFormError('Please select a star rating (1 to 5 stars).');
      return;
    }

    const hasPhone = Boolean(reviewPhone.trim());
    const hasEmail = Boolean(reviewEmail.trim());

    if (!hasPhone && !hasEmail) {
      setFormError('Contact details required: Please provide either your phone number or your email address.');
      return;
    }
    if (hasPhone && !isValidPhone(reviewPhone)) {
      setFormError('Please enter a valid phone number with 7 to 15 digits (numbers only, no letters).');
      return;
    }
    if (hasEmail && !isValidEmail(reviewEmail)) {
      setFormError('Please enter a valid email address (e.g. name@example.com).');
      return;
    }
    if (!reviewContent.trim() || reviewContent.trim().length < 5) {
      setFormError('Please write your review (at least 5 characters).');
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
    if (!opinionName.trim() || opinionName.trim().length < 2) {
      setOpinionError('Please enter your name (at least 2 characters).');
      return;
    }
    if (!opinionText.trim() || opinionText.trim().length < 5) {
      setOpinionError('Please write your suggestions (at least 5 characters).');
      return;
    }

    const hasPhone = Boolean(opinionPhone.trim());
    const hasEmail = Boolean(opinionEmail.trim());

    if (!hasPhone && !hasEmail) {
      setOpinionError('Contact details required: Please provide either a phone number or an email address.');
      return;
    }
    if (hasPhone && !isValidPhone(opinionPhone)) {
      setOpinionError('Please enter a valid phone number with 7 to 15 digits (numbers only, no letters).');
      return;
    }
    if (hasEmail && !isValidEmail(opinionEmail)) {
      setOpinionError('Please enter a valid email address (e.g. name@example.com).');
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
          title: 'Customer Opinion',
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
          title: 'Customer Opinion',
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
      <div className="flex min-h-0 flex-col gap-[12px] overflow-hidden portrait:h-auto portrait:overflow-visible portrait:px-2 portrait:pt-2">
        {/* ── ROW A: Hero + Platform tabs ── */}
        <div className="flex shrink-0 flex-col gap-[12px]">
          {/* Heading + tabs */}
          <div className="flex min-w-0 flex-col gap-[12px]">
            <div className="relative flex flex-col justify-center overflow-hidden rounded-[8px] border border-white/20 bg-gradient-to-r from-[#F4F9FF] via-[#EAF3FF] to-[#D4E6FC] px-[clamp(10px,1.4vw,22px)] py-[clamp(8px,1.6svh,24px)]">
              <h1 className="text-[clamp(26px,min(3vw,4svh),44px)] leading-tight font-bold tracking-tight text-[#102B7B] portrait:text-[26px]">
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
                <br className="portrait:hidden" />{' '}
                Fishcart's fresh products and service.
              </p>
            </div>

            {/* Platform tabs */}
            <div className="grid grid-cols-4 gap-[10px] portrait:grid-cols-2 portrait:gap-[8px]">
              {PLATFORMS.map((p) => {
                const isActive = activePlatform === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handlePlatformChange(p.id)}
                    className={cn(
                      'flex items-center gap-[10px] rounded-[14px] border px-[clamp(12px,1.2vw,18px)] py-[clamp(11px,1.5svh,18px)] transition-all duration-200 text-left',
                      isActive
                        ? 'bg-[#0D55CF] text-white border-[#0D55CF] shadow-md shadow-blue-500/20'
                        : 'bg-white text-slate-800 border-slate-100 shadow-sm hover:border-[#0D55CF]/40'
                    )}
                  >
                    <span className="shrink-0">{p.renderIcon(isActive)}</span>
                    <span className="flex min-w-0 flex-col items-start">
                      <span className="truncate text-[clamp(13px,1.3svh,16px)] leading-tight font-bold">
                        {p.label}
                      </span>
                      <span
                        className={cn(
                          'text-[clamp(11px,1.1svh,13px)] leading-tight',
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

        {/* ── ROW B: Reviews section ── */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-[14px] overflow-hidden portrait:flex portrait:flex-col portrait:h-auto portrait:overflow-visible">
          {/* Main View Area */}
          {activePlatform === 'addReview' ? (
            <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto rounded-[16px] border border-slate-100 bg-white p-[clamp(18px,2.6svh,36px)] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] portrait:h-auto portrait:flex-none portrait:overflow-visible portrait:p-4">
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
                <div className="flex flex-1 flex-col justify-between gap-[clamp(14px,2svh,28px)] portrait:flex-none portrait:justify-start portrait:gap-4">
                  {/* Header from user attachment */}
                  <div className="flex items-start gap-[16px]">
                    <div className="flex h-[clamp(44px,5.2svh,60px)] w-[clamp(44px,5.2svh,60px)] shrink-0 items-center justify-center rounded-full bg-[#EBF3FF] text-[#0D55CF]">
                      <Edit3 className="h-[clamp(20px,2.3svh,26px)] w-[clamp(20px,2.3svh,26px)]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[clamp(20px,2.2svh,28px)] font-bold text-slate-900 leading-tight">
                        Share Your Review
                      </h2>
                      <p className="text-[clamp(13px,1.3svh,15px)] text-slate-500">
                        Tell us about your experience with Fishcart. Your feedback helps us serve you better.
                      </p>
                    </div>
                  </div>

                  {/* Row 1: Name and Rating */}
                  <div className="grid grid-cols-2 gap-[24px] portrait:flex portrait:flex-col portrait:gap-[14px]">
                    {/* Your Name */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[clamp(13px,1.3svh,16px)] font-bold text-slate-800">
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
                          className="w-full rounded-[10px] border border-slate-200 py-[clamp(10px,1.35svh,16px)] pr-[16px] pl-[44px] text-[clamp(13px,1.3svh,15px)] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                        />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col gap-[8px]">
                      <label className="text-[clamp(13px,1.3svh,16px)] font-bold text-slate-800">
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
                  <ContactInfoFields
                    phoneCode={reviewPhoneCode}
                    onPhoneCodeChange={setReviewPhoneCode}
                    phone={reviewPhone}
                    onPhoneChange={(val) => {
                      setReviewPhone(val);
                      if (formError) setFormError(null);
                    }}
                    email={reviewEmail}
                    onEmailChange={(val) => {
                      setReviewEmail(val);
                      if (formError) setFormError(null);
                    }}
                  />

                  {/* Row 3: Product Photo Upload (Customer Photo) */}
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[clamp(13px,1.3svh,16px)] font-bold text-slate-800">
                      Product Photo{' '}
                      <span className="font-normal text-slate-400 text-[clamp(12px,1.15svh,14px)]">
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
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-slate-200 bg-slate-50/60 px-4 py-[clamp(12px,2svh,24px)] transition-colors hover:border-[#0D55CF]/50 hover:bg-blue-50/30">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Camera className="h-[20px] w-[20px] text-[#0D55CF]" />
                          <span className="text-[clamp(13px,1.3svh,15px)] font-semibold text-slate-700">
                            Click to upload photo of your product
                          </span>
                        </div>
                        <span className="mt-1 text-[clamp(11px,1.1svh,13px)] text-slate-400">
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
                    <label className="text-[clamp(13px,1.3svh,16px)] font-bold text-slate-800">
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
                      className="w-full h-[clamp(96px,14svh,180px)] resize-none rounded-[10px] border border-slate-200 p-[14px] text-[clamp(13px,1.3svh,15px)] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF] portrait:h-[110px]"
                    />
                  </div>

                  {/* Row 5: Submit Row */}
                  <div className="flex items-center justify-between pt-1 portrait:flex-col portrait:gap-3 portrait:items-stretch">
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
                        'flex items-center justify-center gap-2 rounded-[10px] bg-[#0D55CF] px-[clamp(28px,2.5vw,40px)] py-[clamp(11px,1.4svh,16px)] text-[clamp(13px,1.35svh,16px)] font-bold text-white shadow-sm transition-all hover:bg-[#0A40A0] hover:shadow active:scale-[0.99] portrait:w-full',
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
            <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto rounded-[16px] border border-slate-100 bg-white p-[clamp(18px,2.6svh,36px)] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] portrait:h-auto portrait:flex-none portrait:overflow-visible portrait:p-4">
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
                      Your suggestions have been received in our CMS and sent directly to our team. We appreciate your valuable feedback!
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
                      Send Another Suggestion
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
                <div className="flex flex-1 flex-col justify-between gap-[clamp(14px,2.2svh,30px)] portrait:flex-none portrait:justify-start portrait:gap-4">
                  {/* Top Header from 2nd image */}
                  <div className="flex items-start gap-[16px]">
                    <div className="flex h-[clamp(44px,5.2svh,60px)] w-[clamp(44px,5.2svh,60px)] shrink-0 items-center justify-center rounded-full bg-[#EBF3FF] text-[#0D55CF]">
                      <MessageSquareHeart className="h-[clamp(20px,2.3svh,26px)] w-[clamp(20px,2.3svh,26px)]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-[clamp(20px,2.2svh,28px)] font-bold text-slate-900 leading-tight">
                        We Value Your Suggestions!
                      </h2>
                      <p className="text-[clamp(13px,1.3svh,15px)] text-slate-500">
                        Your suggestions help us improve our products and service every day.
                      </p>
                    </div>
                  </div>

                  {/* Row 1: Your Name */}
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[clamp(13px,1.3svh,16px)] font-bold text-slate-800">
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
                        className="w-full rounded-[10px] border border-slate-200 py-[clamp(10px,1.35svh,16px)] pr-[16px] pl-[44px] text-[clamp(13px,1.3svh,15px)] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF]"
                      />
                    </div>
                  </div>

                  {/* Row 2: Your Suggestions */}
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[clamp(13px,1.3svh,16px)] font-bold text-slate-800">
                      Your Suggestions <span className="text-red-500 font-bold">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={opinionText}
                      onChange={(e) => {
                        setOpinionText(e.target.value);
                        if (opinionError) setOpinionError(null);
                      }}
                      placeholder="Write your suggestions here..."
                      className="w-full h-[clamp(110px,19svh,230px)] resize-none rounded-[10px] border border-slate-200 p-[14px] text-[clamp(13px,1.3svh,15px)] transition-colors outline-none focus:border-[#0D55CF] focus:ring-1 focus:ring-[#0D55CF] portrait:h-[120px]"
                    />
                  </div>

                  {/* Row 3: Contact Information (Either Phone Number or Email Address is required) */}
                  <ContactInfoFields
                    phoneCode={opinionPhoneCode}
                    onPhoneCodeChange={setOpinionPhoneCode}
                    phone={opinionPhone}
                    onPhoneChange={(val) => {
                      setOpinionPhone(val);
                      if (opinionError) setOpinionError(null);
                    }}
                    email={opinionEmail}
                    onEmailChange={(val) => {
                      setOpinionEmail(val);
                      if (opinionError) setOpinionError(null);
                    }}
                  />

                  {/* Row 4: Submit Button (matching 2nd image) */}
                  <div className="flex items-center justify-between pt-1 portrait:flex-col portrait:gap-3 portrait:items-stretch">
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
                        'flex items-center justify-center gap-2 rounded-[10px] bg-[#0D55CF] px-[clamp(28px,2.8vw,42px)] py-[clamp(11px,1.4svh,16px)] text-[clamp(13px,1.35svh,16px)] font-bold text-white shadow-sm transition-all hover:bg-[#0A40A0] hover:shadow active:scale-[0.99] portrait:w-full',
                        isSubmittingOpinion && 'opacity-70 cursor-not-allowed'
                      )}
                    >
                      {isSubmittingOpinion ? (
                        <>
                          <Loader2 className="h-[16px] w-[16px] animate-spin" />
                          Submitting Suggestions...
                        </>
                      ) : (
                        <>
                          <Send className="h-[16px] w-[16px]" />
                          Submit Suggestions
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : activePlatform === 'google' ? (
            <div className="flex h-full min-h-0 w-full flex-1 flex-col overflow-y-auto rounded-[20px] border border-slate-100 bg-white p-[clamp(16px,2vw,28px)] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] gap-[clamp(14px,2svh,24px)] portrait:h-auto portrait:flex-none portrait:overflow-visible portrait:p-4">
              {/* Header */}
              <div className="flex items-center gap-[14px]">
                <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-slate-50 border border-slate-100 shadow-xs">
                  <GoogleGIcon className="h-[24px] w-[24px]" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[20px] font-bold text-slate-900 leading-tight">
                    Google Reviews
                  </h2>
                  <p className="text-[13px] text-slate-500 font-medium mt-0.5">
                    What customers are saying about Fishcart on Google.
                  </p>
                </div>
              </div>

              {/* Top 2 Cards: Left rating breakdown, Right review button */}
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[1.6fr_1fr] gap-[16px]">
                {/* Left Card: 4.9 Rating Breakdown */}
                <div className="flex items-center justify-between gap-6 rounded-[16px] border border-slate-100 bg-white p-[20px] shadow-xs portrait:flex-col portrait:items-start">
                  {/* Left: 4.9 Score */}
                  <div className="flex flex-col items-center justify-center px-2 min-w-[120px] portrait:w-full portrait:items-start portrait:px-0">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="text-[38px] font-extrabold text-slate-900 tracking-tight">4.9</span>
                      <Star className="h-[26px] w-[26px] fill-[#F59E0B] text-[#F59E0B]" />
                    </div>
                    <p className="mt-2 text-[12px] font-medium text-slate-500 text-center whitespace-nowrap portrait:text-left">
                      745 Google reviews
                    </p>
                  </div>

                  {/* Right: Star Distribution Bars */}
                  <div className="flex flex-1 flex-col gap-[6px] max-w-[280px] w-full">
                    {[
                      { stars: 5, pct: 92 },
                      { stars: 4, pct: 6 },
                      { stars: 3, pct: 1 },
                      { stars: 2, pct: 0 },
                      { stars: 1, pct: 1 },
                    ].map((d) => (
                      <div key={d.stars} className="flex items-center gap-2 text-[11px]">
                        <span className="w-2.5 text-right font-semibold text-slate-700">{d.stars}</span>
                        <Star className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B] shrink-0" />
                        <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-[#0D55CF] transition-all duration-500"
                            style={{ width: `${d.pct}%` }}
                          />
                        </div>
                        <span className="w-7 text-right font-semibold text-slate-700">{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Card: Review us on Google Button */}
                <div className="flex items-center justify-center rounded-[16px] border border-slate-100 bg-white p-[20px] shadow-xs">
                  <a
                    href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-[12px] border border-slate-200 bg-white px-6 py-3.5 text-[14px] font-bold text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.99]"
                  >
                    <GoogleGIcon className="h-5 w-5" />
                    <span>Review us on Google</span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-slate-600 ml-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Bottom Row: Review Cards in Grid (Matching Attached Screenshot) */}
              <div className="grid flex-1 grid-cols-1 gap-[16px] md:grid-cols-3 portrait:flex-none">
                {effectiveGoogleReviews.map((review) => {
                  return (
                    <div
                      key={review.id}
                      className="flex flex-col justify-between rounded-[16px] border border-slate-100 bg-white p-[18px] shadow-xs hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-col gap-[10px]">
                        {/* Reviewer Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3 min-w-0">
                            {review.avatarUrl ? (
                              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200">
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
                                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-white shadow-xs',
                                  getAvatarBg(review.name, review.avatar)
                                )}
                              >
                                {review.avatar}
                              </div>
                            )}
                            <div className="flex flex-col min-w-0">
                              <p className="truncate text-[14px] font-bold text-slate-900 leading-tight">
                                {review.name}
                              </p>
                              <p className="text-[12px] text-slate-400 font-medium">
                                on Google • {review.timeAgo}
                              </p>
                            </div>
                          </div>
                          <GoogleGIcon className="h-5 w-5 shrink-0 mt-0.5" />
                        </div>

                        {/* 5 Stars */}
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                'h-4 w-4',
                                i < review.rating
                                  ? 'fill-[#F59E0B] text-[#F59E0B]'
                                  : 'fill-slate-200 text-slate-200'
                              )}
                            />
                          ))}
                        </div>

                        {/* Review Text with Hollow Bullet */}
                        <div className="flex items-start gap-2 pt-1">
                          <span className="inline-block h-3.5 w-3.5 rounded-full border-[1.6px] border-slate-400 shrink-0 mt-1" />
                          <p className="text-[13px] font-medium text-slate-700 leading-snug">
                            {review.text}
                          </p>
                        </div>

                        {/* Screenshot Proof if uploaded in CMS */}
                        {review.screenshotUrl && (
                          <div className="relative mt-2 h-28 w-full overflow-hidden rounded-[8px] border border-slate-100 bg-slate-50">
                            <Image
                              src={review.screenshotUrl}
                              alt="Google review screenshot proof"
                              fill
                              className="object-contain"
                              sizes="280px"
                            />
                            <span className="absolute bottom-1 left-1 rounded-full bg-[#4285F4] px-2 py-0.5 text-[9px] font-semibold text-white">
                              Google Review Screenshot
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col gap-[10px] overflow-hidden portrait:h-auto portrait:flex-none portrait:overflow-visible">
              {/* Rating summary + cards row */}
              <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,180px)_1fr] gap-[14px] overflow-hidden portrait:flex portrait:flex-col portrait:h-auto portrait:overflow-visible">
                {/* Rating summary */}
                <div className="flex min-h-0 flex-col justify-start gap-[6px] pt-2 portrait:px-0 portrait:pb-2">
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
        </div>
      </div>

      {/* ── Footer row ── */}
      <div className="shrink-0 portrait:hidden">
        <HomeFooter />
      </div>

      {/* Portrait-only Mobile Footer (CMS-powered) */}
      <MobileFooter />
    </div>
  );
}
