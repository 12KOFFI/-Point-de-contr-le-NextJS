"use client";

import { useEffect } from "react";
import Script from "next/script";
import { setupTawkApi, TAWK_SRC } from "@/lib/livechat";

/**
 * Loads Tawk.to once the page has finished loading and the browser is idle,
 * so the live chat never slows down the first paint.
 */
export default function LiveChat() {
  useEffect(() => {
    setupTawkApi();
  }, []);

  return <Script id="tawk-to" src={TAWK_SRC} strategy="lazyOnload" crossOrigin="anonymous" />;
}
