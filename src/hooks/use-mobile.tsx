
import * as React from "react"

export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Hook to check if the viewport width is below a specific breakpoint
 * @param breakpoint The breakpoint to check against
 * @returns Boolean indicating if the viewport is smaller than the breakpoint
 */
export function useIsBelow(breakpoint: BreakpointKey = 'md') {
  const [isBelow, setIsBelow] = React.useState<boolean | undefined>(undefined);
  
  React.useEffect(() => {
    const breakpointValue = BREAKPOINTS[breakpoint];
    const mql = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`);
    
    const onChange = () => {
      setIsBelow(window.innerWidth < breakpointValue);
    };
    
    mql.addEventListener("change", onChange);
    setIsBelow(window.innerWidth < breakpointValue);
    
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isBelow;
}

/**
 * Hook to check if the viewport matches a specific breakpoint range
 * @param min Minimum breakpoint (inclusive)
 * @param max Maximum breakpoint (exclusive)
 * @returns Boolean indicating if viewport is within the range
 */
export function useBreakpointRange(min: BreakpointKey, max: BreakpointKey) {
  const [isInRange, setIsInRange] = React.useState<boolean | undefined>(undefined);
  
  React.useEffect(() => {
    const minValue = BREAKPOINTS[min];
    const maxValue = BREAKPOINTS[max];
    
    const checkRange = () => {
      const width = window.innerWidth;
      setIsInRange(width >= minValue && width < maxValue);
    };
    
    window.addEventListener("resize", checkRange);
    checkRange();
    
    return () => window.removeEventListener("resize", checkRange);
  }, [min, max]);

  return !!isInRange;
}

/**
 * Hook to check if viewport is below the md breakpoint (768px)
 * @returns Boolean indicating if the viewport is in mobile range
 */
export function useIsMobile() {
  return useIsBelow('md');
}

/**
 * Hook to get the current breakpoint based on window width
 * @returns The current breakpoint key
 */
export function useCurrentBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<BreakpointKey | null>(null);
  
  React.useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < BREAKPOINTS.xs) return setBreakpoint('xs');
      if (width < BREAKPOINTS.sm) return setBreakpoint('sm');
      if (width < BREAKPOINTS.md) return setBreakpoint('md');
      if (width < BREAKPOINTS.lg) return setBreakpoint('lg');
      if (width < BREAKPOINTS.xl) return setBreakpoint('xl');
      return setBreakpoint('2xl');
    };
    
    window.addEventListener("resize", checkBreakpoint);
    checkBreakpoint();
    
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return breakpoint;
}

/**
 * Hook to detect touch-enabled devices
 * @returns Boolean indicating if the device supports touch
 */
export function useTouchDevice() {
  const [isTouch, setIsTouch] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouch();
    window.addEventListener('touchstart', checkTouch, {once: true});
    
    return () => window.removeEventListener('touchstart', checkTouch);
  }, []);

  return isTouch;
}
