import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Home1, Wallet } from "react-swm-icon-pack";

const BottomNav = ({ className }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center h-14 px-3 bg-offwhite border-t ${className}`}
    >

      <Link className={`px-10 py-2 text-primary-500 `} href="/">
        <Home1 set="curved" size="36" color={currentRoute === "/" ? "white" : "rgb(239, 62, 91)"} fill={currentRoute === "/" ? "rgb(239, 62, 91)" : "white"} strokeWidth="1"/>
      </Link>
      <Link className={`px-10 py-2 text-primary-500`} href="/wallet">
        <Wallet set="curved" size="36" color={currentRoute === "/wallet" ? "white" : "rgb(239, 62, 91)"} fill={currentRoute === "/wallet" ? "rgb(239, 62, 91)" : "white"} strokeWidth="1"/>
      </Link>

      <Link className="px-10 font-semibold" href="/profile">
        <div className="relative w-auto h-full">
          <span
            className={`absolute right-0 p-3.5 -translate-x-1/2 -translate-y-1/2 border rounded-full top-1/2 left-1/2 ${
              currentRoute === "/profile"
                ? "border-primary-500"
                : "border-black/25"
            }`}
          />
          <Image
            className="rounded-full"
            src="/img/no-photo.jpg"
            width={24}
            height={24}
          />
        </div>
      </Link>
    </nav>
  );
};

export { BottomNav };
