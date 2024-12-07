"use client";

import type { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "@/lib/features/counter/counterSlice";
import { useCreateTestMutation, useGetTestQuery } from "@/lib/api/apiSlice";

export default function Counter() {
    const { data: testData, isLoading, isError } = useGetTestQuery({ id: 999 });
    const [
        createTestMutation,
        { data: createdTestData, isLoading: isCreatingTest },
    ] = useCreateTestMutation();
    const counter = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    if (!testData || isError) {
        return <div>Unable to fetch API...</div>;
    }

    const handleCreate = async () => {
        createTestMutation({
            name: "param from frontend",
        });
    };

    return (
        <div>
            {isLoading ? (
                <div>Loading GET /test ...</div>
            ) : (
                <div>
                    Result from GET /test: id: {testData.id} name:{" "}
                    {testData.name}
                </div>
            )}
            {isCreatingTest ? (
                <div>Loading POST /test...</div>
            ) : (
                <div>Result from POST /test: {createdTestData?.name}</div>
            )}
            <button aria-label="Decrement value" onClick={handleCreate}>
                Click here to sent something to backend
            </button>
            <br />
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
            <span> {counter} </span>
            <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
        </div>
    );
}
