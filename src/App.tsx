import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useGetTodosQuery,
  useToggleTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
  Todo,
} from "@/todoApi";
import { badgeVariants } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Pencil, X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Pagination from "@/components/Pagination";
import Stats from "@/components/Stats";

const App = () => {
  const { data: todos = [] } = useGetTodosQuery();
  const [toggleTodo] = useToggleTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [openId, setOpenId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState<string>("");
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const { selectedCategory, selectedStatus } = useSelector(
    (state: RootState) => state.filters,
  );
  const { currentPage, itemsPerPage } = useSelector(
    (state: RootState) => state.pagination,
  );

  useEffect(() => {
    if (openId) {
      const todo = todos.find((t) => t.id === openId);
      if (todo) {
        setEditingDescription(todo.description);
      }
    }
  }, [openId, todos]);

  const handleDescriptionChange = (todo: Todo, newDescription: string) => {
    setEditingDescription(newDescription);
    updateTodo({
      ...todo,
      description: newDescription,
    }).then(() => {
      toast.success("Description updated");
    });
  };

  const handleTitleEdit = (todo: Todo) => {
    setEditingTitleId(todo.id);
    setEditingTitle(todo.text);
  };

  const handleTitleSave = (todo: Todo) => {
    if (editingTitle.trim()) {
      updateTodo({
        ...todo,
        text: editingTitle.trim(),
      }).then(() => {
        toast.success("Title updated");
        setEditingTitleId(null);
      });
    }
  };

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId).then(() => {
      toast.success("Todo deleted");
    });
  };

  const filteredTodos = todos.filter((todo) => {
    const categoryMatch =
      selectedCategory === "all" || todo.category === selectedCategory;
    const statusMatch =
      selectedStatus === "all" ||
      (selectedStatus === "completed" && todo.completed) ||
      (selectedStatus === "active" && !todo.completed);
    return categoryMatch && statusMatch;
  });

  const sortedTodos = [...filteredTodos].sort(
    (a, b) => parseInt(b.id) - parseInt(a.id),
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTodos = sortedTodos.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <>
      <Toaster />
      <div className="space-y-4">
        <div className="space-y-4">
          {paginatedTodos.map((todo) => (
            <Collapsible
              className={`w-full rounded-md border-1 border-gray-200 px-6 py-2 ${
                todo.completed ? "bg-gray-50 dark:bg-gray-800/50" : ""
              }`}
              key={todo.id}
              open={openId === todo.id}
              onOpenChange={(isOpen) => setOpenId(isOpen ? todo.id : null)}
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={(checked) => {
                    toggleTodo({
                      id: todo.id,
                      completed: checked as boolean,
                    }).then(() => {
                      toast.success(
                        todo.completed
                          ? "Todo marked as incomplete"
                          : "Todo marked as complete",
                      );
                    });
                  }}
                />
                {editingTitleId === todo.id ? (
                  <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                    <Input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="w-full"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleTitleSave(todo);
                        }
                      }}
                    />
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleTitleSave(todo)}
                      >
                        <Check className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingTitleId(null)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p
                    className={`flex-1 ${todo.completed ? "text-gray-500 line-through" : ""}`}
                  >
                    {todo.text}
                  </p>
                )}
                <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                  <div className="order-last flex items-center justify-end gap-2 sm:order-first">
                    <Badge
                      variant={todo.category as keyof typeof badgeVariants}
                    >
                      {todo.category}
                    </Badge>
                    <CollapsibleTrigger className="flex h-8 w-8 items-center justify-center">
                      {openId === todo.id ? (
                        <ChevronUp className="size-4" />
                      ) : (
                        <ChevronDown className="size-4" />
                      )}
                    </CollapsibleTrigger>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                      onClick={() => handleTitleEdit(todo)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      onClick={() => handleDelete(todo.id)}
                    >
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <CollapsibleContent>
                <div className="-mx-6 my-2 h-px w-[calc(100%+3rem)] bg-gray-200" />
                <p className="text-sm text-gray-500">Description</p>
                <Textarea
                  className="mt-2 text-sm text-gray-500"
                  value={
                    openId === todo.id ? editingDescription : todo.description
                  }
                  onChange={(e) =>
                    handleDescriptionChange(todo, e.target.value)
                  }
                />
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        <Pagination totalItems={filteredTodos.length} />
        <Stats todos={todos} />
      </div>
    </>
  );
};

export default App;
