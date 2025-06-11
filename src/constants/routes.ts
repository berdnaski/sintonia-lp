export const Routes = {
  LOGIN: (id?: string) => `/auth/login/${id ?? ''}`,
  REGISTER: '/auth/register',
  LANDING_PAGE: '/',
  DASHBOARD: '/dashboard',
  INVITE_COUPLE: '/couple/invite',
  COUPLE_ACCEPT_INVITE: (token: string) => `/couple/invite/accept/${token}`,
  PROFILE: '/profile',
  SIGNALS: '/signals',
  COUPLE: '/couple',
  PLANS: '/plans',
  MEMORIES: '/memories',
  PROBLEM_REPORT: 'https://chat.whatsapp.com/IXAvsYhEAvj9SA5vFGWiZw'
};
