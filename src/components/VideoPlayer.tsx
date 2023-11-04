import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

interface VideoPlayerProps {
  url: string;
  onGetDuration?: (duration: number) => void;
  onError?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (playerRef.current?.getDuration() && props.onGetDuration) {
        props.onGetDuration(playerRef.current.getDuration())
      }
    }, 200)
    return () => { clearInterval(id) }
  }, [playerRef, props])

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
    if (!seeking) {
      setPlayed(state.played);
    }
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
  if (props.url === "") {
    return <div></div>;
  }

  return (
    <div className="player-wrapper aspect-w-16 aspect-h-9 flex items-center justify-center">
      <ReactPlayer
        ref={playerRef}
        url={props.url}
        playing={playing}
        volume={volume}
        played={played}
        onPlay={handlePlay}
        onPause={handlePause}
        onVolumeChange={handleVolumeChange}
        onProgress={handleProgress}
        onSeek={handleSeek}
        onSeekChange={handleSeekChange}
        onSeekMouseUp={handleSeekMouseUp}
        controls={true}
        className="react-player"
        onError={() => { props.onError() }}
      />
    </div>
  );
};

export default VideoPlayer;
