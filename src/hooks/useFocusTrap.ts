
import { useRef, useEffect } from 'react';

type FocusTrapOptions = {
  enabled?: boolean;
  autoFocus?: boolean;
  returnFocusOnDeactivate?: boolean;
};

export function useFocusTrap(options: FocusTrapOptions = {}) {
  const {
    enabled = true,
    autoFocus = true,
    returnFocusOnDeactivate = true
  } = options;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  
  // Handle focus trap activation
  useEffect(() => {
    if (!enabled) return;
    
    // Store the currently focused element to return to it later
    previouslyFocused.current = document.activeElement as HTMLElement;
    
    // Focus the container if autoFocus is enabled
    if (autoFocus && containerRef.current) {
      // Focus first focusable element
      const focusableElements = 
        containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
      
      if (focusableElements.length) {
        focusableElements[0].focus();
      } else {
        containerRef.current.focus();
      }
    }
    
    // Cleanup function to handle deactivation
    return () => {
      if (returnFocusOnDeactivate && previouslyFocused.current && 
          document.body.contains(previouslyFocused.current)) {
        previouslyFocused.current.focus();
      }
    };
  }, [enabled, autoFocus, returnFocusOnDeactivate]);
  
  // Handle keyboard navigation for the focus trap
  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle Tab key
      if (e.key !== 'Tab' || !containerRef.current) return;
      
      const focusableElements = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled'));
      
      if (focusableElements.length === 0) return;
      
      // Determine direction and get appropriate element
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey) {
        // If shift+tab and first element is active, move to last
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // If tab and last element is active, move to first
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);
  
  return { containerRef };
}
