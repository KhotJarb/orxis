"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOUR_STEPS = [
  { target: '[data-tour-step="intent"]', title: 'Start here', description: 'Describe what you need your AI assistant for, or pick a category below to get started quickly.' },
  { target: '[data-tour-step="persona"]', title: 'Pick an expert', description: 'Choose your AI\'s expert role — or type a custom one in the text area.' },
  { target: '[data-tour-step="context"]', title: 'Add your context', description: 'Tell the AI about your channel, company, or project for a more tailored result.' },
  { target: '[data-tour-step="generate"]', title: 'Generate', description: 'When you\'re ready, hit Generate to build your AI assistant.' },
  { target: '[data-tour-step="tabs"]', title: 'Platform tabs', description: 'View your assistant formatted for Gemini Gems, ChatGPT GPTs, or Claude Projects.' },
  { target: '[data-tour-step="shortcuts"]', title: 'Shortcuts', description: 'Copy these reusable prompt templates — just fill in the variables each time.' },
];

export default function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const handleClose = useCallback(() => {
    localStorage.setItem('orxis_tour_completed', 'true');
    onClose();
  }, [onClose]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!isOpen) {
        setCurrentStepIndex(0);
        return;
    }

    const updateRect = () => {
      const currentStep = TOUR_STEPS[currentStepIndex];
      if (currentStep) {
        const element = document.querySelector(currentStep.target);
        if (element) {
            // Scroll element into view smoothly if not fully visible
            const rect = element.getBoundingClientRect();
            const isInViewport =
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth);

            if (!isInViewport) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Allow time for smooth scroll to finish, then update rect
            setTimeout(() => {
                const newRect = element.getBoundingClientRect();
                setTargetRect(newRect);
            }, 300);
            
            // Also set it immediately in case we didn't need to scroll much
            setTargetRect(rect);
        } else {
          setTargetRect(null);
          
          // Auto skip to next visible step if current target isn't found
          // (but don't loop endlessly if none are found)
          if (currentStepIndex < TOUR_STEPS.length - 1) {
             // setTimeout(() => setCurrentStepIndex(prev => prev + 1), 100);
          }
        }
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [isOpen, currentStepIndex]);

  if (!isMounted) return null;

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      handleClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
          handleClose();
      }
  };

  const currentStep = TOUR_STEPS[currentStepIndex];
  
  // Calculate tooltip position
  let tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10000,
  };

  if (targetRect) {
      const spaceBelow = window.innerHeight - targetRect.bottom;
      const spaceAbove = targetRect.top;
      
      const tooltipHeight = 200; // approximate height for positioning logic
      
      if (spaceBelow > tooltipHeight + 20) {
          // Place below the target
          tooltipStyle = {
              position: 'absolute',
              top: targetRect.bottom + 16,
              left: Math.max(16, Math.min(targetRect.left + (targetRect.width / 2) - 160, window.innerWidth - 336)),
              zIndex: 10000,
          };
      } else if (spaceAbove > tooltipHeight + 20) {
          // Place above the target
          tooltipStyle = {
              position: 'absolute',
              top: targetRect.top - tooltipHeight - 16,
              left: Math.max(16, Math.min(targetRect.left + (targetRect.width / 2) - 160, window.innerWidth - 336)),
              zIndex: 10000,
          };
      } else {
          // Center on screen if no space
          tooltipStyle = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
          };
      }
  }

  const overlayContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999]"
          onClick={handleBackdropClick}
        >
          {/* Spotlight Effect or full overlay */}
          {targetRect ? (
              <motion.div
                layout
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute rounded-xl border-2 border-neon-cyan/50 pointer-events-none"
                style={{
                  top: targetRect.top - 8,
                  left: targetRect.left - 8,
                  width: targetRect.width + 16,
                  height: targetRect.height + 16,
                  boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)',
                }}
              />
          ) : (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none" />
          )}

          {/* Tooltip Card */}
          <motion.div
            layoutId="tour-tooltip"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={tooltipStyle}
            className="w-full max-w-[320px] p-6 rounded-2xl glass-bg glass-border shadow-2xl backdrop-blur-xl flex flex-col gap-4 mx-4 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
                <h3 className="text-lg font-bold text-white mb-2">{currentStep?.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{currentStep?.description}</p>
            </div>

            <div className="flex items-center justify-between mt-2">
                <button
                    onClick={handleClose}
                    className="text-sm text-slate-400 hover:text-white transition-colors focus:outline-none"
                >
                    Skip tour
                </button>
                
                <div className="flex items-center gap-1.5">
                    {TOUR_STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === currentStepIndex ? 'bg-neon-cyan' : 'bg-slate-700/50'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="glow-btn px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-cyan/50"
                >
                    {currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(overlayContent, document.body);
}
