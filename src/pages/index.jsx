import { useEffect, useState } from "react";
import { signOut, getSession } from "next-auth/react";

import { Post } from "@/modules/components/feed";
import { FullPage, Slide } from "react-full-page";

import { motion } from "framer-motion";

export default function Home() {
  const initialSlide = 0;

  const [activeSlider, setActiveSlider] = useState(initialSlide);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [sliders, setSliders] = useState([
    {
      videoUri:
        "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
      likes: 1029859,
      comments: 10748,
      author: "neymarjr",
      description:
        "lorem ipsum dolor isit amet lorem ipsum dolor isit amet lorem ipsum dolor isit amet lorem ipsum dolor isit amet lorem ipsum dolor isit amet",
    },
    {
      videoUri:
        "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
      likes: 1029859,
      comments: 10748,
      author: "neymarjr",
      description: "lorem ipsum dolor isit amet",
    },
    {
      videoUri:
        "https://assets.mixkit.co/videos/preview/mixkit-man-under-multicolored-lights-1237-large.mp4",
      likes: 1029859,
      comments: 10748,
      author: "neymarjr",
      description: "lorem ipsum dolor isit amet",
    },
    {
      videoUri:
        "https://assets.mixkit.co/videos/preview/mixkit-man-holding-neon-light-1238-large.mp4",
      likes: 1029859,
      comments: 10748,
      author: "neymarjr",
      description: "lorem ipsum dolor isit amet",
    },
  ]);

  useEffect(() => {
    if (activeSlider + 1 === sliders.length) return getMorePosts();
  }, [activeSlider]);

  const getMorePosts = () => {
    setLoadingPosts(true);
    setSliders((oldSliders) => {
      return [...oldSliders, ...sliders];
    });
  };

  return (
    <motion.div
      key="homePage"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}
    >
      <FullPage
        beforeChange={({ to }) => setActiveSlider(to)}
        initialSlide={initialSlide}
      >
        {sliders.map((video, index) => (
          <Slide key={index}>
            <Post props={video} isPlaying={activeSlider === index} />
          </Slide>
        ))}
      </FullPage>
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
