"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface PlatformGuideProps {
  platform: 'gems' | 'gpts' | 'projects';
}

const guides = {
  gems: {
    title: 'Google Gemini Gems',
    link: 'https://gemini.google.com',
    steps: [
      'Go to gemini.google.com → click the jewel icon → Explore Gems',
      'Click + New Gem',
      'Paste the Name and Description into their fields',
      'Paste the Instructions into the Instructions field',
      'Optionally upload the suggested Knowledge files',
      'Click Save — your Gem is ready to use'
    ]
  },
  gpts: {
    title: 'ChatGPT GPTs',
    link: 'https://chatgpt.com',
    steps: [
      'Go to chatgpt.com → Explore GPTs → Create',
      'Switch to the Configure tab',
      'Paste the Name, Description, and Instructions into their fields',
      'Add the Conversation Starters to the starter prompts',
      'Toggle recommended Capabilities (Web Search, Code Interpreter)',
      'Click Save and set visibility'
    ]
  },
  projects: {
    title: 'Claude Projects',
    link: 'https://claude.ai',
    steps: [
      'Go to claude.ai → Projects → + New Project',
      'Enter the Name and Description',
      'Click Set project instructions → paste the Instructions',
      'Upload any relevant Knowledge files',
      'Start a new conversation inside the project'
    ]
  }
};

export default function PlatformGuide({ platform }: PlatformGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const guide = guides[platform];

  return (
    <div className="rounded-xl glass-bg glass-border overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-200">How to set this up</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="p-4 pt-0 border-t border-white/5">
              <div className="mb-4 mt-2">
                <a
                  href={guide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-cyan-400 neon-cyan hover:text-cyan-300 transition-colors"
                >
                  Open {guide.title}
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </div>
              <ol className="space-y-3">
                {guide.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium border border-purple-500/30 neon-purple mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-300 leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
