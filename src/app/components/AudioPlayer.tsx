"use client";

import React, { useEffect, useRef } from "react";
import "../styles/AudioPlayer.css";

interface Song {
    id: number;
    title: string;
    album: string;
    year: string;
    duration: string;
    imageUrl: string;
    audioUrl: string;
}

interface AudioPlayerProps {
    currentSong: Song;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ currentSong }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play();
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [currentSong]);

    return (
        <div className="audio-player">
            <audio ref={audioRef} controls src={currentSong.audioUrl}>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayer;
