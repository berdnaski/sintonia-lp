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

interface Invite {
  id?: string,
  inviterId: string,
  inviteeEmail: string,
  token: string,
  expiresIn: number,
}

enum InviteStatus {
  Active = "active",
  Pending = "pending"
}

enum StatusPlan {
  NoPlan = "NoPlan",
  Activated = "Activated",
  Canceled = "Canceled"
}
