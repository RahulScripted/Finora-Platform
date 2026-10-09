import React from 'react';
import { cn } from '@/lib/utils';
import type { TestimonialCardProps } from '@/types/testimonial';

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer rounded-3xl border-2 p-8 transition-all duration-500 ease-in-out',
        isCenter
          ? 'z-10 bg-primary text-primary-foreground border-primary'
          : 'z-0 bg-card text-card-foreground border-border hover:border-primary/50'
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(${
          isCenter ? -65 : position % 2 ? 15 : -15
        }px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        boxShadow: isCenter ? '0px 8px 0px 4px var(--border)' : '0px 0px 0px 0px transparent',
      }}
    >
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-14 rounded-full bg-muted object-cover object-top"
        style={{ boxShadow: '3px 3px 0px var(--background)' }}
      />
      <h3
        className={cn(
          'text-base sm:text-xl font-medium',
          isCenter ? 'text-primary-foreground' : 'text-foreground'
        )}
      >
        &quot;{testimonial.testimonial}&quot;
      </h3>
      <p
        className={cn(
          'absolute bottom-8 left-8 right-8 mt-2 text-sm italic',
          isCenter ? 'text-primary-foreground/80' : 'text-muted-foreground'
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};
