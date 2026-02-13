import React from 'react';

export const WaveDivider = ({ className }: { className?: string }) => (
    <div className={`w-full overflow-hidden leading-[0] transform rotate-180 ${className}`}>
        {/* SVG Path removed as per user request */}
    </div>
);

export const SlantDivider = ({ className }: { className?: string }) => (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
        <svg className="relative block w-[calc(100%+1.3px)] h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 120 1200 0z" className="fill-current"></path>
        </svg>
    </div>
);

export const WaveBottom = ({ className }: { className?: string }) => (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-1.42,1200,13.47V0Z" className="fill-current"></path>
        </svg>
    </div>
);
