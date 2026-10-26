"use client";

import { useEffect } from "react";

// Sections that lived at `/` before the studios page moved to `/studios`.
const STUDIOS_HASHES = ["#how", "#faq", "#request"];

/**
 * Sends old shared links like `/#request` to `/studios#request`. Hashes never
 * reach the server, so this can't be a next.config redirect.
 */
export function LegacyHashRedirect() {
  useEffect(() => {
    if (STUDIOS_HASHES.includes(window.location.hash)) {
      window.location.replace(`/studios${window.location.hash}`);
    }
  }, []);
  return null;
}
