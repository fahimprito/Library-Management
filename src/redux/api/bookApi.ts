import type { Book } from '@/types/book';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ['Book'],

    endpoints: (builder) => ({
        getBooks: builder.query<Book[], void>({
            query: () => '/books',
            transformResponse: (response: { success: boolean; message: string; data: Book[] }) => response.data,
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

    }),
});

export const { useGetBooksQuery, useAddBookMutation } = bookApi;