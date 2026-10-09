import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import { Button } from './button';
import { cn } from '@/lib/utils';
import type { SupportAvatar } from '@/types/faq';

interface SupportContactCardProps {
  supportAvatars: ReadonlyArray<SupportAvatar>;
}

export function SupportContactCard({ supportAvatars }: SupportContactCardProps) {
  return (
    <div className="flex w-full flex-col items-center justify-between gap-6 rounded-2xl bg-card sm:flex-row sm:text-left">
      <div className="flex items-center gap-4">
        <div className="flex -space-x-3">
          {supportAvatars.map((avatar) => (
            <Avatar
              key={avatar.alt}
              className={cn('h-12 w-12 border-2 border-background', avatar.className)}
            >
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-foreground">Still have questions?</h3>
          <p className="text-sm text-muted-foreground">
            Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
          </p>
        </div>
      </div>
      <Button className="shrink-0">Contact support</Button>
    </div>
  );
}
