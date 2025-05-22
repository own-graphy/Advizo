import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CaseStudyContentProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: any | null;
}

const CaseStudyContentModal: React.FC<CaseStudyContentProps> = ({ isOpen, onClose, caseStudy }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !caseStudy) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-3 py-8 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-background rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden border border-border w-[95%] h-[85%] max-w-[1200px] max-h-[90vh]"
      >
        {/* Image Section with blurred background */}
        <div className="md:w-2/5 relative flex-shrink-0 flex items-center justify-center h-56 md:h-auto p-4 overflow-hidden">
          {/* Blurred background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${caseStudy.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(20px)',
              opacity: 0.8,
              zIndex: 0,
            }}
          />
          {/* Main image */}
          <img
            src={caseStudy.imageUrl}
            alt={caseStudy.title}
            className="relative z-10 object-contain max-h-full max-w-full rounded-lg shadow"
            data-ai-hint={caseStudy.imageHint}
          />
        </div>

        {/* Content Section */}
        <div
          ref={contentRef}
          className="relative flex-1 flex flex-col justify-start px-6 py-7 md:p-8 overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:bg-accent transition rounded-full p-2"
            aria-label="Close"
            type="button"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-gray  text-2xl font-bold mb-2">{caseStudy.title}</h2>
          <div className="flex items-center mb-6">
            <span className="text-sm text-muted-foreground">{caseStudy.category}</span>
          </div>
          
          <div className="space-y-6">
            {/* Summary */}
            <div>
              <h3 className="text-lg font-medium mb-2">Summary</h3>
              <p className="text-muted-foreground">{caseStudy.summary}</p>
            </div>
            
            {/* Background if available */}
            {caseStudy.background && (
              <div>
                <h3 className="text-lg font-medium mb-2">Background</h3>
                <p className="text-muted-foreground">{caseStudy.background}</p>
              </div>
            )}
            
            {/* Problem Statement if available */}
            {caseStudy.problemStatement && (
              <div>
                <h3 className="text-lg font-medium mb-2">Problem Statement</h3>
                <p className="text-muted-foreground">{caseStudy.problemStatement}</p>
              </div>
            )}
            
            {/* Challenge if available */}
            {caseStudy.challenge && (
              <div>
                <h3 className="text-lg font-medium mb-2">Challenge</h3>
                <p className="text-muted-foreground">{caseStudy.challenge}</p>
              </div>
            )}
            
            {/* Business Strategy if available - highlighted */}
            {caseStudy.businessStrategy && (
              <div className="p-4 border rounded-lg bg-primary/5 border-primary/20">
                <h3 className="text-lg font-medium mb-2 text-primary">Business Strategy</h3>
                <p className="text-muted-foreground">{caseStudy.businessStrategy}</p>
              </div>
            )}
            
            {/* Solution if available */}
            {caseStudy.solution && (
              <div>
                <h3 className="text-lg font-medium mb-2">Solution</h3>
                <p className="text-muted-foreground whitespace-pre-line">{caseStudy.solution}</p>
              </div>
            )}
            
            {/* Actions Taken if available */}
            {caseStudy.actionsTaken && (
              <div>
                <h3 className="text-lg font-medium mb-2">{caseStudy.actionsTaken.title || "Actions Taken"}</h3>
                {caseStudy.actionsTaken.introduction && (
                  <p className="text-muted-foreground mb-4">{caseStudy.actionsTaken.introduction}</p>
                )}
                <div className="space-y-4">
                  {caseStudy.actionsTaken.points.map((point: any, index: number) => (
                    <div key={index} className="ml-4">
                      {typeof point === 'string' ? (
                        <p className="text-muted-foreground">{point}</p>
                      ) : (
                        <div>
                          {point.heading && <h4 className="font-medium mb-1">{point.heading}</h4>}
                          <p className="text-muted-foreground">{point.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Results if available */}
            {caseStudy.results && (
              <div>
                <h3 className="text-lg font-medium mb-2">Results</h3>
                <p className="text-muted-foreground whitespace-pre-line">{caseStudy.results}</p>
              </div>
            )}
            
            {/* Outcome if available */}
            {caseStudy.outcome && (
              <div>
                <h3 className="text-lg font-medium mb-2">Outcome</h3>
                <p className="text-muted-foreground">{caseStudy.outcome}</p>
              </div>
            )}
            
            {/* Conclusion if available */}
            {caseStudy.conclusion && (
              <div>
                <h3 className="text-lg font-medium mb-2">Conclusion</h3>
                <p className="text-muted-foreground whitespace-pre-line">{caseStudy.conclusion}</p>
              </div>
            )}
            
            {/* Key Takeaway if available - highlighted */}
            {caseStudy.keyTakeaway && (
              <div className="p-4 rounded-lg border border-white/20 bg-[#212337] backdrop-blur-md shadow-md">
              <h3 className="text-xl font-medium mb-2 text-advizo-gold tracking-wide">Key Takeaway</h3>
              <p className="text-gray-300 tracking-wide">{caseStudy.keyTakeaway}</p>
            </div>
            
            )}
            
            {/* Additional Sections if available */}
            {caseStudy.additionalSections && caseStudy.additionalSections.map((section: any, index: number) => (
              <div key={index}>
                <h3 className="text-lg font-medium mb-2">{section.heading}</h3>
                {Array.isArray(section.text) ? (
                  <div className="space-y-2">
                    {section.text.map((paragraph: string, pIndex: number) => (
                      <p key={pIndex} className="text-muted-foreground">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">{section.text}</p>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t flex justify-end">
            <Button onClick={onClose} variant="outline">Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyContentModal;
