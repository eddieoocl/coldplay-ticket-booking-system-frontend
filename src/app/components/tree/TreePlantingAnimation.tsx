'use client'

import { useState, useEffect, useRef } from 'react'
import { useSpring, animated, config } from 'react-spring'
import TreeGrowthAnimation from './TreeGrowthAnimation'

interface TreePlantingAnimationProps {
    treePlanterRank: number
    totalTreesPlanted: number
    onClose: () => void
}

export default function TreePlantingAnimation({ treePlanterRank, totalTreesPlanted, onClose }: TreePlantingAnimationProps) {
    const [show, setShow] = useState(false)
    const [showNumbers, setShowNumbers] = useState(false)

    const rankNumber = useSpring({
        number: showNumbers ? treePlanterRank : 0,
        from: { number: 0 },
        config: { ...config.molasses, duration: 2000 },
    })

    const treesNumber = useSpring({
        number: showNumbers ? totalTreesPlanted : 0,
        from: { number: 0 },
        config: { ...config.molasses, duration: 2000 },
    })

    useEffect(() => {
        setShow(true)
        const timer = setTimeout(() => {
            setShowNumbers(true)
        }, 3000) // Start showing numbers after tree growth animation

        const closeTimer = setTimeout(() => {
            setShow(false)
        }, 10000) // Total animation duration

        return () => {
            clearTimeout(timer)
            clearTimeout(closeTimer)
        }
    }, []) // 添加空依赖数组

    const fadeAnimation = useSpring({
        opacity: show ? 1 : 0,
        config: { ...config.molasses, duration: 1000 },
        onRest: () => {
            if (!show) {
                onClose()
            }
        },
    })

    return (
        <animated.div
            style={fadeAnimation}
            className="fixed inset-0 flex items-center justify-center bg-green-900 bg-opacity-90 z-50"
        >
            <div className="text-center text-white">
                <TreeGrowthAnimation />
                {showNumbers && (
                    <>
                        <h2 className="text-4xl font-bold mb-8">感谢您的贡献！</h2>
                        <p className="text-2xl mb-4">
                            您是第{' '}
                            <animated.span className="font-bold text-yellow-400 text-5xl mx-2">
                                {rankNumber.number.to(n => Math.floor(n))}
                            </animated.span>{' '}
                            位种树的人
                        </p>
                        <p className="text-2xl">
                            目前我们已经累计种植了
                        </p>
                        <animated.span className="font-bold text-green-400 text-6xl block my-4">
                            {treesNumber.number.to(n => Math.floor(n))}
                        </animated.span>
                        <p className="text-2xl">棵树</p>
                    </>
                )}
            </div>
        </animated.div>
    )
}

