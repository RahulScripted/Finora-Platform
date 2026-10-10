import { useId } from 'react';
import { motion } from 'framer-motion';

import { integrations } from '@/types/integration';
import logo from '@/assets/svgs/logo.svg';
import { AnimatedPath } from './AnimatedPath';

/**
 * Animated graphic showing Finora at the center connecting to the business
 * tools it unifies (banking, cards, payouts, invoicing, treasury, analytics).
 */
export function Integration() {
  const containerId = useId();

  return (
    <div className="relative h-full w-full">
      {/* Connector lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 564 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {integrations.map((integration) => (
          <AnimatedPath
            key={integration.id}
            d={integration.path}
            id={`${containerId}-${integration.id}`}
          />
        ))}
      </svg>

      {/* Center Finora logo */}
      <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-background p-0.5 shadow-md sm:rounded-2xl sm:p-2 sm:shadow-xl">
        <div className="rounded-lg p-1 sm:rounded-xl sm:p-2.5">
          <img
            src={logo}
            alt="Finora"
            width={36}
            height={36}
            className="block size-5 object-contain sm:size-9"
          />
        </div>
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-primary/10 sm:rounded-2xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Peripheral tool nodes */}
      {integrations.map((integration) => {
        const Icon = integration.icon;
        return (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: integration.delay }}
            style={{
              left: `${(integration.x / 564) * 100}%`,
              top: `${(integration.y / 410) * 100}%`,
            }}
            title={integration.label}
            className="absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm sm:h-12 sm:w-12 sm:rounded-xl md:h-13.5 md:w-13.5"
          >
            <Icon className="h-4 w-4 text-foreground sm:h-6 sm:w-6" />
          </motion.div>
        );
      })}
    </div>
  );
}
