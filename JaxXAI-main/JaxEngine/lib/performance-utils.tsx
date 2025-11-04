import React from "react"
// Debounce function
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout | null = null

  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }) as T
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle = false

  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }) as T
}

// Batch API requests
export class RequestBatcher {
  private queue: Array<{
    url: string
    resolve: (data: any) => void
    reject: (error: any) => void
  }> = []
  private timeout: NodeJS.Timeout | null = null
  private batchDelay = 50 // ms

  add(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queue.push({ url, resolve, reject })

      if (this.timeout) clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.flush()
      }, this.batchDelay)
    })
  }

  private async flush() {
    if (this.queue.length === 0) return

    const batch = [...this.queue]
    this.queue = []

    try {
      // Group by base URL
      const grouped = new Map<string, typeof batch>()

      for (const item of batch) {
        const baseUrl = new URL(item.url).origin + new URL(item.url).pathname
        if (!grouped.has(baseUrl)) {
          grouped.set(baseUrl, [])
        }
        grouped.get(baseUrl)!.push(item)
      }

      // Execute batched requests
      for (const [baseUrl, items] of grouped) {
        try {
          const responses = await Promise.all(items.map((item) => fetch(item.url)))

          for (let i = 0; i < items.length; i++) {
            const response = responses[i]
            if (response.ok) {
              const data = await response.json()
              items[i].resolve(data)
            } else {
              items[i].reject(new Error(`HTTP ${response.status}`))
            }
          }
        } catch (error) {
          items.forEach((item) => item.reject(error))
        }
      }
    } catch (error) {
      batch.forEach((item) => item.reject(error))
    }
  }
}

export const requestBatcher = new RequestBatcher()

// Lazy load component
export function lazyLoad<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode,
) {
  const LazyComponent = React.lazy(importFunc)

  return (props: React.ComponentProps<T>) => (
    <React.Suspense fallback={fallback || <div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  )
}

// Performance monitoring
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map()

  start(label: string): () => void {
    const startTime = performance.now()

    return () => {
      const duration = performance.now() - startTime
      this.record(label, duration)
    }
  }

  record(label: string, duration: number): void {
    if (!this.metrics.has(label)) {
      this.metrics.set(label, [])
    }

    const values = this.metrics.get(label)!
    values.push(duration)

    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift()
    }
  }

  getStats(label: string) {
    const values = this.metrics.get(label) || []
    if (values.length === 0) return null

    const sorted = [...values].sort((a, b) => a - b)
    const sum = values.reduce((a, b) => a + b, 0)

    return {
      count: values.length,
      avg: sum / values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    }
  }

  getAllStats() {
    const stats: Record<string, any> = {}
    for (const label of this.metrics.keys()) {
      stats[label] = this.getStats(label)
    }
    return stats
  }

  clear() {
    this.metrics.clear()
  }
}

export const perfMonitor = new PerformanceMonitor()
