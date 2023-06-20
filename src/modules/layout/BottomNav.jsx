import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Home1, Coin, Trophy, PlusSmall } from "react-swm-icon-pack";

const BottomNav = ({ className }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center h-12 px-3 bg-offwhite border-t ${className}`}
    >
      <Link className={`px-4 text-primary-500 `} href="/">
        <Home1
          set="curved"
          size="28"
          color="rgb(239, 62, 91)"
          fill={currentRoute === "/" ? "rgb(239, 62, 91)" : "white"}
          strokeWidth="1"
        />
      </Link>

      <Link className={`pl-4 pr-6 text-primary-500`} href="/wallet">
        <Coin
          set="curved"
          size="28"
          color={currentRoute === "/wallet" ? "white" : "rgb(239, 62, 91)"}
          fill={currentRoute === "/wallet" ? "rgb(239, 62, 91)" : "white"}
          strokeWidth="1"
        />
      </Link>

      <Link
        className={`px-4 h-full flex justify-center items-center text-primary-500 bg-primary-500 rounded-t-xl scale-110`}
        href="/new-post"
      >
        <PlusSmall set="curved" size="28" color="white" strokeWidth="1" />
      </Link>

      <Link className={`pr-4 pl-6 text-primary-500 relative`} href="/ranking">
        <Trophy
          set="curved"
          size="28"
          color="rgb(239, 62, 91)"
          fill={currentRoute === "/ranking" ? "rgb(239, 62, 91)" : "white"}
          strokeWidth="1"
        />

        <span className="absolute top-0 w-3 h-3 bg-center bg-contain right-4 animate-bounce" style={{ backgroundImage: "url('/img/Green-Up-Arrow.svg')" }}></span>
      </Link>

      <Link className="h-full px-2 font-semibold" href="/profile">
        <div className="relative w-auto h-full p-3 aspect-square">
          <div
            className={`w-full h-full bg-center bg-cover bg-no-repeat border rounded-full ${
              currentRoute === "/profile"
                ? "border-primary-500"
                : "border-black/25"
            }`}
            style={{ backgroundImage: "url('/img/no-photo.jpg')" }}
          />
          {/* <span
            className={`absolute right-0 p-3.5 -translate-x-1/2 -translate-y-1/2 border rounded-full top-1/2 left-1/2 ${
              currentRoute === "/profile"
                ? "border-primary-500 border-1"
                : "border-black/25"
            }`}
          />
          <Image
            className="rounded-full"
            src="/img/no-photo.jpg"
            width={24}
            height={24}
          /> */}
        </div>
      </Link>
    </nav>
  );
};

export { BottomNav };
