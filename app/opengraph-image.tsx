import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'TaxBuddy Canada - Modern Accounting for Startups'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                    {/* Maple Leaf Logo + Calculator */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 400 430"
                        width="180"
                        height="180"
                    >
                        <g transform="translate(-20, 0)">
                            <polygon points="200,15 178,100 200,245" fill="#F45B45" />
                            <polygon points="178,100 132,68 152,148 200,245" fill="#ED4A3B" />
                            <polygon points="152,148 28,128 78,172 200,245" fill="#D9362E" />
                            <polygon points="78,172 12,205 78,242 200,245" fill="#C22424" />
                            <polygon points="78,242 62,282 140,265 200,245" fill="#A31A1F" />
                            <polygon points="140,265 184,278 200,245" fill="#801117" />

                            <polygon points="200,15 222,100 200,245" fill="#DA3831" />
                            <polygon points="222,100 268,68 248,148 200,245" fill="#C22424" />
                            <polygon points="248,148 372,128 322,172 200,245" fill="#A81A1A" />
                            <polygon points="322,172 388,205 322,242 200,245" fill="#8F1010" />
                            <polygon points="322,242 338,282 260,265 200,245" fill="#740808" />
                            <polygon points="260,265 216,278 200,245" fill="#560404" />
                            <rect x="184" y="270" width="32" height="10" fill="#52080D" />
                            <path d="M 193,278 Q 220,320 200,405" stroke="#3A0202" strokeWidth="14" strokeLinecap="round" fill="none" />
                        </g>

                        <g>
                            <rect x="150" y="135" width="100" height="135" rx="13" fill="#0F1C2E" stroke="#FFFFFF" strokeWidth="5" strokeLinejoin="round" />
                            <rect x="166" y="151" width="68" height="26" rx="4" fill="#FFFFFF" />

                            <rect x="166" y="192" width="16" height="15" rx="3" fill="#FFFFFF" />
                            <rect x="192" y="192" width="16" height="15" rx="3" fill="#FFFFFF" />
                            <rect x="218" y="192" width="16" height="15" rx="3" fill="#F45B45" />

                            <rect x="166" y="217" width="16" height="15" rx="3" fill="#FFFFFF" />
                            <rect x="192" y="217" width="16" height="15" rx="3" fill="#FFFFFF" />
                            <rect x="218" y="217" width="16" height="15" rx="3" fill="#F45B45" />

                            <rect x="166" y="242" width="16" height="15" rx="3" fill="#FFFFFF" />
                            <rect x="192" y="242" width="16" height="15" rx="3" fill="#FFFFFF" />
                            <rect x="218" y="242" width="16" height="15" rx="3" fill="#F45B45" />
                        </g>
                    </svg>
                </div>
                <div style={{ fontSize: 110, fontWeight: 900, color: '#0a0f29', display: 'flex', alignItems: 'center', letterSpacing: '-0.05em' }}>
                    Tax<span style={{ color: '#2563EB' }}>Buddy</span>
                </div>
                <div style={{ fontSize: 32, letterSpacing: '0.4em', marginTop: 10, color: '#9CA3AF', fontWeight: 800, textTransform: 'uppercase' }}>
                    Canada
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: 40,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    opacity: 0.8
                }}>
                    <div style={{ fontSize: 24, color: '#0a0f29', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                        taxbuddycanada.ca
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
