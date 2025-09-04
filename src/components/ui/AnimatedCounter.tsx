"use client";

import {
  KeyframeOptions,
  animate,
  useInView,
  useIsomorphicLayoutEffect
} from "framer-motion";
import { useRef, useCallback, useState } from "react";

type AnimatedCounterProps = {
  from: number;
  to: number;
  animationOptions?: KeyframeOptions;
};

const AnimatedCounter = ({
  from,
  to,
  animationOptions
}: AnimatedCounterProps) => {
  const [displayValue, setDisplayValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const animationRef = useRef<any>(null);

  const updateValue = useCallback((value: number) => {
    const formattedValue = Number(value.toFixed(0));
    setDisplayValue(formattedValue);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!inView) return;

    // Cancel any existing animation
    if (animationRef.current) {
      try {
        animationRef.current.stop();
      } catch (error) {
        // Silently handle any stop errors
      }
    }

    // Set initial value
    setDisplayValue(from);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)")
      .matches;

    if (prefersReducedMotion) {
      setDisplayValue(to);
      return;
    }

    // Start animation
    try {
      animationRef.current = animate(from, to, {
        duration: 6,
        ease: "easeOut",
        ...animationOptions,
        onUpdate: updateValue
      });
    } catch (error) {
      // Fallback to final value if animation fails
      console.warn("Animation failed, showing final value:", error);
      setDisplayValue(to);
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        try {
          animationRef.current.stop();
        } catch (error) {
          // Silently handle cleanup errors
        }
        animationRef.current = null;
      }
    };
  }, [inView, from, to, animationOptions, updateValue]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
};

export default AnimatedCounter;
