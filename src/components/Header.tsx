import { Button } from "./ui/button";
import { SunMedium, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setStatus } from "../store/filterSlice";
import { useGetCategoriesQuery } from "../todoApi";
import type { Category } from "../todoApi";
import { AppDispatch, RootState } from "@/store/store";
import { useAddTodoMutation } from "../todoApi";

const Header = () => {
  const { setTheme, theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { selectedCategory, selectedStatus } = useSelector(
    (state: RootState) => state.filters,
  );
  const [newTodoCategory, setNewTodoCategory] = useState("all");
  const [newTodoText, setNewTodoText] = useState("");
  const [addTodo, { isLoading }] = useAddTodoMutation();
  return (
    <header className="flex w-full flex-col items-center justify-between gap-4">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="cursor-pointer">
              {theme === "dark" ? <Moon /> : <SunMedium />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex w-full justify-between gap-2">
        <Input
          placeholder="Add a new todo..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <Select value={newTodoCategory} onValueChange={setNewTodoCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" disabled>
              Select a category
            </SelectItem>
            {categories.map((category: Category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          disabled={
            newTodoCategory === "all" || !newTodoText.trim() || isLoading
          }
          className="cursor-pointer"
          onClick={async () => {
            try {
              await addTodo({
                text: newTodoText,
                category: newTodoCategory,
                description: "",
                completed: false,
              }).unwrap();
              setNewTodoText("");
            } catch (error) {
              console.error("Failed to add todo:", error);
            }
          }}
        >
          {isLoading ? "Adding..." : "+ Add"}
        </Button>
      </div>
      <div className="flex w-full gap-2">
        <Select
          value={selectedCategory}
          onValueChange={(value) => dispatch(setCategory(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category: Category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedStatus}
          onValueChange={(value) =>
            dispatch(setStatus(value as "all" | "completed" | "active"))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="active">Active</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default Header;
