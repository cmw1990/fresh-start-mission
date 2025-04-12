
import { useThemePreference } from '@/hooks/useThemePreference';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sun, Moon, Laptop } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme, isLoading } = useThemePreference();
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Theme Preference</CardTitle>
          <CardDescription>Choose your preferred appearance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-6">
            <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Theme Preference</CardTitle>
        <CardDescription>Choose your preferred appearance</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem
              value="light"
              id="theme-light"
              className="sr-only"
            />
            <Label
              htmlFor="theme-light"
              className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${
                theme === 'light' ? 'border-primary' : ''
              }`}
            >
              <Sun className="h-5 w-5 mb-3" />
              Light
            </Label>
          </div>
          
          <div>
            <RadioGroupItem
              value="dark"
              id="theme-dark"
              className="sr-only"
            />
            <Label
              htmlFor="theme-dark"
              className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${
                theme === 'dark' ? 'border-primary' : ''
              }`}
            >
              <Moon className="h-5 w-5 mb-3" />
              Dark
            </Label>
          </div>
          
          <div>
            <RadioGroupItem
              value="system"
              id="theme-system"
              className="sr-only"
            />
            <Label
              htmlFor="theme-system"
              className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${
                theme === 'system' ? 'border-primary' : ''
              }`}
            >
              <Laptop className="h-5 w-5 mb-3" />
              System
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ThemeSwitcher;
