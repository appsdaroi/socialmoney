import { Poppins } from "next/font/google";

import { MoneyContextProvider } from "@/services/moneyContext";

import { Navbar } from "./Navbar";
import { BottomNav } from "./BottomNav";
import { useRouter } from "next/router";

import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Layout = ({ children }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <MoneyContextProvider>
      <div
        className={`${poppins.className} mt-[55px] h-[calc(100vh-55px-48px)] flex justify-center ${currentRoute !== "/" && "overflow-y-scroll"}`}
      >
        <Navbar/>

        <main className="w-full">
          <AnimatePresence>{children}</AnimatePresence>
        </main>

        <BottomNav/>
      </div>
    </MoneyContextProvider>
  );
};

export { Layout };
