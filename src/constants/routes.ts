export const Routes = {
  LANDING_PAGE: '/',
  DASHBOARD: '/dashboard',
  LOGIN: (id?: string) => `/auth/login/${id}`,
};
