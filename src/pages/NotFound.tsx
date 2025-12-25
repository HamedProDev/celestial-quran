import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="text-center animate-celestial-fade">
        <div className="font-arabic text-8xl text-primary/20 mb-8">٤٠٤</div>
        <h1 className="text-4xl text-primary mb-4 font-medium text-glow">Page Not Found</h1>
        <p className="text-secondary-foreground text-lg mb-8">The path you seek does not exist.</p>
        <Link to="/" className="btn-gold inline-flex items-center gap-2">
          <Home className="w-5 h-5" />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
