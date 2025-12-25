import { ReactNode } from "react";

interface GridCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

const GridCard = ({ icon, title, description, onClick }: GridCardProps) => {
  return (
    <div
      onClick={onClick}
      className="grid-cosmic cursor-pointer group"
    >
      {/* Icon */}
      <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center glow-gold group-hover:scale-110 transition-transform duration-300">
        <span className="text-primary-foreground">
          {icon}
        </span>
      </div>
      
      {/* Title */}
      <h3 className="text-center text-2xl text-primary mb-3 font-medium">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-center text-secondary-foreground opacity-90 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default GridCard;
