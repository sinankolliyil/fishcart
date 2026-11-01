import React from 'react';
import Image from 'next/image';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  Package,
  Heart,
  Award,
  ArrowRight,
  MapPin,
  PhoneCall,
  Mail,
} from 'lucide-react';
import { sanityFetch } from '@/lib/sanity';
import { OUR_STORY_QUERY } from '@/lib/sanityQueries';

interface StatItem {
  value?: string;
  label?: string;
  description?: string;
}

interface JourneyItem {
  title?: string;
  description?: string;
  point1?: string;
  point2?: string;
  point3?: string;
}

interface StoryData {
  heroHeading?: string;
  heroDescription?: string;
  stat1?: StatItem;
  stat2?: StatItem;
  stat3?: StatItem;
  stat4?: StatItem;
  journey1?: JourneyItem;
  journey2?: JourneyItem;
  promiseHeading?: string;
  promiseSubtitle?: string;
  promisesList?: {
    promise1?: string;
    promise2?: string;
    promise3?: string;
    promise4?: string;
    promise5?: string;
    promise6?: string;
  };
  processHeading?: string;
  processStepsList?: {
    step1?: string;
    step2?: string;
    step3?: string;
    step4?: string;
    step5?: string;
    step6?: string;
    step7?: string;
    step8?: string;
  };
  thankYouHeading?: string;
  thankYouText?: string;
  closingQuote?: string;
}

const DEFAULT_STATS = [
  {
    icon: 'award',
    value: '1+',
    label: 'Years of Trust',
    description: 'Serving you with freshness & care.',
  },
  {
    icon: 'heart',
    value: '10,000+',
    label: 'Happy Customers',
    description: 'Your support is our strength.',
  },
  {
    icon: 'truck',
    value: '15,000+',
    label: 'Orders Delivered',
    description: 'Pre-orders delivered with smile',
  },
  {
    icon: 'shieldCheck',
    value: '100%',
    label: 'Quality Promise',
    description: 'Freshness & hygiene guaranteed',
  },
];

const DEFAULT_JOURNEY = [
  {
    title: 'How It All Started',
    description:
      'One year ago, we started our journey with a simple idea – to deliver fresh fish and meat to our community. We began with online pre-orders and doorstep delivery.',
    bulletPoints: [
      'Took pre-orders through WhatsApp & calls',
      'Carefully sourced and packed every order',
      'Delivered to your doorstep with on-time promise',
    ],
    image: '/assets/story_journey.png',
  },
  {
    title: 'Growing With You',
    description:
      'Your trust and support motivated us to take the next big step – our own shop!',
    bulletPoints: [
      'Better variety, better quality',
      'More control on freshness',
      'Stronger supply network',
    ],
    image: '/assets/story_store.png',
  },
];

const DEFAULT_PROMISES = [
  { icon: 'shieldCheck', text: 'Never compromise on quality' },
  { icon: 'shieldCheck', text: 'Hygienically cleaned & packed' },
  { icon: 'truck', text: 'Sourced from trusted suppliers' },
  { icon: 'package', text: 'Delivered with care & on time' },
  { icon: 'heart', text: '100% satisfaction or we make it right' },
  { icon: 'shieldCheck', text: 'Sustainable Sourcing' },
];

const DEFAULT_STEPS = [
  { img: '/assets/prod_1_salmon.jpg', title: 'Daily Catch' },
  { img: '/assets/prod_2_seabass.jpg', title: 'Sorting & Cleaning' },
  { img: '/assets/crushed_ice_bg.png', title: 'Ice Packing' },
  { img: '/assets/aa_fish.png', title: 'Air Freight' },
  { img: '/assets/ice_cubes_bg.png', title: 'Import & Inspection' },
  { img: '/assets/meat.png', title: 'Cold Storage & Transport' },
  { img: '/assets/chicken.png', title: 'Final Check at Our Shop' },
  { img: '/assets/contact_boy.png', title: 'Delivered to You' },
];

