import type { Book } from '@/types/book';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:5000/api',
        baseUrl: 'https://library-management-api-ten-delta.vercel.app/api',
    }),
    tagTypes: ['Book'],

    endpoints: (builder) => ({
        getBooks: builder.query<Book[], void>({
            query: () => '/books',
            transformResponse: (response: { success: boolean; message: string; data: Book[] }) => response.data,
            providesTags: ['Book'],
        }),

        getBook: builder.query<Book, string>({
            query: (id) => `/books/${id}`,
            transformResponse: (response: { success: boolean; message: string; data: Book }) => response.data,
            providesTags: ['Book'],
        }),

        addBook: builder.mutation({
            query: (newBook) => ({
                url: '/books',
                method: 'POST',
                body: newBook,
            }),
            invalidatesTags: ['Book'],
        }),

        deleteBook: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Book"],
        }),

        updateBook: builder.mutation<{ success: boolean; message: string; data: Book }, { id: string; payload: Partial<Book> }>({
            query: ({ id, payload }) => ({
                url: `/books/${id}`,
                method: "PATCH",
                body: payload,
            }),
            invalidatesTags: ["Book"],
        }),

    }),
});

export const { useGetBooksQuery, useGetBookQuery, useAddBookMutation, useDeleteBookMutation, useUpdateBookMutation } = bookApi;