import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Category {
  name: string;
  color: string;
}

export interface Todo {
  id: string;
  text: string;
  description: string;
  completed: boolean;
  category: string;
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Todo", "Category"],
  endpoints: (builder) => ({
    // Queries
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todo"],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
    getTodoById: builder.query<Todo, string>({
      query: (id) => `/todos/${id}`,
      providesTags: ["Todo"],
    }),
    getDescription: builder.query<string, string>({
      query: (id) => `/todos/${id}/description`,
      providesTags: ["Todo"],
    }),

    // Mutations
    addTodo: builder.mutation<Todo, Omit<Todo, "id">>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),

    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: "PUT",
        body: todo,
      }),
      invalidatesTags: ["Todo"],
    }),

    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),

    toggleTodo: builder.mutation<Todo, { id: string; completed: boolean }>({
      query: ({ id, completed }) => ({
        url: `/todos/${id}`,
        method: "PATCH",
        body: { completed },
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetCategoriesQuery,
  useGetTodoByIdQuery,
  useGetDescriptionQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useToggleTodoMutation,
} = todoApi;
