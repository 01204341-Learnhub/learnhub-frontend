import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { StudentCourseLessonProgress } from "../types/progress";

interface VideoPlayerProps {
  url: string;
  lessonProgress: StudentCourseLessonProgress;
  onProgressUpdate: (progress: StudentCourseLessonProgress) => void;
}

function VideoLessonPlayer({ url, lessonProgress, onProgressUpdate }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  useEffect(() => {
    setTimeout(() => {
      if (playerRef.current) {
        console.log(lessonProgress.lessonCompleted);
        playerRef.current.seekTo(lessonProgress.lessonCompleted / 100, "fraction");
        setPlaying(true);
      }
    }, 200)
  }, [lessonProgress])

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleVolumeChange = (volume: number) => {
    setVolume(volume);
  };

  const handleProgress = (state: OnProgressProps) => {
    if (!playing) return;
    if (!seeking) {
      setPlayed(state.played);
    }
    const newProgress = {
      ...lessonProgress,
      lessonCompleted: parseInt((state.played * 100).toFixed(0)),
    };
    if (state.played > 0.9) {
      newProgress.finished = true;
    }
    onProgressUpdate(newProgress);
  };

  const handleSeek = (played: number) => {
    setPlayed(played);
    setSeeking(true);
  };

  const handleSeekChange = (played: number) => {
    setPlayed(played);
  };

  const handleSeekMouseUp = (played: number) => {
    setPlayed(played);
    setSeeking(false);
    playerRef.current?.seekTo(played);
  };
  const handleEnded = () => {
    setPlaying(false);
    const newProgress = {
      ...lessonProgress,
      lessonCompleted: 100,
      finished: true,
    };
    onProgressUpdate(newProgress);
  }


  return (
    <div className="player-wrapper aspect-w-16 aspect-h-9 flex items-center justify-center">
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        volume={volume}
        played={played}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onVolumeChange={handleVolumeChange}
        progressInterval={1000 * 30}
        onProgress={handleProgress}
        onSeek={handleSeek}
        onSeekChange={handleSeekChange}
        onSeekMouseUp={handleSeekMouseUp}
        controls={true}
        className="react-player"
      />
    </div>
  );
};

export default VideoLessonPlayer;
