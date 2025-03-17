import { Button } from "./ui/button";
import { SunMedium } from "lucide-react";

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <Button variant="outline" size="icon" className="cursor-pointer">
        <SunMedium />
      </Button>
    </header>
  );
};

export default Header;
