'use client'

import './global.css'
import Script from 'next/script'

declare global {
  interface Window {
    amplitude: any
    sessionReplay: any
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.amplitude.com/script/1ddaaad51e2ff25a9d5d4366e64c735d.js"
          onReady={() => {
            window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }))
            window.amplitude.init('1ddaaad51e2ff25a9d5d4366e64c735d', {
              autocapture: { elementInteractions: true, pageViews: false },
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
