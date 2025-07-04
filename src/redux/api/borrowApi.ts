import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Borrow, IBorrowSummary } from "@/types/borrow";

interface BorrowRequest {
    book: string;
    quantity: number;
    dueDate: string;
}

interface BorrowResponse {
    success: boolean;
    message: string;
    data: Borrow;
}

export const borrowApi = createApi({
    reducerPath: "borrowApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Borrow", "Book"],
    endpoints: (builder) => ({

        borrowBook: builder.mutation<BorrowResponse, BorrowRequest>({
            query: (body) => ({
                url: "/borrow",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Book", "Borrow"],
        }),

        getBorrowSummary: builder.query<IBorrowSummary[], void>({
            query: () => "/borrow",
            transformResponse: (response: { success: boolean; message: string; data: IBorrowSummary[] }) => response.data,
            providesTags: ["Borrow"],
        }),

    }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;