import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    /**
     * Determines the maximum width of the container.
     * 'default' maps to the edge-to-edge layout used on the homepage/navbar.
     * 'narrow' is for tightly focused reading content (e.g., blog posts).
     */
    size?: 'default' | 'narrow';
    /**
     * Optional ID for the section.
     */
    id?: string;
}

export default function Container({
    children,
    className = "",
    size = 'default',
    id
}: ContainerProps) {
    const defaultPadding = "w-full px-4 sm:px-6 lg:px-8 xl:px-12 mx-auto";
    const narrowPadding = "w-full px-4 sm:px-6 md:max-w-4xl mx-auto";

    const baseClasses = size === 'narrow' ? narrowPadding : defaultPadding;

    return (
        <div id={id} className={`${baseClasses} ${className}`}>
            {children}
        </div>
    );
}
