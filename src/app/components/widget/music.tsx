import { useEffect, useRef, useState } from "react";

export default function WidgetMusic() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false); 
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/assets/audios/bgm.mp3");
    audioRef.current.loop = true;

    audioRef.current.play().then(() =>setIsPlaying(true)).catch(() => {});

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handlePlay = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div id="music-widget" className="fixed flex items-center bg-white shadow rounded-lg bottom-4 right-4 p-2">
        {isPlaying
          ? (<button onClick={handlePause} key="pause-button"
              className="flex items-center justify-center text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6">
              <i className="fa-solid fa-volume-xmark"></i>
            </button>
          )
          : (
            <button onClick={handlePlay} key="play-button"
              className="flex items-center justify-center text-white bg-green-500 hover:bg-green-600 rounded-full w-6 h-6">
              <i className="fa-solid fa-volume-high"></i>
            </button>
          )
        }
      </div>
    </>
  )
}
