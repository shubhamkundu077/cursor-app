'use client';

import Error from '@/components/ui/error';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto py-8">
      <Error
        message="Something went wrong while loading the dashboard."
        retry={reset}
      />
    </div>
  );
} 