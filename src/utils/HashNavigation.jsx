import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global component to handle anchor/hash navigation
 * Scrolls to elements with matching IDs when hash changes
 */
export default function HashNavigation() {
  const location = useLocation();

  useEffect(() => {
    // Extract hash from URL (e.g., "#contact" from "/quote#contact")
    const hash = location.hash.slice(1); // Remove '#'

    if (hash) {
      // Give DOM time to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Scroll to top if no hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null; // This component doesn't render anything
}
