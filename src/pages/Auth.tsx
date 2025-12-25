import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, BookOpenText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Simulate authentication
    toast({
      title: isLogin ? "Welcome Back!" : "Account Created",
      description: isLogin 
        ? "You have successfully logged in" 
        : "Please check your email to verify your account",
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-celestial-fade">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center animate-float glow-gold-strong">
            <BookOpenText className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="font-arabic text-3xl text-primary text-glow">
            QURAN MASTER
          </h1>
          <p className="text-secondary-foreground mt-2">
            {isLogin ? "Welcome back to your spiritual journey" : "Begin your divine journey"}
          </p>
        </div>

        {/* Form */}
        <div className="cosmic-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-secondary-foreground mb-2 font-ui text-sm">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full py-3 pl-12 pr-4 rounded-xl bg-secondary/50 border border-primary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-secondary-foreground mb-2 font-ui text-sm">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full py-3 pl-12 pr-4 rounded-xl bg-secondary/50 border border-primary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-secondary-foreground mb-2 font-ui text-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full py-3 pl-12 pr-12 rounded-xl bg-secondary/50 border border-primary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-secondary-foreground mb-2 font-ui text-sm">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Confirm your password"
                    className="w-full py-3 pl-12 pr-4 rounded-xl bg-secondary/50 border border-primary/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-primary text-sm font-ui hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button type="submit" className="btn-gold w-full py-4 text-lg">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center mt-6 pt-6 border-t border-primary/20">
            <p className="text-secondary-foreground font-ui text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary ml-2 hover:underline font-medium"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>

        {/* Back to app */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-primary transition-colors font-ui text-sm"
          >
            ← Back to Quran Reader
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
