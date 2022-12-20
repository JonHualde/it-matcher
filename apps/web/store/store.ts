import { createStore, action, persist } from "easy-peasy";

export const store = createStore(
  persist({
    user: {
      isLoggedIn: false,
      id: null,
    },
    applications: null,
    updateUserAuthStatus: action((state: any, payload: { isLoggedIn: boolean; id: number }) => {
      state.user.isLoggedIn = payload.isLoggedIn;
      state.user.id = payload.id;
    }),
    resetAuthAndUserData: action((state: any) => {
      (state.user.loggedIn = false), (state.user.id = null), (state.applications = null);
    }),
    updateApplications: action((state: any, payload: any) => {
      state.applications = payload;
    }),
  })
);
