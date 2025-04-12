
import { useState, useEffect } from 'react';
import { getUserPreferences, updateThemePreference } from '@/services/userPreferencesService';
import { useAuth } from '@/contexts/AuthContext';

type Theme = 'light' | 'dark' | 'system';

export function useThemePreference() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  // Load theme preference from user preferences
  useEffect(() => {
    const loadThemePreference = async () => {
      if (!user) {
        // If no user, check system preference or default to light
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(systemPreference);
        setIsLoading(false);
        return;
      }
      
      try {
        const preferences = await getUserPreferences();
        if (preferences?.theme) {
          setTheme(preferences.theme as Theme);
        } else {
          // Default to system preference
          setTheme('system');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadThemePreference();
  }, [user]);
  
  // Apply theme to document
  useEffect(() => {
    if (isLoading) return;
    
    const applyTheme = () => {
      let activeTheme = theme;
      
      if (theme === 'system') {
        // Check system preference
        activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      if (activeTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    applyTheme();
    
    // Set up listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, isLoading]);
  
  // Change theme and save preference
  const setThemePreference = async (newTheme: Theme) => {
    setTheme(newTheme);
    
    if (user) {
      try {
        await updateThemePreference(newTheme);
      } catch (error) {
        console.error('Error saving theme preference:', error);
      }
    }
  };
  
  return { theme, setTheme: setThemePreference, isLoading };
}
