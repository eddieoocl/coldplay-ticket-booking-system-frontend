"use client";

import type { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/lib/features/counter/counterSlice";

export default function Counter() {
    const counter = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
            <span>{counter}</span>
            <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
        </div>
    );
}
