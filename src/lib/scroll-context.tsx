import { createContext, useContext, type ReactNode, type RefObject } from 'react';

type ScrollContextValue = {
  scrollRef: RefObject<HTMLDivElement | null> | null;
};

const ScrollContext = createContext<ScrollContextValue>({ scrollRef: null });

export function ScrollProvider({
  scrollRef,
  children,
}: {
  scrollRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  return <ScrollContext.Provider value={{ scrollRef }}>{children}</ScrollContext.Provider>;
}

export function useScroller() {
  return useContext(ScrollContext).scrollRef;
}
