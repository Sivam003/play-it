import React from 'react';
import '../public/style/main.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import songList from './songs';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [currSong, setCurrSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  function handlePlayPause() {
    if (!isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  function playNextSong() {
    setCurrSong((currSong+1) % songList.length);
    setIsPlaying(true);
  };

  function playPrevSong() {
    setCurrSong((currSong-1+songList.length) % songList.length);
    setIsPlaying(true);
  };

  function updateProgress() {
    const duration = audioRef.current.duration;
    const currTime = audioRef.current.currentTime;
    setProgress((currTime / duration) * 100);
  }

  function handleSeek(event) {
    const seekTime = (event.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(event.target.value);
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currSong]);  

  return (
    <div className="container">
      <div className="upper">
        <div className="circle">
          <img src={songList[currSong].cover} alt="" />
        </div>
        <audio 
          ref={audioRef}
          src={songList[currSong].location}
          onTimeUpdate={updateProgress}
          onEnded={playNextSong}></audio>
        <div className="details">
          <h2>{songList[currSong].name}</h2>
          <h3>{songList[currSong].artist}</h3>
        </div>
      </div>
      <div className="lower">
        <div className="controls">
          <button onClick={playPrevSong}><SkipPreviousIcon /></button>
          <button onClick={handlePlayPause}>{!isPlaying ? <PlayArrowIcon /> : <PauseIcon />}</button>
          <button onClick={playNextSong}><SkipNextIcon /></button>
        </div>
        <div className="progress-bar">
          <input type="range" min="0" max="100" value={progress} onChange={handleSeek}/>
        </div>
      </div>
    </div>
  )
}

export default App
