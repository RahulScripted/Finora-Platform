import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/* Hover context — tracks which avatar is active to show its tooltip          */
/* -------------------------------------------------------------------------- */
type AvatarHoverContextValue = {
  active: boolean;
};
const AvatarHoverContext = React.createContext<AvatarHoverContextValue>({ active: false });

/* -------------------------------------------------------------------------- */
/* Avatar (Radix) with a hover lift                                           */
/* -------------------------------------------------------------------------- */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, children, ...props }, ref) => {
  const [active, setActive] = React.useState(false);

  // Split the tooltip out of the children so it can live OUTSIDE the Root's
  // overflow-hidden clip (otherwise it would be cut off and never show).
  const tooltip: React.ReactNode[] = [];
  const rest: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === AvatarGroupTooltip) {
      tooltip.push(child);
    } else {
      rest.push(child);
    }
  });

  return (
    <AvatarHoverContext.Provider value={{ active }}>
      <motion.div
        className="relative -ml-3 first:ml-0"
        onHoverStart={() => setActive(true)}
        onHoverEnd={() => setActive(false)}
        whileHover={{ y: -6, scale: 1.06, zIndex: 10 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        style={{ zIndex: active ? 10 : undefined }}
      >
        <AvatarPrimitive.Root
          ref={ref}
          className={cn('relative flex size-10 shrink-0 overflow-hidden rounded-full', className)}
          {...props}
        >
          {rest}
        </AvatarPrimitive.Root>
        {tooltip}
      </motion.div>
    </AvatarHoverContext.Provider>
  );
});
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-medium',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

/* -------------------------------------------------------------------------- */
/* Tooltip that appears above the avatar on hover                             */
/* -------------------------------------------------------------------------- */
function AvatarGroupTooltip({ children }: { children: React.ReactNode }) {
  const { active } = React.useContext(AvatarHoverContext);
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.9 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs font-medium text-background shadow-md"
        >
          {children}
          <span className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-foreground" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/* Group container                                                            */
/* -------------------------------------------------------------------------- */
function AvatarGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center', className)} {...props}>
      {children}
    </div>
  );
}

export { AvatarGroup, AvatarGroupTooltip, Avatar, AvatarImage, AvatarFallback };
