interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  subscriptionStatus: StatusPlan;
  stripeCustomerId?: string;
  stripeSubscriptionStatus?: string;
  stripeSubscriptionId?: string;
}

enum StatusPlan {
  NoPlan = "NoPlan",
  Activated = "Activated",
  Canceled = "Canceled"
}
