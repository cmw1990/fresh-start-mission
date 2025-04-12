
import { Link } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const WebToolsDropdown = () => {
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
          <Link to="/tools/nrt-guide">NRT Guide</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/tools/smokeless-directory">Smokeless Directory</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/tools/quit-methods">Quit Methods</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/tools/holistic-health">Holistic Health</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/tools/calculators">Calculators</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WebToolsDropdown;
