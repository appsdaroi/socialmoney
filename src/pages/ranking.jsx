import { useEffect, useState, useRef, useContext } from "react";
import { Poppins } from "next/font/google";
import { getSession } from "next-auth/react";

import _ from "lodash";
import { FetchWithToken } from "@/utils/fetch";

import { CentsToReais, ReaisToCents } from "@/helpers/format";

import { User1, Smartphone, Mail, Refresh, ArrowUp } from "react-swm-icon-pack";

import { AnimatePresence, motion } from "framer-motion";

import { moneyContext } from "@/services/moneyContext";
import moment from "moment";

import { Tab } from "@headlessui/react";

import { RankList } from "../modules/components/rank/RankList";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Ranking({ session }) {
  const { money, setMoney } = useContext(moneyContext);

  const tabClassNames =
    "px-4 py-2 rounded text-sm ui-selected:bg-primary-500 ui-selected:text-white outline-none transition-all";

  return (
    <>
      <motion.div
        key="rankingPage"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
        className="py-4"
      >
        <Tab.Group>
          <Tab.List className="flex justify-center p-2 mx-auto border rounded-lg bg-offwhite w-fit">
            <Tab className={tabClassNames}>Diário</Tab>
            <Tab className={tabClassNames}>Semanal</Tab>
            <Tab className={tabClassNames}>Mensal</Tab>
          </Tab.List>
          <Tab.Panels className="px-4">
            
            <Tab.Panel>
              <RankList />
            </Tab.Panel>

            <Tab.Panel>
              <RankList />
            </Tab.Panel>

            <Tab.Panel>
              <RankList />
            </Tab.Panel>

          </Tab.Panels>
        </Tab.Group>
      </motion.div>
    </>
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
