
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 flex flex-row items-center gap-4 pb-2">
        <div className={cn("p-2 rounded-lg", iconBgColor)}>
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
          variant="outline" 
          className="w-full"
        >
          Use Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickToolCard;
