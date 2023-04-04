import { useEffect, useRef } from "react";

const Video = ({videoUri, isPlaying}) => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    videoRef.current.pause();
  }, [])

  useEffect(() => {
    setVideoStatus();
  }, [isPlaying])

  const setVideoStatus = () => {
    if (isPlaying) return videoRef.current.play();

    videoRef.current.pause();
  }
  
  return (
    <video
      ref={videoRef}
      preload="true"
      controls={false}
      autoPlay
      muted
      loop
      playsInline
      className="object-cover w-full h-full"
      src={`${videoUri}#t=0`}
      type="video/mp4"
    />
  );
};

export { Video };
