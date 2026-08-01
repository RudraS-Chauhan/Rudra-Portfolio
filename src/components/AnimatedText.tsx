import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}
    </motion.span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  // Calculate total characters count for progress calculation
  const totalChars = text.length;
  let charIndexCounter = 0;

  return (
    <p
      ref={containerRef}
      className={`relative text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] select-none ${className}`}
    >
      {words.map((word, wordIndex) => {
        const chars = word.split('');
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
            {chars.map((char, charIndex) => {
              const start = charIndexCounter / totalChars;
              charIndexCounter += 1;
              const end = charIndexCounter / totalChars;

              return (
                <Char
                  key={charIndex}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {char}
                </Char>
              );
            })}
          </span>
        );
      })}
    </p>
  );
};
