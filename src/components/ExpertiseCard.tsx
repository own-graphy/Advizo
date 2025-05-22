// src/components/expertise-card.tsx
"use client";

import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

// Define ExpertiseCardProps here as requested by user context (moved from potential types/index.ts)
export interface ExpertiseCardProps {
  id: string;
  category: string;
  type: string; 
  date: string; 
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  link: string;
  imageHint?: string;
}

interface ExpertiseCardComponentProps {
  card: ExpertiseCardProps;
  isSelected: boolean;
  onClick: () => void;
}

const ExpertiseCard: React.FC<ExpertiseCardComponentProps> = ({ card, isSelected, onClick }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleMouseEnter = () => {
    if (isSelected) { // Only allow hover effect for description toggle on selected card
      setIsCardHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isSelected) {
      setIsCardHovered(false);
    }
  };

  // Show full description only if the card is selected, hovered, and has a full description
  const showFullDescription = isSelected && isCardHovered && card.fullDescription;

  return (
    <div
      className={cn(
        "expertise-card cursor-pointer bg-card h-full w-full rounded-sm overflow-hidden relative group",
        "transition-all duration-500 ease-out shadow-lg", // Base shadow
        isSelected
          ? 'shadow-primary/40 scale-100 ring-2 ring-primary/50 ring-offset-2 ring-offset-background' // Enhanced shadow for selected
          : 'hover:shadow-xl hover:scale-[1.02] shadow-slate-300/40 dark:shadow-black/20 hover:shadow-slate-400/50 dark:hover:shadow-black/30' // Hover shadow for non-selected
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-pressed={isSelected}
      aria-label={`View details for ${card.title}`}
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        data-ai-hint={card.imageHint || card.category.toLowerCase()}
        loading={isSelected ? "eager" : "lazy"}
      />
      <div
        className={cn(
          "absolute inset-0 transition-all duration-300 ease-in-out",
          isSelected
            ? "bg-gradient-to-t from-black via-black/70 to-black/30"
            : "bg-gradient-to-t from-black via-black/70 to-black/30 group-hover:via-black/50"
        )}
      ></div>


      <div className={cn(
          "relative z-10 flex flex-col h-full p-4 md:p-5 text-white justify-end",
          showFullDescription && isSelected ? "opacity-0 transition-opacity duration-300" : "opacity-100" 
        )}
      >
        <span className={cn(
          "text-xs font-semibold uppercase tracking-wider mb-1 md:mb-2 inline-block px-3 py-1 rounded-sm",
          isSelected ? "bg-primary text-primary-foreground" : "bg-black/50 text-gray-100 group-hover:bg-primary group-hover:text-primary-foreground"
        )}>
          {card.category}
        </span>
        <h3 className={cn(
          "font-bold mb-1.5 md:mb-2 leading-tight", 
          isSelected ? "text-xl md:text-2xl text-white" : "text-lg md:text-xl text-gray-50 group-hover:text-white"
        )}
        style={{ textShadow: '0 2px 5px rgba(0,0,0,0.8)' }} 
        >
          {card.title}
        </h3>
       
        <Separator className={cn(
             "my-2 md:my-3 transition-colors duration-300",
             isSelected ? "bg-primary/70 w-1/2" : "bg-gray-500/30 group-hover:bg-primary/50 w-1/3"
           )} />

        <p className={cn(
          "text-xs md:text-sm line-clamp-3",
          isSelected ? "text-gray-200" : "text-gray-300 group-hover:text-gray-200"
        )}
        style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }} 
        >
          {card.description}
        </p>
      </div>

      {showFullDescription && isSelected && card.fullDescription && (
      <div className="absolute inset-0 z-20 overflow-y-auto backdrop-blur-md bg-black/60 text-white px-4 py-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-white mb-3 inline-block px-3 py-1 bg-advizo-green/80 rounded-sm">
          {card.category}
        </span>

        <h3 className="text-2xl font-bold mb-3" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}>
          {card.title}
        </h3>

        <Separator className="my-3 bg-primary/60 w-1/4" />

        <p className="text-sm font-bold text-gray-200 leading-relaxed tracking-normal" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
          {card.fullDescription}
        </p>

        {card.link && card.link !== '#' && (
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center text-xs font-medium text-accent-foreground bg-accent hover:bg-accent/90 px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            View Source <ExternalLink size={14} className="ml-2" />
          </a>
        )}
  </div>
)}

    </div>
  );
};

export default ExpertiseCard;
