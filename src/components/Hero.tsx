import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

const heroContent = [
  {
    title: 'Operational Excellence',
    description:
      'We help MSMEs streamline processes, reduce waste, and boost efficiency for long-term growth and customer satisfaction.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1920&q=80',
    category: 'Operational Excellence',
  },
  {
    title: 'Revenue Growth',
    description:
      'We craft strategies using research, sales optimization, and marketing to drive consistent revenue and profit growth.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80',
    category: 'Revenue Growth',
  },
  {
    title: 'Market Expansion',
    description:
      'We support MSMEs in entering new markets and segments while managing regulatory and cultural complexities.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80',
    category: 'Market Expansion',
  },
  {
    title: 'Innovation & Technology',
    description:
      'We enable MSMEs to adopt digital innovations that enhance efficiency, customer experience, and competitiveness.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80',
    category: 'Innovation & Technology',
  },
  {
    title: 'Business Transformation',
    description:
      'We guide MSMEs in restructuring operations and adapting strategies to ensure sustainable success in changing markets.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80',
    category: 'Business Transformation',
  }
];

const SLIDE_DURATION = 5000;

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const startProgressAnimation = () => {
    startTimeRef.current = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setProgress(newProgress);
      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    startProgressAnimation();
    timerRef.current = setInterval(() => {
      const next = (activeIndex + 1) % heroContent.length;
      setActiveIndex(next);
      setProgress(0);
      startProgressAnimation();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [activeIndex]);

  const changeSlide = (index: number) => {
    if (index === activeIndex) return;

    if (timerRef.current) clearInterval(timerRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    setActiveIndex(index);
    setProgress(0);
    startProgressAnimation();

    timerRef.current = setInterval(() => {
      const next = (index + 1) % heroContent.length;
      setActiveIndex(next);
      setProgress(0);
      startProgressAnimation();
    }, SLIDE_DURATION);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black" id="home">
      {/* Image Backgrounds with Black Fade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={heroContent[activeIndex].image}
            alt=""
            className="w-full h-full object-cover"
            style={{ transform: `scale(${1 + progress * 0.001})`, transition: 'transform 100ms linear' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-black/90 via-black/60 to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/90 via-black/60 to-transparent z-[1]" />
      <div className="absolute top-0 bottom-0 left-0 w-[70%] bg-gradient-to-r from-black/90 via-black/60 to-transparent z-[1]" />

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 lg:px-8 min-h-screen flex flex-col justify-between pt-20">
        <div className="mt-24 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroContent[activeIndex].title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                {heroContent[activeIndex].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-2 max-w-lg">
                {heroContent[activeIndex].description}
              </p>

              {/* Learn More button */}
              <a
                href="#offerings"
                className="inline-flex items-center text-advizo-gold hover:text-advizo-gold/50 font-medium text-base mt-2"
              >
                Learn more <ArrowRight className="ml-1" size={16} />
              </a>

            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="z-30 relative mt-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-advizo-gold  hover:bg-advizo-gold/50 active:opacity-80 text-gray rounded-md px-8 py-6 text-lg font-semibold shadow-md transition-all duration-200 w-full sm:w-auto"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Free consultation
                <ArrowRight className="ml-2" size={18} />
              </Button>

              <Button
                variant="outline"
                className="border text-black hover:bg-white/50 active:bg-white/20 rounded-md px-8 py-6 text-lg font-semibold transition-all duration-200 w-full sm:w-auto"
                onClick={() =>
                  document.getElementById('casestudy')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                View our case studies
              </Button>
            </div>
          </div>
        </div>

        {/* Categories with Progress Bar */}
        <div className="relative bottom-0 left-0 right-0 pb-10 z-20 mt-auto">
          <div className="flex justify-center gap-14 flex-wrap">
            {heroContent.map((item, i) => (
              <div key={i} className="relative cursor-pointer" onClick={() => changeSlide(i)}>
                <p
                  className={clsx(
                    'text-lg font-bold transition-colors',
                    activeIndex === i ? 'text-white' : 'text-gray-400'
                  )}
                >
                  {item.category}
                </p>
                {activeIndex === i && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-40 h-[6px] bg-gray-700 overflow-hidden">
                    <div
                      className="h-full bg-advizo-gold transition-all ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
