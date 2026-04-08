import { useCallback, useEffect, useRef } from 'react'
import './InitialLoader.css'

const EXIT_MS = 1000

export function InitialLoader({ exiting, onExitComplete }) {
  const rootRef = useRef(null)
  const fallbackTimerRef = useRef(0)

  const finish = useCallback(() => {
    onExitComplete?.()
  }, [onExitComplete])

  useEffect(() => {
    if (!exiting) return

    const node = rootRef.current
    const onEnd = (e) => {
      if (e.target !== node) return
      if (e.animationName !== 'initial-loader-exit' && e.animationName !== 'initial-loader-exit-reduced') return
      finish()
    }

    node?.addEventListener('animationend', onEnd)
    fallbackTimerRef.current = window.setTimeout(finish, EXIT_MS + 200)

    return () => {
      node?.removeEventListener('animationend', onEnd)
      window.clearTimeout(fallbackTimerRef.current)
    }
  }, [exiting, finish])

  return (
    <div
      ref={rootRef}
      className={`initial-loader${exiting ? ' initial-loader--exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
    >
      <div className="initial-loader__inner">
        <span className="initial-loader__ring" aria-hidden />
        <span className="initial-loader__ring initial-loader__ring--2" aria-hidden />
        <div className="initial-loader__dots" aria-hidden>
          <span className="initial-loader__dot" />
          <span className="initial-loader__dot" />
          <span className="initial-loader__dot" />
        </div>
        <span className="initial-loader__wordmark">Serendib</span>
        <span className="visually-hidden">Loading</span>
      </div>
    </div>
  )
}
