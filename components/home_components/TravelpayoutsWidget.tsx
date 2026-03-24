"use client";

import { useEffect, useRef } from "react";

export function TravelpayoutsWidget() {
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Prevent duplicate loading in Next.js Strict Mode
    if (!formContainerRef.current || formContainerRef.current.hasChildNodes()) return;

    // 2. Inject your perfectly branded Aviasales form
    const script = document.createElement("script");
    
    // Your exact script URL with your colors, ID, and White Label routing
    script.src = "https://tpwdg.com/content?currency=inr&trs=511033&shmarker=713077&show_hotels=true&powered_by=true&locale=en_us&searchUrl=flights.skyflywithus.com%2Fflights&primary_override=%23FF8C00&color_button=%23FF8C00&color_icons=%23FF8C00&dark=%23FFFFFf&light=%23FFE2C5ff&secondary=%23FFFFFF&special=%23FFFFFf&color_focused=%23E5E7EB&border_radius=7&no_labels=&plain=true&promo_id=7879&campaign_id=100"; 
    
    script.async = true;
    script.charset = "utf-8";

    formContainerRef.current.appendChild(script);
  }, []);

  return (
    // pb-32 gives the calendar room to drop down cleanly over your homepage
    <div className="w-full max-w-6xl mx-auto relative z-20">
      <div 
        ref={formContainerRef} 
        className="w-full p-2 md:p-6 overflow-visible min-h-[120px]"
      ></div>
    </div>
  );
}