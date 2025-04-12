
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HomeIcon, ChevronRight } from 'lucide-react';

interface PageBreadcrumbProps {
  className?: string;
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({ className }) => {
  const location = useLocation();
  const pathSegments = location.pathname
    .split('/')
    .filter(segment => segment)
    .map(segment => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      path: segment
    }));

  if (pathSegments.length <= 1) return null;

  return (
    <nav className={`flex text-sm text-muted-foreground mb-6 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <Link to="/" className="flex items-center hover:text-primary transition-colors">
            <HomeIcon className="h-4 w-4 mr-1" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          // Build the path to this breadcrumb
          const currentPath = `/${pathSegments.slice(0, index + 1).map(seg => seg.path).join('/')}`;
          
          return (
            <React.Fragment key={segment.path}>
              <li className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
              </li>
              <li>
                {index === pathSegments.length - 1 ? (
                  <span className="font-medium text-foreground">{segment.name}</span>
                ) : (
                  <Link 
                    to={currentPath} 
                    className="hover:text-primary transition-colors"
                  >
                    {segment.name}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default PageBreadcrumb;
