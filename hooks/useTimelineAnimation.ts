import { useState, useEffect } from 'react'

export function useTimelineAnimation() {
  const [visibleItems, setVisibleItems] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const id = parseInt(target.dataset.id || '0')
            setVisibleItems(prev => new Set([...prev, id]))
          }
        })
      },
      { 
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    const elements = document.querySelectorAll('[data-timeline-item]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const isItemVisible = (id: string | number) => {
    return visibleItems.has(typeof id === 'string' ? parseInt(id) : id)
  }

  return { isItemVisible, visibleItems }
} 