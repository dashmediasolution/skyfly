"use client";
import { useEffect, useRef, useState } from "react";

export function TravelpayoutsWidget() {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!formContainerRef.current || formContainerRef.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://tpwdg.com/content?currency=inr&trs=511033&shmarker=713077&locale=en_us&searchUrl=flights.skyflywithus.com%2Fflights&primary_override=%23FF8C00&color_button=%23FF8C00&color_icons=%23FF8C00&dark=%23FFFFFf&light=%23FFE2C5ff&secondary=%23FFFFFF&special=%23FFFFFf&color_focused=%23E5E7EB&border_radius=7&no_labels=&plain=true&promo_id=7879&campaign_id=100";
    script.async = true;
    script.onload = () => setLoading(false); // Hide skeleton when loaded
    formContainerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto relative z-20 pb-32">
      <div className="relative w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] min-h-[120px] overflow-hidden">
        
        {/* --- SKELETON UI --- */}
        {loading && (
          <div className="absolute inset-0 p-6 flex flex-wrap gap-4 animate-pulse bg-white z-10">
            <div className="h-12 bg-gray-200 rounded-lg flex-1 min-w-[200px]"></div>
            <div className="h-12 bg-gray-200 rounded-lg flex-1 min-w-[200px]"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-32"></div>
            <div className="h-12 bg-[#FF8C00]/20 rounded-lg w-40"></div>
          </div>
        )}

        <div ref={formContainerRef} className="p-2 md:p-6" />
      </div>
    </div>
  );
}