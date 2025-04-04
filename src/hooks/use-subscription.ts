import { create } from "zustand"
import { useAuth } from "./use-auth";

interface SubscriptionStore {
  isSubscribed: () => boolean;
}

export const useSubscription = create<SubscriptionStore>((set, get) => ({
  isSubscribed: () => {
    const { user } = useAuth.getState()

    if (!user) {
      return false
    }

    if (user.stripeSubscriptionStatus === "active") {
      return true
    }

    const couple = user.couple

    if (couple) {
      return true
    }

    return false
  }
}))
