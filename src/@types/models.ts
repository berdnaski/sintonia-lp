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

interface Signal {
  id: string;
  userId: string;
  coupleId: string;
  emotion: string;
  note?: string;
  createdAt: Date;
  user: User;
  couple: Couple;
}

interface AIResponse {
  id: string;
  coupleId: string;
  summary: string;
  advice: string;
  challenge?: string;
  createdAt: Date;
  couple: Couple;
}

interface Couple {
  id: string;
  relationshipStatus: string;
  user1: User;
  user1Id: string;
  user2: User;
  user2Id: string;
  createdAt: Date;
  signals: Signal[];
  aiResponses: AIResponse[];
}

interface Invite {
  id?: string,
  inviterId: string,
  inviteeEmail: string,
  token: string,
  used: boolean,
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