function getStatIcon(icon?: string) {
  switch (icon?.toLowerCase()) {
    case 'award':
      return <Award className="h-[clamp(20px,1.6vw,28px)] w-[clamp(20px,1.6vw,28px)] shrink-0 text-blue-600" />;
    case 'heart':
      return <Heart className="h-[clamp(20px,1.6vw,28px)] w-[clamp(20px,1.6vw,28px)] shrink-0 text-blue-600" />;
    case 'truck':
      return <Truck className="h-[clamp(20px,1.6vw,28px)] w-[clamp(20px,1.6vw,28px)] shrink-0 text-blue-600" />;
    default:
      return <ShieldCheck className="h-[clamp(20px,1.6vw,28px)] w-[clamp(20px,1.6vw,28px)] shrink-0 text-blue-600" />;
  }
}

function getPromiseIcon(icon?: string) {
  switch (icon?.toLowerCase()) {
    case 'truck':
      return <Truck className="h-[clamp(14px,1.2vw,20px)] w-[clamp(14px,1.2vw,20px)] shrink-0 text-blue-600" />;
    case 'package':
      return <Package className="h-[clamp(14px,1.2vw,20px)] w-[clamp(14px,1.2vw,20px)] shrink-0 text-blue-600" />;
    case 'heart':
      return <Heart className="h-[clamp(14px,1.2vw,20px)] w-[clamp(14px,1.2vw,20px)] shrink-0 text-blue-600" />;
    default:
      return <ShieldCheck className="h-[clamp(14px,1.2vw,20px)] w-[clamp(14px,1.2vw,20px)] shrink-0 text-blue-600" />;
  }
}

export const revalidate = 60;

