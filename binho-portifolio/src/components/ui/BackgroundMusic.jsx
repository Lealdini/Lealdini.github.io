import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  // Initialize audio settings
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, [volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Audio playback prevented by browser policy:", err);
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume > 0 ? volume : 0.2;
      if (volume === 0) setVolume(0.2);
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const bars = [1, 2, 3, 4];

  return (
    <div className="fixed z-50 flex items-center gap-3 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/60 dark:border-white/10 shadow-lg rounded-full py-2 px-4 transition-colors duration-500 top-6 right-6 md:top-8 md:right-8">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/audio/alive.wav" preload="auto" />

      {/* Play / Pause Button */}
      <button 
        onClick={togglePlay}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>

      {/* Volume Control */}
      <div 
        className="flex items-center gap-2"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        <button 
          onClick={toggleMute}
          className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors flex items-center justify-center"
          aria-label="Toggle Mute"
        >
          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        <AnimatePresence>
          {showVolume && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "60px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="overflow-hidden hidden md:flex items-center"
            >
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                aria-label="Volume"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Equalizer Visualizer */}
      <div className="flex items-end h-4 gap-[2px] ml-1">
        {bars.map((bar) => (
          <motion.div
            key={bar}
            className="w-1 bg-emerald-500 dark:bg-accent rounded-t-sm origin-bottom"
            animate={{
              height: isPlaying && !isMuted && volume > 0
                ? ["20%", "100%", "40%", "80%", "20%"] 
                : "20%",
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bar * 0.15, // stagger the animation
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundMusic;
