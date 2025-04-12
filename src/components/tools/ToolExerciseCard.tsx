
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Star, Play } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToolExerciseProps {
  title: string;
  description: string;
  duration: string;
  difficulty: "easy" | "moderate" | "challenging";
  tags?: string[];
  onStart?: () => void;
  className?: string;
  popular?: boolean;
}

const ToolExerciseCard = ({
  title,
  description,
  duration,
  difficulty,
  tags = [],
  onStart,
  className,
  popular = false,
}: ToolExerciseProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {popular && (
            <div className="bg-amber-100 text-amber-700 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium">
              <Star className="h-3 w-3" />
              <span>Popular</span>
            </div>
          )}
        </div>
        <CardDescription className="text-sm mt-1">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="text-muted-foreground">
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                difficulty === "easy" && "bg-green-100 text-green-700",
                difficulty === "moderate" && "bg-blue-100 text-blue-700",
                difficulty === "challenging" && "bg-purple-100 text-purple-700"
              )}
            >
              {difficulty}
            </span>
          </div>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={onStart}
          className="w-full bg-fresh-300 hover:bg-fresh-400 text-white"
        >
          <Play className="h-4 w-4 mr-2" /> Start Exercise
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolExerciseCard;
