// src/app/components/VideoPlayer.tsx
import React from "react";
import "../styles/VideoPlayer.css";

const VideoPlayer: React.FC = () => {
    return (
        <div className="video-player-container">
            <video controls className="video-player">
                <source src="/video/coldplay.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
