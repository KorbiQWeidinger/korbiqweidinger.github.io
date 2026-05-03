import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const surfaceVariants = cva('border border-border bg-card/80 text-card-foreground shadow-sm', {
  variants: {
    variant: {
      panel: 'rounded-lg dark:bg-card/90',
      toolbar: 'rounded-lg backdrop-blur dark:bg-card/90',
      content: 'rounded-lg dark:bg-card/90',
    },
    padding: {
      none: '',
      sm: 'p-2',
      md: 'p-4',
      content: 'px-4 py-6 sm:px-6 sm:py-10',
    },
  },
  defaultVariants: {
    variant: 'panel',
    padding: 'md',
  },
});

function Surface({
  className,
  variant,
  padding,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof surfaceVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot='surface'
      className={cn(surfaceVariants({ variant, padding, className }))}
      {...props}
    />
  );
}

export { Surface };
