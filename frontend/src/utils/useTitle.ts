// frontend/src/utils/useTitle.ts

import { useEffect } from "react";

/**
 * Sets the document title on initial render.
 * Use in conjunction with <Helmet> for best reliability.
 */
export function useTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
