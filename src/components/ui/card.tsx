import React from 'react';

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
      <div className={`rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
      <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
      <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
        {children}
      </h3>
    );
  };
  
  export const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
      <div className={`p-6 pt-0 ${className}`}>
        {children}
      </div>
    );
  };