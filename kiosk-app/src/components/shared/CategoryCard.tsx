import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CategoryCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  href: string;
  variant: 'fish' | 'meat' | 'chicken' | 'eggs';
  className?: string;
}

export function CategoryCard({
  title,
  subtitle,
  imageSrc,
  href,
  variant,
  className,
}: CategoryCardProps) {
  const styles = {
    fish: {
      bg: 'bg-[#7EBEFE]',
      title: 'text-[#0D55CF]',
      sub: 'text-white/90',
      arrow: 'text-[#0D55CF]',
    },
    meat: {
      bg: 'bg-[#FF6770]',
      title: 'text-white',
      sub: 'text-white/90',
      arrow: 'text-[#FF6770]',
    },
    chicken: {
      bg: 'bg-[#FFAD29]',
      title: 'text-white',
      sub: 'text-white/90',
      arrow: 'text-[#FFAD29]',
    },
    eggs: {
      bg: 'bg-[#91C56A]',
      title: 'text-white',
      sub: 'text-white/90',
      arrow: 'text-[#91C56A]',
    },
  };

  const currentStyle = styles[variant];

  return (
    <Link
      href={href}
      className={cn(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl p-[var(--cat-card-padding)] shadow-sm transition-transform hover:-translate-y-1',
        currentStyle.bg,
        className
      )}
    >
      <div className="relative z-10">
        <h3
          className={cn(
            'mb-1 text-[clamp(18px,1.25vw,24px)] leading-tight font-bold',
            currentStyle.title
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'text-[clamp(14px,0.94vw,18px)] font-medium',
            currentStyle.sub
          )}
        >
          {subtitle}
        </p>
      </div>

      <div
        className={cn(
          'absolute',
          variant === 'eggs'
            ? 'top-[-5%] right-[6%] bottom-[-5%] w-[45%]'
            : variant === 'fish'
              ? 'top-[-8%] right-[-5%] h-[105%] w-[92%]'
              : 'right-[-5%] bottom-[-10%] h-[95%] w-[85%]'
        )}
      >
        <img
          src={imageSrc}
          alt={title}
          className={cn(
            'h-full w-full object-contain drop-shadow-md',
            variant === 'eggs'
              ? 'object-right'
              : 'scale-[1.15] object-bottom-right'
          )}
        />
      </div>

      <div className="absolute right-4 bottom-4 z-10">
        <div
          className={cn(
            'flex h-[clamp(28px,1.67vw,32px)] w-[clamp(28px,1.67vw,32px)] items-center justify-center rounded-full bg-white shadow-sm transition-transform group-hover:scale-110',
            currentStyle.arrow
          )}
        >
          <ArrowRight className="h-[clamp(14px,0.83vw,16px)] w-[clamp(14px,0.83vw,16px)] stroke-[2.5]" />
        </div>
      </div>
    </Link>
  );
}
