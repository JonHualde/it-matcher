import "../styles/globals.css";
import type { AppProps } from "next/app";
import Router from "next/router";
// Libs
import "react-toastify/dist/ReactToastify.css";
// Store
import { store } from "../store/store";
import { StoreProvider } from "easy-peasy";
// NProgress
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
