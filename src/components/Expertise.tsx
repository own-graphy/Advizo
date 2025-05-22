// src/components/expertise-carousel.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExpertiseCard from './ExpertiseCard';
import type { ExpertiseCardProps } from './ExpertiseCard';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator'; // Imported Separator

const EXPERTISE_CARDS_DATA: ExpertiseCardProps[] = [
  {
    id: '1',
    category: 'Healthcare & Life Sciences',
    type: 'Insight Report', // Retained for potential future use or data consistency
    date: 'June 10, 2024', // Retained for potential future use or data consistency
    title: "Transforming Patient Outcomes",
    description: "Innovations in healthcare delivery, digital health, and life science research driving better patient care.",
    fullDescription: "Our experts help healthcare organizations and life science companies navigate complex challenges, from drug discovery and development to patient care optimization and regulatory compliance. We leverage cutting-edge analytics and digital solutions to improve outcomes and foster innovation in this critical sector.",
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1200&q=80',
    imageHint: 'medical research',
    link: '#'
  },
  {
    id: '2',
    category: 'Infrastructure, Construction & Building Products',
    type: 'Case Study',
    date: 'June 12, 2024',
    title: 'Building a Sustainable Future',
    description: "Strategies for modern infrastructure development and sustainable construction practices shaping our world.",
    fullDescription: "We advise on major infrastructure projects, from transportation networks to smart cities. Our focus includes sustainable building materials, efficient construction processes, and optimizing the supply chain for building products to create resilient and environmentally conscious infrastructure for generations to come.",
    image: 'https://cdn.pixabay.com/photo/2024/06/15/20/46/ai-generated-8832217_1280.jpg',
    imageHint: 'modern cityscape',
    link: '#'
  },
  {
    id: '3',
    category: 'Technology',
    type: 'White Paper',
    date: 'June 15, 2024',
    title: 'The Future of AI in Business',
    description: "Leveraging AI, cloud, and cybersecurity for comprehensive digital transformation and competitive advantage.",
    fullDescription: "Our technology consulting services help businesses harness the power of AI, cloud computing, and robust cybersecurity measures. We guide clients through digital transformation journeys, ensuring they stay ahead in a rapidly evolving technological landscape by adopting innovative and secure solutions.",
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1200&q=80',
    imageHint: 'abstract technology',
    link: '#'
  },
  {
    id: '4',
    category: 'Consumer Products & Retail',
    type: 'Market Analysis',
    date: 'June 18, 2024',
    title: 'Evolving Consumer Behaviors',
    description: "Insights into retail trends, e-commerce strategies, and enhancing overall customer experience.",
    fullDescription: "We provide strategic insights for consumer product companies and retailers to adapt to changing market dynamics. Our expertise covers e-commerce optimization, supply chain resilience, brand strategy, and creating personalized customer experiences that foster loyalty and growth.",
    image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1200&q=80',
    imageHint: 'shopping retail',
    link: '#'
  },
  {
    id: '5',
    category: 'Education',
    type: 'Industry Brief',
    date: 'June 20, 2024',
    title: 'Innovations in Learning',
    description: "Transforming education through cutting-edge digital learning platforms and edtech solutions.",
    fullDescription: "We support educational institutions and edtech companies in developing innovative learning solutions. Our services include curriculum design, digital platform integration, and strategies to enhance student engagement and outcomes in the modern educational environment.",
    image: 'https://cdn.pixabay.com/photo/2024/02/09/11/50/ai-generated-8562941_1280.jpg',
    imageHint: 'students learning',
    link: '#'
  },
  {
    id: '6',
    category: 'Financial Services',
    type: 'Expert View',
    date: 'June 22, 2024',
    title: 'Navigating Fintech Disruption',
    description: "Strategies for banking, investment management, and navigating the dynamic fintech landscape.",
    fullDescription: "Our financial services consulting helps institutions adapt to fintech innovations, regulatory changes, and evolving customer expectations. We offer expertise in risk management, digital banking solutions, and investment strategies for a dynamic and competitive financial world.",
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1200&q=80',
    imageHint: 'financial charts',
    link: '#'
  }
];


const getScaleForRelativeDistance = (dist: number): number => {
  const absDist = Math.abs(dist);
  switch (absDist) {
    case 0: return 1.0;  // Large (Center)
    case 1: return 0.8;  // Small (Adjacent to Center)
    case 2: return 0.9;  // Medium (Next to Small)
    default: return 0.7; // Hidden or distant, scaled down further
  }
};

