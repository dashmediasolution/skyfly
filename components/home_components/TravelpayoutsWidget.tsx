"use client";

import { useEffect } from "react";

export function TravelpayoutsWidget() {
  useEffect(() => {
    // 1. Check if the script is already loaded to prevent duplicates
    if (document.getElementById("tpwl-main-script")) return;

    // 2. Create the script element exactly as Travelpayouts requested
    const script = document.createElement("script");
    script.id = "tpwl-main-script";
    script.async = true;
    script.type = "module"; // Crucial for this specific widget
    script.src = "https://tpwdg.com/wl_web/main.js?wl_id=15411";
    
    // 3. Inject it into the page
    document.body.appendChild(script);

    // Optional Cleanup: Remove script if the component unmounts
    return () => {
      const existingScript = document.getElementById("tpwl-main-script");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-12">
      
      {/* 1. The Search Form Container */}
      <div 
        id="tpwl-search" 
        className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[150px] relative z-20 overflow-hidden"
      >
        {/* The beautiful orange search form will inject right here */}
      </div>

      {/* 2. The Search Results Container */}
      <div 
        id="tpwl-tickets" 
        className="w-full min-h-[400px]"
      >
        {/* The flight cards will appear here after clicking search */}
      </div>

    </div>
  );
}