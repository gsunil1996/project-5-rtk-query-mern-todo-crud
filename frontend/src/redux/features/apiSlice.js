import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/',
            providesTags: ['Todos']
        }),
        getSingleTodo: builder.query({
            query: (id) => `/todo/${id}`,
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({
            query: (text) => ({
                url: '/save',
                method: 'POST',
                body: text
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['Todos']
        }),
        changeTodoStatus: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/status/${id}`,
                method: 'PUT',
                body: rest
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todos']
        }),
    })
})

export const {
    useGetTodosQuery,
    useGetSingleTodoQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    useChangeTodoStatusMutation
} = apiSlice