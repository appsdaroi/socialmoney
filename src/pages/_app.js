import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Layout } from "@/modules/layout/";

import toast, { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {pageProps.session ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}

      <Toaster />
    </SessionProvider>
  );
}
