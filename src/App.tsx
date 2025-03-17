import Layout from "./components/Layout";
import { Badge } from "./components/ui/badge";
import { Checkbox } from "./components/ui/checkbox";
import { useGetTodosQuery } from "./todoApi";
import { badgeVariants } from "./components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { ChevronDown, ChevronUp, Pencil, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { Textarea } from "./components/ui/textarea";

const App = () => {
  const { data: todos = [] } = useGetTodosQuery();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Layout>
      <div className="space-y-4">
        {todos.map((todo) => (
          <Collapsible
            className={`w-full rounded-md border-1 border-gray-200 px-6 py-2 ${
              todo.completed ? "bg-gray-50 dark:bg-gray-800/50" : ""
            }`}
            key={todo.id}
            open={openId === todo.id}
            onOpenChange={(isOpen) => setOpenId(isOpen ? todo.id : null)}
          >
            <div className="flex items-center gap-2">
              <Checkbox checked={todo.completed} />
              <p
                className={`flex-1 ${todo.completed ? "text-gray-500 line-through" : ""}`}
              >
                {todo.text}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant={todo.category as keyof typeof badgeVariants}>
                  {todo.category}
                </Badge>
                <CollapsibleTrigger>
                  {openId === todo.id ? (
                    <ChevronUp className="size-4" />
                  ) : (
                    <ChevronDown className="size-4" />
                  )}
                </CollapsibleTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                >
                  <Pencil className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
            <CollapsibleContent>
              <div className="-mx-4 my-2 h-px w-[calc(100%+2rem)] bg-gray-200" />
              <p className="text-sm text-gray-500">Description</p>
              <Textarea className="mt-2 text-sm text-gray-500">
                {todo.description}
              </Textarea>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </Layout>
  );
};

export default App;
