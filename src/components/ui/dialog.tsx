// src/components/ui/dialog.tsx
import React from 'react';
import { cn } from '../../utils/cn';

export interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dialog: React.FC<DialogProps> = ({ children, open, onOpenChange }) => {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export const DialogTrigger: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <div onClick={onClick}>{children}</div>
);

export const DialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("", className)}>{children}</div>
);

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col space-y-1.5 text-center sm:text-left">{children}</div>
);

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg font-semibold leading-none tracking-tight">{children}</h2>
);
