import { Routes } from '@/constants/routes';
import { useAuth } from '@/hooks/use-auth';
import { useSubscription } from '@/hooks/use-subscription';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function withSubscription(
  Component: React.FC
) {
  const LayoutComponent = () => {
    const { isSubscribed } = useSubscription();
    const { user } = useAuth();
    const router = useRouter()

    useEffect(() => {
      if (!isSubscribed()) {
        return router.push(Routes.PLANS)
      }
    }, [user])

    if (!user || !isSubscribed()) {
      return null;
    }

    return (
      <Component />
    );
  };

  return LayoutComponent;
}
