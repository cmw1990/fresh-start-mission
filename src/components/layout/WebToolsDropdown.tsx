
import { Link } from "react-router-dom";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Box, Compass, Calculator, SunMoon, Tablet } from "lucide-react";
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
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem asChild>
          <Link 
            to="/tools" 
            className="flex items-center"
            onClick={() => handleToolClick("Web Tools Hub")}
          >
            <span className="bg-fresh-100 p-1 rounded mr-2">
              <Box className="h-4 w-4 text-fresh-600" />
            </span>
            All Web Tools
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            to="/tools/nrt-guide" 
            className="flex items-center"
            onClick={() => handleToolClick("NRT Guide")}
          >
            <span className="bg-blue-100 p-1 rounded mr-2">
              <Tablet className="h-4 w-4 text-blue-600" />
            </span>
            NRT Guide
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/tools/smokeless-directory" 
            className="flex items-center"
            onClick={() => handleToolClick("Smokeless Directory")}
          >
            <span className="bg-green-100 p-1 rounded mr-2">
              <Box className="h-4 w-4 text-green-600" />
            </span>
            Smokeless Directory
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/tools/quit-methods" 
            className="flex items-center"
            onClick={() => handleToolClick("Quit Methods")}
          >
            <span className="bg-purple-100 p-1 rounded mr-2">
              <Compass className="h-4 w-4 text-purple-600" />
            </span>
            Quit Methods
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/tools/calculators" 
            className="flex items-center"
            onClick={() => handleToolClick("Calculators")}
          >
            <span className="bg-amber-100 p-1 rounded mr-2">
              <Calculator className="h-4 w-4 text-amber-600" />
            </span>
            Calculators
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link 
            to="/tools/holistic-health" 
            className="flex items-center"
            onClick={() => handleToolClick("Holistic Health")}
          >
            <span className="bg-rose-100 p-1 rounded mr-2">
              <SunMoon className="h-4 w-4 text-rose-600" />
            </span>
            Holistic Health
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WebToolsDropdown;
