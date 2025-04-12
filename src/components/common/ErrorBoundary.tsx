
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw, ArrowLeft } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.resetErrorState = this.resetErrorState.bind(this);
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    
    // Log to console in development
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // In a production app, you would log to a service like Sentry here
    // Example: Sentry.captureException(error);
  }
  
  resetErrorState() {
    this.setState({ hasError: false, error: null, errorInfo: null });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200 max-w-lg mx-auto my-8">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4 text-center">
            We've encountered an unexpected error while rendering this component.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <button
              onClick={this.resetErrorState}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              aria-label="Try again"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </button>
            
            <button
              onClick={() => window.location.href = '/app/dashboard'}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              aria-label="Go to dashboard"
            >
              <ArrowLeft className="h-4 w-4" />
              Go to Dashboard
            </button>
          </div>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-6 p-4 bg-gray-800 text-white rounded text-sm overflow-auto max-h-48 w-full">
              <p className="font-bold mb-2">Error Details (Development Only):</p>
              <p className="mb-2">{this.state.error.toString()}</p>
              {this.state.errorInfo && (
                <pre className="text-xs whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
