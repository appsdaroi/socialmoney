import { useEffect, useContext } from "react";

import {Howl} from 'howler';

import Image from "next/image";
import { motion } from "framer-motion";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const AndroidNotification = ({ data, setNotification, value }) => {
  const { icon, bank, title, description } = data;

  const notify = new Howl({
    src: ['/sound/androidNotification.mp3']
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
      className={`${inter.className} fixed flex gap-3 text-black top-3 rounded-xl items-center left-1/2 z-[999] bg-white w-[95%] h-22 p-4 shadow-xl shadow-black/10`}
    >
      <div className="grid">
        <div className="flex items-center gap-1 mb-1">
          <Image
            className="my-auto rounded"
            src={`/img/${icon}-icon.png`}
            width={16}
            height={16}
          />
          <span className="text-xs text-purple-700">{bank}&nbsp;</span>
          <span className="text-xs text-black/50"> &#8226; Agora</span>
        </div>

        <span className="mb-px text-xs font-semibold">
          {title}
        </span>

        <span className="text-xs truncate">
          {description}
        </span>
      </div>
    </motion.div>
  );
};

export { AndroidNotification };
