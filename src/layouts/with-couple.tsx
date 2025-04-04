import { Routes } from '@/constants/routes';
import { useAuth } from '@/hooks/use-auth';
import { useCouple } from '@/hooks/use-couple';
import { useSubscription } from '@/hooks/use-subscription';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import withSubscription from './with-subscription';

export default function withCouple(
  Component: React.FC
) {
  const LayoutComponent = () => {
    const { couple } = useCouple();
    const { user } = useAuth();
    const router = useRouter()

    useEffect(() => {
      if (!couple) {
        return router.push(Routes.INVITE_COUPLE)
      }
    }, [user])

    if (!user || !couple) {
      return null;
    }

    return (
      <Component />
    );
  };

  return withSubscription(LayoutComponent);
}
