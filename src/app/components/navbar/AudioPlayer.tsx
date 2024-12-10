// scr/app/components/navbar/AudioPlayer.tsx
import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface AudioPlayerProps {
    playOnPaths: string[];
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ playOnPaths }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const pathname = usePathname();
    const musicVolume = 0.3;

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = musicVolume;
        }
    }, []);

    useEffect(() => {
        if (audioRef.current && !isPlaying && playOnPaths.includes(pathname)) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch((error) => {
                    console.log("Playback failed:", error);
                    setIsPlaying(false);
                });
        }
    }, [pathname, playOnPaths]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const handleEnded = () => setIsPlaying(false);
            const handlePause = () => setIsPlaying(false);
            const handlePlay = () => setIsPlaying(true);

            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('play', handlePlay);

            return () => {
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('play', handlePlay);
            };
        }
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (!playOnPaths.includes(pathname)) {
        return null;
    }

    return (
        <div className="audio-player">
            <button
                className="audio-control"
                onClick={togglePlay}
                title="Click to play/pause music"
            >
                {isPlaying ? (
                    <FaPause className="play-icon playing" />
                ) : (
                    <FaPlay className="play-icon" />
                )}
            </button>
            <audio
                ref={audioRef}
                src="/audio/yellow.mp3"
                loop
                preload="auto"
            />
        </div>
    );
};

export default AudioPlayer;