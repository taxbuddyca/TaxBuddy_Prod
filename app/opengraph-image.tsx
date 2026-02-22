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
                    {/* Shield Logo */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        width="200"
                        height="200"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(37, 99, 235, 0.1)" stroke="none" />
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2563EB" strokeWidth="2" fill="none" />
                        <path d="M8 13v4" stroke="#2563EB" strokeWidth="2" />
                        <path d="M12 10v7" stroke="#2563EB" strokeWidth="2" />
                        <path d="M16 7v10" stroke="#2563EB" strokeWidth="2" />
                    </svg>
                </div>
                <div style={{ fontSize: 100, fontWeight: 900, color: '#0A192F', display: 'flex', alignItems: 'center', letterSpacing: '-0.05em' }}>
                    Tax<span style={{ color: '#2563EB' }}>Buddy</span>
                </div>
                <div style={{ fontSize: 40, marginTop: 20, color: '#64748B', fontWeight: 600 }}>
                    Modern Accounting for Startups
                </div>
                <div style={{
                    position: 'absolute',
                    bottom: 40,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    opacity: 0.6
                }}>
                    <div style={{ fontSize: 24, color: '#0A192F', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
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
