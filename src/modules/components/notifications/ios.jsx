import { useEffect } from "react";

import {Howl} from 'howler';

import Image from "next/image";
import { motion } from "framer-motion";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const IOSNotification = ({ data, setNotification, value }) => {
  const { icon, bank, title, description } = data;

  const notify = new Howl({
    src: ['/sound/iosNotification.mp3'],
    html5: true
  });

  useEffect(() => {
    notify.play();

    setTimeout(() => {
      setNotification(false);
    }, 5000);
  }, []);

  return (
    <motion.div
      key="bankNotification"
      initial={{ y: "-120%", x: "-50%" }}
      animate={{ y: "0%", x: "-50%" }}
      exit={{ y: "-120%", x: "-50%" }}
      className={`${inter.className} fixed flex gap-3 text-white top-3 rounded-3xl items-center left-1/2 z-[999] bg-neutral-500/80 backdrop-blur w-[95%] h-[4.5rem] p-4`}
    >
      <div className="w-[32px] ">
        <Image
          className="my-auto rounded-lg"
          src={`/img/${icon}-icon.png`}
          width={32}
          height={32}
        />
      </div>

      <div className="grid flex-1">
        <span className="text-xs font-semibold">{title}</span>

        <span className="absolute text-[0.65rem] top-2.5 right-5 text-white/50">
          Agora
        </span>

        <span className="text-xs">
          {description}
        </span>
      </div>

    </motion.div>
  );
};

export { IOSNotification };