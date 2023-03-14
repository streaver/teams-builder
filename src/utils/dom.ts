import { MouseEvent } from "react";

const isOrIsChildOf = (element: Element, selector: string) => {
  return element.matches(`${selector}, ${selector} *`);
};

export const isClickOutsideOf = (
  e: MouseEvent,
  selectors: string[]
): boolean => {
  if (!e.target) return false;

  return !selectors.some((selector) =>
    isOrIsChildOf(e.target as Element, selector)
  );
};
