
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface QuickToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  iconColor?: string;
  iconBgColor?: string;
  className?: string;
}

const QuickToolCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  iconColor = "text-blue-500",
  iconBgColor = "bg-blue-50",
  className,
}: QuickToolCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-200", 
        isHovering ? "shadow-md transform -translate-y-1" : "",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <CardHeader className="p-4 flex flex-row items-center gap-4 pb-2">
        <div className={cn(
          "p-2 rounded-lg transition-colors duration-200", 
          iconBgColor,
          isHovering ? `${iconBgColor.replace('50', '100')}` : iconBgColor
        )}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <Button 
          onClick={onClick} 
          variant={isHovering ? "default" : "outline"}
          className={cn(
            "w-full transition-all duration-200",
            isHovering ? "bg-fresh-300 hover:bg-fresh-400 text-white" : ""
          )}
        >
          Use Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickToolCard;
