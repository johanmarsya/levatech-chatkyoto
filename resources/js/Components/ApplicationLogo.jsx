import React from 'react';

export default function ApplicationLogo(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFC1CC', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#B2F3FF', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <g>
                <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2" fill="url(#gradient1)" />
                <rect x="30" y="40" width="40" height="10" rx="5" ry="5" fill="black" />
                <circle cx="40" cy="55" r="3" fill="black" />
                <circle cx="60" cy="55" r="3" fill="black" />
                <rect x="30" y="60" width="40" height="5" rx="2.5" ry="2.5" fill="black" />
            </g>
        </svg>
    );
}
