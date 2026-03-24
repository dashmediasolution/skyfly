"use client";

export function TravelpayoutsWidget() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-12">
      
      {/* 1. The Search Form Container (Block 2) */}
      <div 
        id="tpwl-search" 
        className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[150px] relative z-20"
      >
        {/* Travelpayouts will automatically inject the Search Form here */}
      </div>

      {/* 2. The Search Results Container (Block 3) */}
      <div 
        id="tpwl-tickets" 
        className="w-full min-h-[400px]"
      >
        {/* Travelpayouts will automatically inject the Flight Tickets here after a user searches */}
      </div>

    </div>
  );
}