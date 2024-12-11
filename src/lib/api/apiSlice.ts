import type { Test } from "@/types/model/Test"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Concert } from "@/types/model/Concert"
import type { ConcertDetailData } from "@/types/model/ConcertDetailData"
import type TicketTypeResponse from "@/types/model/TicketTypeResponse"
import type { Merchandise } from "@/types/model/Merchandise"
import type { OrderRequest } from "@/types/model/OrderRequest"

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
        getOrderById: builder.query<OrderResponse, { id: number }>({
            query: ({ id }) => `/orders/${id}`,
        }),
        getTicketTypeById: builder.query<TicketTypeResponse[], { id: string }>({
            query: ({ id }) => `/ticket-types/concert/${id}`,
        }),
        getMerchandiseByConcertId: builder.query<Merchandise[], { id: string }>(
            { query: ({ id }) => `/merchandises/${id}` }
        ),
        createOrder: builder.mutation<OrderResponse, OrderRequest>({
            query: (body) => ({
                url: "/orders",
                method: "POST",
                body,
            }),
        }),
        updateOrderStatus: builder.mutation<OrderResponse, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `/orders/${id}/status`,
                method: "PATCH",
                body: { status: status },
            }),
        }),
    }),
})

export const {
    useGetTestQuery,
    useCreateTestMutation,
    useGetConcertsQuery,
    useGetConcertByIdQuery,
    useGetOrderByIdQuery,
    useGetTicketTypeByIdQuery,
    useGetMerchandiseByConcertIdQuery,
    useCreateOrderMutation,
    useUpdateOrderStatusMutation,
} = apiSlice
