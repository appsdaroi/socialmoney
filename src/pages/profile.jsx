import { useEffect, useState } from "react";
import { signOut, getSession } from "next-auth/react";

import Link from "next/link";
import Image from "next/image";

import { formatNumber } from "@/helpers/format/numberFormat";

import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div
      key="profilePage"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}
    >
      <div className="grid gap-3.5">
        <div className="flex gap-4 px-4 pt-4">
          <div className="relative w-auto">
            <span className="absolute top-0 right-0 p-3 h-[72px] w-[72px] rounded-full border border-primary-500" />
            <Image
              className="p-1 ml-auto rounded-full"
              src="/img/no-photo.jpg"
              width={72}
              height={72}
            />
          </div>

          <div className="flex flex-col flex-1 gap-3">
            <div className="grid items-center grid-cols-3 gap-2 px-2">
              <div className="text-center">
                <h4 className="font-semibold">
                  {formatNumber(85434, { notation: "compact" })}
                </h4>
                <h3 className="text-xs">Posts</h3>
              </div>
              <div className="text-center">
                <h4 className="font-semibold">
                  {formatNumber(8723467, { notation: "compact" })}
                </h4>
                <h3 className="text-xs">Seguidores</h3>
              </div>
              <div className="text-center">
                <h4 className="font-semibold">
                  {formatNumber(82374, { notation: "compact" })}
                </h4>
                <h3 className="text-xs">Seguindo</h3>
              </div>
            </div>

            <button className="w-full px-2 py-1 text-xs font-medium text-center border rounded-lg bg-offwhite" onClick={() => signOut()}>
              Desconectar-se
            </button>
          </div>
        </div>

        <div className="flex flex-col px-4">
          <h1 className="text-sm font-semibold">Neymar Jr.</h1>
          <h2 className="text-sm">Atleta 🙏🏼</h2>
        </div>

        <div className="grid grid-cols-3 gap-px">
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
          <Link
            href="#"
            className="relative before:block before:content before:w-full before:pt-[177.77%]"
          >
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-cover bg-[url('https://pbs.twimg.com/media/FnqNpctWIAAG99w.jpg')]"></div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session)
    return {
      redirect: { destination: "/auth/signin" },
    };

  return {
    props: {
      session: session,
    },
  };
}
