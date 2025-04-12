
import { Link } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";

const WebToolsDropdown = () => {
  const handleToolClick = (toolName: string) => {
    toast.info(`Exploring ${toolName}`, {
      description: "Our web tools are free resources to help on your fresh journey.",
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors outline-none"
        >
          Web Tools <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem asChild>
          <Link to="/tools/nrt-guide" onClick={() => handleToolClick("NRT Guide")}>NRT Guide</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/tools/smokeless-directory" onClick={() => handleToolClick("Smokeless Directory")}>Smokeless Directory</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/tools/quit-methods" onClick={() => handleToolClick("Quit Methods")}>Quit Methods</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/tools/holistic-health" onClick={() => handleToolClick("Holistic Health")}>Holistic Health</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/tools/calculators" onClick={() => handleToolClick("Calculators")}>Calculators</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WebToolsDropdown;
