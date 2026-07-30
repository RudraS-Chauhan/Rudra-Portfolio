import React from 'react';

interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
  href?: string;
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  className = '',
  href,
  label = 'Live Project',
}) => {
  const content = (
    <span className="relative z-10">{label}</span>
  );

  const baseClasses = `inline-flex items-center justify-center font-medium uppercase tracking-widest text-[#D7E2EA] border-2 border-[#D7E2EA] rounded-full transition-all duration-300 hover:bg-[#D7E2EA]/10 hover:scale-105 active:scale-95 cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};
