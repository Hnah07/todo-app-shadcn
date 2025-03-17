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

    addTodo: builder.mutation<Todo, Omit<Todo, "id">>({
      queryFn: async (todo) => {
        const response = await fetch("http://localhost:3000/todos");
        const todos = await response.json();
        const maxId = Math.max(...todos.map((t: Todo) => parseInt(t.id) || 0));
        const nextId = (maxId + 1).toString();

        const newTodo = { ...todo, id: nextId };

        const postResponse = await fetch("http://localhost:3000/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTodo),
        });

        if (!postResponse.ok) {
          throw new Error("Failed to add todo");
        }

        return { data: newTodo };
      },
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
