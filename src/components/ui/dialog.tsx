import React from 'react';
import { motion } from 'framer-motion';

export const Dialog = ({ children, open, onOpenChange }: { children: React.ReactNode; open: boolean; onOpenChange: (open: boolean) => void }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`relative w-full max-w-lg rounded-lg bg-gray-900 p-6 shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const DialogHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const DialogTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <h2 className={`text-lg font-semibold text-white ${className}`}>
      {children}
    </h2>
  );
};

export const DialogDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <p className={`text-sm text-gray-400 ${className}`}>
      {children}
    </p>
  );
};