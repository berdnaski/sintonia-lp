export const Routes = {
  LOGIN: (id?: string) => `/auth/login/${id ?? ''}`,
  REGISTER: '/auth/register',
  LANDING_PAGE: '/',
  DASHBOARD: '/dashboard',
  INVITE_COUPLE: '/couple/invite',
  COUPLE_ACCEPT_INVITE: (token: string) => `/couple/invite/accept/${token}`
};