const ExpertiseCarousel: React.FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>(EXPERTISE_CARDS_DATA[Math.floor(EXPERTISE_CARDS_DATA.length / 2)].id);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragDistance, setDragDistance] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const totalCards = EXPERTISE_CARDS_DATA.length;

  const cardBaseWidth = 280;
  const cardAspectRatio = 280 / 420;
  const cardBaseHeight = cardBaseWidth / cardAspectRatio; // This will be 420

  const carouselWrapperHeight = cardBaseHeight * 1.15; // e.g., 420 * 1.15 = 483
  const gapPercentage = 0.05; // Define gapPercentage


  useEffect(() => {
    if (carouselRef.current) {
      setContainerWidth(carouselRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleNextClick = useCallback(() => {
    const currentIndex = EXPERTISE_CARDS_DATA.findIndex(card => card.id === selectedCardId);
    const nextIndex = (currentIndex + 1) % totalCards;
    setSelectedCardId(EXPERTISE_CARDS_DATA[nextIndex].id);
  }, [selectedCardId, totalCards]);

  const handlePrevClick = useCallback(() => {
    const currentIndex = EXPERTISE_CARDS_DATA.findIndex(card => card.id === selectedCardId);
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    setSelectedCardId(EXPERTISE_CARDS_DATA[prevIndex].id);
  }, [selectedCardId, totalCards]);

  const handleDragStart = (clientX: number) => {
    setAutoPlay(false);
    setIsDragging(true);
    setDragStartX(clientX);
    setDragDistance(0);
    if (carouselRef.current) {
        carouselRef.current.style.cursor = 'grabbing';
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const distance = clientX - dragStartX;
    setDragDistance(distance);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
     if (carouselRef.current) {
        carouselRef.current.style.cursor = 'grab';
    }

    const swipeThreshold = containerWidth * 0.1;
    if (Math.abs(dragDistance) > swipeThreshold) {
        if (dragDistance < 0) {
            handleNextClick();
        } else {
            handlePrevClick();
        }
    }
    setDragDistance(0);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, handleNextClick]);

  const getCardStyles = useCallback((index: number) => {
    const currentIndex = EXPERTISE_CARDS_DATA.findIndex(card => card.id === selectedCardId);
    let relativePos = (index - currentIndex + totalCards) % totalCards;

    if (relativePos > totalCards / 2) {
      relativePos -= totalCards;
    }

    const distance = Math.abs(relativePos);
    const baseZIndex = 10;

    const scale = getScaleForRelativeDistance(relativePos);
    const scaledCardWidth = cardBaseWidth * scale; // Used for horizontal calculation
    const scaledCardHeight = cardBaseHeight * scale; // Used for vertical calculation
    const gapWidth = cardBaseWidth * gapPercentage * (scale === 1 ? 1.2 : (scale === 0.9 ? 1.1 : 1));


    let opacity: number;
    if (distance <= 2) {
        switch (distance) {
            case 0: opacity = 1.0; break;
            case 1: opacity = 0.7; break;
            case 2: opacity = 0.85; break;
            default: opacity = 0; break;
        }
    } else {
        opacity = 0;
    }

    const displayValue = opacity === 0 ? 'none' : 'block';
    const zIndex = baseZIndex - distance;

    let calculatedTranslateX = 0;

    if (relativePos !== 0) {
      for (let i = 1; i <= Math.abs(relativePos); i++) {
        const stepDirection = relativePos > 0 ? 1 : -1;
        const prevCardIterScale = getScaleForRelativeDistance(stepDirection * (i - 1));
        const currentCardIterScale = getScaleForRelativeDistance(stepDirection * i);

        const spacing = (cardBaseWidth * prevCardIterScale / 2) + (cardBaseWidth * currentCardIterScale / 2) + (gapWidth * 0.75);
        calculatedTranslateX += stepDirection * spacing;
      }
    }

    if (isDragging) {
      calculatedTranslateX += dragDistance;
    }

    // Align cards by their horizontal center line
    const topPosition = (carouselWrapperHeight / 2) - (scaledCardHeight / 2);


    return {
      transform: `translateX(${calculatedTranslateX}px) scale(${scale})`,
      width: `${cardBaseWidth}px`,
      height: `${cardBaseHeight}px`,
      zIndex: zIndex,
      opacity: opacity,
      display: displayValue,
      center: `${topPosition}px`,
      position: 'absolute' as React.CSSProperties['position'],
      transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  }, [selectedCardId, totalCards, isDragging, dragDistance, cardBaseWidth, cardBaseHeight, carouselWrapperHeight, gapPercentage]);


  useEffect(() => {
    if (carouselRef.current) {
        carouselRef.current.style.cursor = 'grab';
    }
  }, []);

  return (
    <section id='expertise' className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center text-advizo-green">Our Expertise</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          We provide specialized consulting services across diverse industries
        </p>

        <div
          className="relative w-full mx-auto select-none"
          style={{ height: `${carouselWrapperHeight}px` }}
          ref={carouselRef}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          role="region"
          aria-roledescription="carousel"
        >
          <div
            className="absolute top-0 left-1/2 flex items-center justify-center w-full h-full"
            style={{ transform: 'translateX(-50%)' }}
            aria-live="polite"
          >
            {EXPERTISE_CARDS_DATA.map((card, idx) => {
              const styles = getCardStyles(idx);
              return (
                <div
                  key={card.id}
                  style={{
                    top: styles.top,
                    transform: styles.transform,
                    width: styles.width,
                    height: styles.height,
                    zIndex: styles.zIndex,
                    opacity: styles.opacity,
                    display: styles.display as React.CSSProperties['display'],
                    position: styles.position,
                    transition: styles.transition,
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${totalCards}`}
                  className={cn(
                    "transform-gpu", 
                  )}
                >
                  <ExpertiseCard
                    card={card}
                    isSelected={selectedCardId === card.id}
                    onClick={() => setSelectedCardId(card.id)}
                  />
                </div>
                
              );
              
            })}
          </div>
          <div className="mt-12 flex items-center justify-center md:justify-start md:absolute md:bottom-0 md:left-8 z-20">
            <Button
              onClick={() => setAutoPlay(!autoPlay)}
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-card shadow-md hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2"
              aria-label={autoPlay ? "Pause autoplay" : "Play autoplay"}
            >
              {autoPlay ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button
              onClick={handlePrevClick}
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-card shadow-md hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 ml-2"
              aria-label="Previous card"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <Button
              onClick={handleNextClick}
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 bg-card shadow-md hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-accent focus:ring-offset-2 ml-2"
              aria-label="Next card"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExpertiseCarousel;
