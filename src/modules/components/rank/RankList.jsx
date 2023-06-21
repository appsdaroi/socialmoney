import { RankTopThree } from "./RankTopThree";
import { RankListItem } from "./RankListItem";
import { AnimatePresence, motion } from "framer-motion";

const RankList = () => {
  const rankPositions = [
    {
      id: 1,
      pos: 4,
      photo:
        "https://robohash.org/sitvoluptatibusmolestiae.png?size=50x50&set=set1",
      username: "msalisbury0",
      balance: 179354005,
    },
    {
      id: 2,
      pos: 5,
      photo:
        "https://robohash.org/nemosuscipitaccusantium.png?size=50x50&set=set1",
      username: "mgibbin1",
      balance: 651745488,
    },
    {
      id: 3,
      pos: 6,
      photo:
        "https://robohash.org/quialaudantiumdoloribus.png?size=50x50&set=set1",
      username: "gpowton2",
      balance: 169447728,
    },
    {
      id: 4,
      pos: 7,
      photo: "https://robohash.org/enimquampossimus.png?size=50x50&set=set1",
      username: "abolin3",
      balance: 850948491,
    },
    {
      id: 5,
      pos: 8,
      photo: "https://robohash.org/eumnequedolor.png?size=50x50&set=set1",
      username: "cfairholm4",
      balance: 234432753,
    },
    {
      id: 6,
      pos: 9,
      photo:
        "https://robohash.org/necessitatibusutpariatur.png?size=50x50&set=set1",
      username: "kgeorgel5",
      balance: 550884621,
    },
    {
      id: 7,
      pos: 10,
      photo:
        "https://robohash.org/estreprehenderitrepellat.png?size=50x50&set=set1",
      username: "lasplin6",
      balance: 25692445,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%", scaleX: 0.5 }}
      animate={{ opacity: 1, y: "0%", scaleX: 1 }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.4,
      }}
      className="flex flex-col mt-5"
    >
      <RankTopThree />

      <div className="flex flex-col gap-3 mt-8">
        {rankPositions.map((val, i) => (
          <RankListItem key={i} thisUserData={val} />
        ))}
      </div>
    </motion.div>
  );
};

export { RankList };
