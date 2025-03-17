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
import { Select, SelectTrigger, SelectValue } from "./ui/select";

const Header = () => {
  const { setTheme, theme } = useTheme();

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
        <Input placeholder="Add a new todo..." />
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a priority" />
          </SelectTrigger>
        </Select>
        <Button>+ Add</Button>
      </div>
      <div className="flex w-full gap-2">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
        </Select>
      </div>
    </header>
  );
};

export default Header;
