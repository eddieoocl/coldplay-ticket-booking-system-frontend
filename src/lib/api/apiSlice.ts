import type { Test } from "@/types/model/Test";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Concert } from "@/types/model/Concert";
import type { ConcertDetailData } from "@/types/model/ConcertDetailData";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    }),
    endpoints: (builder) => ({
        getTest: builder.query<Test, { id: Test["id"] }>({
            query: ({ id }) => `/test?id=${id}`,
        }),
        createTest: builder.mutation<Test, Omit<Test, "id">>({
            query: (body) => ({
                url: "/test",
                method: "POST",
                body,
            }),
        }),
        getConcerts: builder.query<Concert[], void>({
            query: () => "/concerts",
        }),
        getConcertById: builder.query<ConcertDetailData, { id: string }>({
            query: ({ id }) => `/concerts/${id}`,
        }),
        getOrderById: builder.query<OrderResponse, { id: string }>({
            query: ({ id }) => `/orders/${id}`,
        }),
        getTicketTypeById: builder.query<OrderResponse, { id: string }>({
            query: ({ id }) => `/ticket-types/concert/${id}`,
        }),
    }),
});

export const {
    useGetTestQuery,
    useCreateTestMutation,
    useGetConcertsQuery,
    useGetConcertByIdQuery,
    useGetOrderByIdQuery,
    useGetTicketTypeByIdQuery,
} = apiSlice;