export default async function StoryPage() {
  let story: StoryData | null = null;
  try {
    story = await sanityFetch<StoryData>(OUR_STORY_QUERY);
  } catch (err) {
    console.warn('Failed to fetch Our Story data from Sanity, using fallback:', err);
  }

  const heroHeading = story?.heroHeading || 'Our Story';
  const heroDescription =
    story?.heroDescription ||
    'From a small online initiative to your trusted fresh partner. Our journey is built on hard work, honesty, and the love of our customers.';
  const heroImage = '/assets/story_hero.png';

  const stats = [
    {
      icon: 'award',
      value: story?.stat1?.value || DEFAULT_STATS[0].value,
      label: story?.stat1?.label || DEFAULT_STATS[0].label,
      description: story?.stat1?.description || DEFAULT_STATS[0].description,
    },
    {
      icon: 'heart',
      value: story?.stat2?.value || DEFAULT_STATS[1].value,
      label: story?.stat2?.label || DEFAULT_STATS[1].label,
      description: story?.stat2?.description || DEFAULT_STATS[1].description,
    },
    {
      icon: 'truck',
      value: story?.stat3?.value || DEFAULT_STATS[2].value,
      label: story?.stat3?.label || DEFAULT_STATS[2].label,
      description: story?.stat3?.description || DEFAULT_STATS[2].description,
    },
    {
      icon: 'shieldCheck',
      value: story?.stat4?.value || DEFAULT_STATS[3].value,
      label: story?.stat4?.label || DEFAULT_STATS[3].label,
      description: story?.stat4?.description || DEFAULT_STATS[3].description,
    },
  ];

  const journeyCards = [
    {
      title: story?.journey1?.title || DEFAULT_JOURNEY[0].title,
      description:
        story?.journey1?.description || DEFAULT_JOURNEY[0].description,
      bulletPoints: [
        story?.journey1?.point1 || DEFAULT_JOURNEY[0].bulletPoints[0],
        story?.journey1?.point2 || DEFAULT_JOURNEY[0].bulletPoints[1],
        story?.journey1?.point3 || DEFAULT_JOURNEY[0].bulletPoints[2],
      ].filter((p): p is string => Boolean(p)),
      image: '/assets/story_journey.png',
    },
    {
      title: story?.journey2?.title || DEFAULT_JOURNEY[1].title,
      description:
        story?.journey2?.description || DEFAULT_JOURNEY[1].description,
      bulletPoints: [
        story?.journey2?.point1 || DEFAULT_JOURNEY[1].bulletPoints[0],
        story?.journey2?.point2 || DEFAULT_JOURNEY[1].bulletPoints[1],
        story?.journey2?.point3 || DEFAULT_JOURNEY[1].bulletPoints[2],
      ].filter((p): p is string => Boolean(p)),
      image: '/assets/story_store.png',
    },
  ];

  const promiseHeading = story?.promiseHeading || 'Our Promise\nTo You';
  const promiseSubtitle =
    story?.promiseSubtitle || 'We promise to deliver the freshest.';
  const promises = [
    {
      icon: 'shieldCheck',
      text: story?.promisesList?.promise1 || DEFAULT_PROMISES[0].text,
    },
    {
      icon: 'shieldCheck',
      text: story?.promisesList?.promise2 || DEFAULT_PROMISES[1].text,
    },
    {
      icon: 'truck',
      text: story?.promisesList?.promise3 || DEFAULT_PROMISES[2].text,
    },
    {
      icon: 'package',
      text: story?.promisesList?.promise4 || DEFAULT_PROMISES[3].text,
    },
    {
      icon: 'heart',
      text: story?.promisesList?.promise5 || DEFAULT_PROMISES[4].text,
    },
    {
      icon: 'shieldCheck',
      text: story?.promisesList?.promise6 || DEFAULT_PROMISES[5].text,
    },
  ];
  const promiseImage = '/assets/story_seafood.png';

  const processHeading =
    story?.processHeading ||
    "From Ocean To Our Shop – Here's How It Happens";
  const processSteps = DEFAULT_STEPS.map((step, idx) => {
    const key = `step${idx + 1}` as keyof NonNullable<
      typeof story
    >['processStepsList'];
    const customTitle = story?.processStepsList?.[key] || step.title;
    return {
      title: customTitle,
      img: step.img,
    };
  });

  const thankYouHeading = story?.thankYouHeading || 'Thank You!';
  const thankYouText =
    story?.thankYouText ||
    'Every order, every feedback, and every smile pushes us to do better every day.';
  const closingQuote =
    story?.closingQuote ||
    "We don't just sell fish & meat,\nwe deliver trust, health and happiness.";
  const familyImage = '/assets/story_family_footer.png';

  return (
    <div className="grid h-full min-h-0 w-full grid-rows-[minmax(0,35fr)_minmax(0,27fr)_minmax(0,17fr)_minmax(0,24fr)_minmax(0,12fr)] gap-2 lg:gap-3 xl:gap-[var(--main-gap)] portrait:flex portrait:flex-col portrait:h-auto portrait:gap-4 portrait:overflow-visible portrait:pb-4">
      {/* ROW 1 — Story Introduction */}
      <div className="grid min-h-0 grid-cols-[40fr_20fr_40fr] gap-2 overflow-hidden lg:gap-3 xl:grid-cols-[38fr_28fr_34fr] xl:gap-[var(--main-gap)] portrait:flex portrait:flex-col portrait:gap-4 portrait:overflow-visible">
        {/* Left Side: Intro */}
        <div className="flex min-h-0 flex-col justify-start px-[clamp(8px,1.2vw,18px)] pt-[clamp(6px,0.8vw,12px)]">
          <h1 className="mb-[clamp(4px,0.6vw,12px)] shrink-0 text-[clamp(32px,min(3vw,4svh),44px)] leading-tight font-bold tracking-tight text-[#102B7B]">
            {heroHeading}
          </h1>

          <p className="line-clamp-3 text-[13px] leading-relaxed text-slate-600 lg:text-[14px] xl:text-[clamp(10px,0.9vw,14px)]">
            {heroDescription}
          </p>
        </div>

        {/* Center: Hero Image */}
        <div className="relative min-h-0 overflow-hidden rounded-[8px] bg-slate-100 portrait:min-h-[200px]">
          <Image
            src={heroImage}
            alt="FishCart Family"
            fill
            className="object-cover"
          />
        </div>

        {/* Right: Stats 2x2 */}
        <div className="grid min-h-0 grid-cols-2 grid-rows-2 gap-2 lg:gap-3 xl:gap-[var(--main-gap)]">
          {stats.map((st, i) => (
            <div
              key={i}
              className="flex h-full flex-col rounded-[12px] border border-blue-50 bg-white p-2.5 lg:p-3 xl:p-[clamp(10px,1vw,16px)]"
            >
              <div className="flex items-center gap-[clamp(8px,0.8vw,12px)]">
                {getStatIcon(st.icon)}
                <div className="text-[clamp(15px,1.5vw,24px)] leading-none font-bold text-slate-900">
                  {st.value}
                </div>
              </div>

              <div className="mt-2 text-[13px] leading-tight font-bold text-slate-800 lg:text-[14px] xl:mt-[clamp(8px,0.8vw,10px)] xl:text-[clamp(10px,0.85vw,13px)]">
                {st.label}
              </div>

              <div className="mt-1 text-[11px] leading-snug text-slate-500 lg:text-[12px] xl:mt-[clamp(3px,0.4vw,6px)] xl:text-[clamp(8px,0.7vw,10px)]">
                {st.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2 — Journey */}
      <div className="grid min-h-0 grid-cols-2 gap-[var(--main-gap)] overflow-hidden portrait:grid-cols-1 portrait:gap-4 portrait:overflow-visible">
        {journeyCards.map((card, i) => (
          <div
            key={i}
            className="flex h-full min-h-0 items-center justify-between overflow-hidden rounded-[8px] bg-white p-2.5 lg:p-3.5 xl:p-[clamp(10px,1.2vw,20px)]"
          >
            <div className="flex min-h-0 flex-1 flex-col justify-center pr-2.5 lg:pr-3.5 xl:pr-[clamp(10px,1.2vw,20px)]">
              <h2 className="mb-1 text-[clamp(13px,1.4vw,20px)] leading-tight font-bold text-[#0D55CF] lg:mb-1.5 xl:mb-1.5">
                {card.title}
              </h2>
              <p className="mb-1.5 line-clamp-2 text-[11px] leading-[1.3] text-slate-600 lg:mb-2 lg:text-[12px] xl:mb-2 xl:text-[clamp(9px,0.75vw,11.5px)]">
                {card.description}
              </p>
              <div className="flex min-h-0 flex-col gap-1 xl:gap-[clamp(2px,0.35vw,5px)]">
                {card.bulletPoints?.map((text, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-[clamp(4px,0.5vw,7px)]"
                  >
                    <CheckCircle2 className="h-[clamp(10px,0.9vw,13px)] w-[clamp(10px,0.9vw,13px)] shrink-0 text-blue-600" />
                    <span className="truncate text-[11px] font-medium text-slate-700 lg:text-[12px] xl:text-[clamp(9px,0.68vw,11px)]">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[90%] min-h-0 w-[25%] shrink-0 lg:w-[28%] xl:w-[35%]">
              <Image
                src={card.image || '/assets/story_journey.png'}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ROW 3 — Promise Strip */}
      <div className="flex min-h-0 items-center overflow-hidden rounded-[8px] bg-white portrait:flex-col portrait:items-start portrait:overflow-visible portrait:p-0 portrait:gap-0">
        <div className="flex flex-1 items-center justify-between px-3 py-2 lg:px-4 lg:py-3 xl:px-[clamp(12px,1.5vw,24px)] xl:py-[clamp(6px,1vw,16px)] portrait:flex-col portrait:items-start portrait:w-full portrait:p-4 portrait:gap-3">
          <div className="w-[15%] shrink-0 portrait:w-full">
            <h2 className="whitespace-pre-line text-[clamp(15px,1.2vw,20px)] leading-tight font-bold text-[#0D55CF] portrait:text-[20px]">
              {promiseHeading}
            </h2>
            <p className="mt-1 line-clamp-2 text-[11px] text-slate-500 lg:text-[12px] xl:text-[clamp(11px,0.6vw,9px)] portrait:text-[13px]">
              {promiseSubtitle}
            </p>
          </div>

          <div className="flex min-h-0 flex-1 justify-around gap-1 px-1 lg:gap-2 xl:gap-1 portrait:grid portrait:grid-cols-2 portrait:gap-3 portrait:w-full">
            {promises.map((item, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex min-w-0 items-center gap-[clamp(4px,0.4vw,8px)]">
                  {getPromiseIcon(item.icon)}
                  <span className="text-[11px] leading-tight font-semibold text-slate-700 lg:text-[12px] xl:text-[clamp(12px,0.65vw,10px)]">
                    {item.text}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className="h-6 w-[1px] shrink-0 bg-slate-300 lg:h-8 portrait:hidden" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="relative h-full w-[10%] shrink-0 lg:w-[13%] xl:w-[17%] portrait:h-[120px] portrait:w-full">
          <Image
            src={promiseImage}
            alt="Premium Seafood"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* ROW 4 — From Ocean To Your Shop */}
      <div className="flex min-h-0 flex-col rounded-[8px] bg-white p-3 pt-2 pb-1 lg:p-4 lg:pt-3 lg:pb-2 xl:p-[clamp(12px,1.5vw,24px)] xl:pt-[clamp(3px,0.6vw,6px)] xl:pb-2">
        <h2 className="mb-[6px] shrink-0 text-[clamp(14px,1.2vw,20px)] font-bold text-[#0D55CF]">
          {processHeading}
        </h2>

        <div className="flex min-h-0 flex-1 justify-between gap-[clamp(2px,0.4vw,6px)] portrait:grid portrait:grid-cols-2 portrait:gap-3">
          {processSteps.map((step, i, arr) => (
            <React.Fragment key={i}>
              <div className="flex h-full min-w-0 flex-1 flex-col">
                <div className="relative mb-[clamp(2px,0.3vw,4px)] aspect-[2.5/1] w-full shrink-0 overflow-hidden rounded-[8px] bg-slate-200">
                  <div className="absolute top-1 left-1 z-10 flex h-[clamp(12px,1vw,18px)] w-[clamp(12px,1vw,18px)] items-center justify-center rounded-full bg-blue-600 text-[clamp(8px,0.6vw,10px)] font-bold text-white">
                    {i + 1}
                  </div>
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="mb-[1px] text-[11px] leading-tight font-bold text-slate-800 lg:text-[12px] xl:text-[clamp(9px,0.7vw,11px)]">
                  {step.title}
                </h4>
              </div>
              {i < arr.length - 1 && (
                <div className="flex shrink-0 flex-col justify-start pt-[clamp(6px,1vw,16px)] portrait:hidden">
                  <ArrowRight className="h-[clamp(10px,1vw,14px)] w-[clamp(10px,1vw,14px)] text-blue-500" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ROW 5 — Thank You Footer */}
      <div className="grid min-h-0 grid-cols-2 gap-[var(--main-gap)] overflow-hidden portrait:hidden">
        {/* Left Footer Card */}
        <div className="flex h-full min-h-0 items-center justify-between overflow-hidden rounded-[8px] bg-white p-2 lg:p-3 xl:p-[clamp(8px,1vw,16px)]">
          <div className="flex min-h-0 flex-1 items-center gap-[clamp(8px,1vw,16px)] pr-2">
            <Heart className="h-[clamp(24px,2.5vw,40px)] w-[clamp(24px,2.5vw,40px)] shrink-0 text-red-500" />
            <div className="flex min-h-0 flex-col">
              <h2 className="mb-1 text-[clamp(16px,1.5vw,20px)] font-bold text-[#0D55CF]">
                {thankYouHeading}
              </h2>
              <p className="line-clamp-2 text-[14px] leading-tight font-medium text-slate-600 lg:text-[12px] xl:text-[clamp(9px,0.8vw,11px)]">
                {thankYouText}
              </p>
            </div>
          </div>
          <div className="relative h-[100%] min-h-0 w-[20%] shrink-0 lg:w-[28%] xl:w-[35%]">
            <Image
              src={familyImage}
              alt="Family"
              fill
              className="scale-[1.9] object-contain object-center"
            />
          </div>
        </div>

        {/* Right Footer Card */}
        <div className="flex h-full min-h-0 items-center justify-between overflow-hidden rounded-[8px] bg-white p-2 lg:p-3 xl:p-[clamp(8px,1vw,16px)]">
          <div className="flex h-full flex-1 items-center justify-center pl-2">
            <p className="whitespace-pre-line text-[14px] leading-tight font-bold italic text-slate-600 lg:text-[14px] xl:text-[clamp(11px,1.2vw,16px)]">
              <span className="text-[clamp(20px,2.5vw,32px)] leading-none text-blue-200">
                &quot;
              </span>{' '}
              {closingQuote}
            </p>
          </div>
          <div className="relative h-full w-[28%] shrink-0 lg:w-[32%] xl:w-[35%]">
            <Image
              src={familyImage}
              alt="Boat Illustration"
              fill
              className="scale-[1.9] object-contain object-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
