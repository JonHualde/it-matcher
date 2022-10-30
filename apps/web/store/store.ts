import { createStore, action, persist } from "easy-peasy";

export const store = createStore(
  persist({
    loggedIn: false,
    applications: null,
    shownProject: {},
    updateProject: action((state: any, payload: object) => {
      state.shownProject = payload;
    }),
    updateUserAuthStatus: action((state: any, payload: boolean) => {
      state.loggedIn = payload;
    }),
    resetAuthAndUserData: action((state: any) => {
      (state.loggedIn = false),
      (state.applications = null);
    }),
    updateApplications: action((state: any, payload: any) => {
      state.applications = payload;
    }),
  })
);
