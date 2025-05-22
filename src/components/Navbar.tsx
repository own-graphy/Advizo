import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const mainNavLinks = [
  { name: 'Expertise', href: '#expertise' },
  { name: 'Services', href: '#offerings' }
];

const secondaryNavLinks = [
  { name: 'CaseStudies', href: '#casestudy' },
  { name: 'Careers', href: '#careers' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
];

const getOffsetTop = (el: HTMLElement | null) => {
  if (!el) return Number.MAX_SAFE_INTEGER;
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('home');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const allSections = [...mainNavLinks, ...secondaryNavLinks, { name: 'Home', href: '#home' }];
      let closestSection: string | null = null;
      let minDistance = window.innerHeight;

      allSections.forEach((link) => {
        const section = document.getElementById(link.href.replace("#", ""));
        if (section) {
          const distance = Math.abs(getOffsetTop(section) - window.scrollY - 100);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = link.href.replace("#", "");
          }
        }
      });

      setActiveSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 150);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const isActive = (href: string) => activeSection === href.replace('#', '');
  const showWhiteBg = scrolled || isHovered;

  const getLinkClass = (href: string) => {
    const base = `inline-flex items-center justify-center px-4 py-2 transition-colors`;
    const active = isActive(href)
      ? 'text-advizo-gold font-bold'
      : showWhiteBg
        ? 'text-advizo-darkgray hover:font-bold hover:text-advizo-darkgray'
        : 'text-white hover:font-bold hover:text-white/80';
    return `${base} ${active}`;
  };

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b`,
        showWhiteBg ? 'bg-white shadow-lg border-gray-200' : 'bg-transparent border-[#323333]'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between py-2 lg:py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#home" className="flex items-center">
            <img src="/Advizo-logo.svg" alt="Consult Advizo" className="h-10 w-auto object-contain" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1 ml-8">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList className="space-x-2">
              {[{ name: 'Home', href: '#home' }, ...mainNavLinks, ...secondaryNavLinks].map((link) => (
                <NavigationMenuItem key={link.name}>
                  <NavigationMenuLink
                    href={link.href}
                    className={getLinkClass(link.href)}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <Button
            className="bg-advizo-gold hover:bg-advizo-gold/80 text-advizo-darkgray rounded-md"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Free Consultation
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={showWhiteBg ? 'text-black hover:text-advizo-blue' : 'text-white hover:text-white/80'}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white text-black animate-fade-in border-t border-gray-200">
          <div className="flex flex-col space-y-2 py-6 px-4">
            {[{ name: 'Home', href: '#home' }, ...mainNavLinks, ...secondaryNavLinks].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "py-2 px-4 font-medium transition-colors",
                  isActive(link.href) ? "text-advizo-gold font-bold" : "hover:text-advizo-green"
                )}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <Button
              className="bg-advizo-gold hover:bg-advizo-gold/80 text-advizo-darkgray mt-2 rounded-none"
              onClick={() => {
                setIsOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Free Consultation
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
