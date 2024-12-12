"use client";

import Lottie from "lottie-react";
import { useMemo } from "react";
import treeAnimation from "@/lib/lottiefiles/tree-animation.json";

export default function TreeGrowthAnimation() {
    const options = useMemo(() => {
        return {
            animationData: treeAnimation,
            loop: false,
            autoplay: true,
        };
    }, []);

    return (
        <div className="w-64 h-64 mx-auto mb-8">
            <Lottie {...options} />
        </div>
    );
}
