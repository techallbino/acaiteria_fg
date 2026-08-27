'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export function LaunchSplash() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => {
      setLeaving(true)
    }, 1050)

    const removeTimer = window.setTimeout(() => {
      setVisible(false)
    }, 1450)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className={`fg-launch-splash ${leaving ? 'fg-launch-splash--leaving' : ''}`}
    >
      <div className="fg-launch-glow" />

      <div className="fg-launch-logo-wrap">
        <Image
          src="/images/logo.webp"
          alt=""
          width={220}
          height={220}
          priority
          className="fg-launch-logo"
        />
        <span className="fg-launch-shine" />
      </div>

      <p className="fg-launch-name">F&amp;G Açaí</p>
      <span className="fg-launch-subtitle">Açaiteria &amp; Cia</span>

      <style jsx global>{`
        .fg-launch-splash {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          min-height: 100dvh;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 43%, rgba(109, 38, 84, 0.5), transparent 36%),
            linear-gradient(145deg, #2d1027 0%, #190916 54%, #10070e 100%);
          opacity: 1;
          transition: opacity 380ms ease, visibility 380ms ease;
        }

        .fg-launch-splash--leaving {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .fg-launch-glow {
          position: absolute;
          width: 270px;
          height: 270px;
          border-radius: 999px;
          background: rgba(193, 139, 76, 0.13);
          filter: blur(38px);
          animation: fg-glow 1.2s ease-out both;
        }

        .fg-launch-logo-wrap {
          position: relative;
          width: min(48vw, 210px);
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 28px;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34);
          animation: fg-logo-in 720ms cubic-bezier(.2, .85, .3, 1.15) both;
        }

        .fg-launch-logo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fg-launch-shine {
          position: absolute;
          inset: -30%;
          transform: translateX(-135%) rotate(18deg);
          background: linear-gradient(90deg, transparent 42%, rgba(255, 235, 186, 0.32), transparent 58%);
          animation: fg-shine 900ms 280ms ease-out both;
        }

        .fg-launch-name {
          margin: 20px 0 0;
          color: #f2d6a2;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          animation: fg-text-in 500ms 330ms ease-out both;
        }

        .fg-launch-subtitle {
          margin-top: 3px;
          color: rgba(255, 255, 255, 0.67);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          animation: fg-text-in 500ms 430ms ease-out both;
        }

        @keyframes fg-logo-in {
          from { opacity: 0; transform: scale(.72) translateY(16px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes fg-shine {
          from { transform: translateX(-135%) rotate(18deg); }
          to { transform: translateX(135%) rotate(18deg); }
        }

        @keyframes fg-text-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fg-glow {
          from { opacity: 0; transform: scale(.55); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .fg-launch-splash,
          .fg-launch-glow,
          .fg-launch-logo-wrap,
          .fg-launch-shine,
          .fg-launch-name,
          .fg-launch-subtitle {
            animation: none !important;
            transition-duration: 1ms !important;
          }
        }
      `}</style>
    </div>
  )
}
