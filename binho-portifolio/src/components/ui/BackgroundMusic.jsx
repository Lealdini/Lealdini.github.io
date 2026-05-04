import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Player de música de fundo.
 *  - Desktop: chip flutuante bottom-right com play, mute e equalizer.
 *  - Mobile: invisível, mas reage ao evento `binho:toggle-music` disparado
 *    pelo botão compacto da Navbar mobile. Estado é emitido de volta via
 *    `binho:music-state` para a navbar mostrar play/pause corretamente.
 *
 * Mantém um único <audio> no DOM independente do dispositivo.
 */
const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, [volume]);

  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay policy bloqueou — apenas log silencioso.
        // eslint-disable-next-line no-console
        console.warn('Audio playback prevented by browser policy:', err);
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  // Escuta evento da navbar mobile + emite estado quando muda.
  useEffect(() => {
    const handleToggle = () => {
      togglePlay();
    };
    window.addEventListener('binho:toggle-music', handleToggle);
    return () => window.removeEventListener('binho:toggle-music', handleToggle);
  }, [togglePlay]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('binho:music-state', { detail: isPlaying })
    );
  }, [isPlaying]);

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
    <>
      {/* Audio element — sempre presente, controla playback */}
      <audio ref={audioRef} preload="none">
        <source src="/audio/alive.opus" type="audio/ogg; codecs=opus" />
        <source src="/audio/alive.mp3" type="audio/mpeg" />
      </audio>

      {/* UI desktop only — no mobile o controle vive na Navbar */}
      <div className="fixed z-30 hidden md:flex items-center gap-3 bg-surface-1/80 backdrop-blur-nav border border-border-default shadow-elevated rounded-pill py-2 px-4 transition-colors duration-base ease-apple bottom-5 right-5">
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/[0.06] text-primary hover:bg-primary/[0.12] transition-colors duration-base ease-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
          aria-pressed={isPlaying}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>

        {/* Volume */}
        <div
          className="flex items-center gap-2"
          onMouseEnter={() => setShowVolume(true)}
          onMouseLeave={() => setShowVolume(false)}
        >
          <button
            onClick={toggleMute}
            className="text-muted hover:text-primary transition-colors duration-base ease-apple flex items-center justify-center min-w-[36px] min-h-[36px] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={isMuted ? 'Desmutar' : 'Mutar'}
            aria-pressed={isMuted}
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <AnimatePresence>
            {showVolume && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '60px', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="overflow-hidden flex items-center"
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-primary/[0.10] rounded-lg appearance-none cursor-pointer accent-accent"
                  aria-label="Volume"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Equalizer */}
        <div className="flex items-end h-4 gap-[2px] ml-1" aria-hidden="true">
          {bars.map((bar) => (
            <motion.div
              key={bar}
              className="w-1 bg-accent rounded-t-sm origin-bottom"
              animate={{
                height:
                  isPlaying && !isMuted && volume > 0
                    ? ['20%', '100%', '40%', '80%', '20%']
                    : '20%',
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: bar * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BackgroundMusic;