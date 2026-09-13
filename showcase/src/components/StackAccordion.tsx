import { useEffect, useState } from 'react'
import type { Stack } from '../types'

type Props = {
  stack: Stack
  zipReady: boolean | null
  defaultOpen?: boolean
}

export function StackAccordion({ stack, zipReady, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const [openProjects, setOpenProjects] = useState<Record<number, boolean>>({})

  function toggleProject(n: number) {
    setOpenProjects((prev) => ({ ...prev, [n]: !prev[n] }))
  }

  return (
    <section className="overflow-hidden rounded-xl border border-ink-100 bg-white/80 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 border-b border-ink-100 p-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-1 items-start gap-3 text-left"
        >
          <span className="mt-1 font-display text-moss" aria-hidden>
            {open ? '▾' : '▸'}
          </span>
          <span>
            <span className="font-display text-lg font-semibold text-ink-900">{stack.name}</span>
            <span className="mt-1 block text-xs text-ink-700/60">
              {stack.category} · {stack.projects.length} ideas · {stack.templateId}
            </span>
          </span>
        </button>

        <div className="flex items-center gap-2 sm:shrink-0">
          {zipReady === false && (
            <span className="text-xs text-amber-700">ZIP missing — pack on VPS</span>
          )}
          <a
            href={stack.downloadPath}
            download={`${stack.templateId}.zip`}
            className={`rounded-md px-3 py-2 text-sm font-medium text-white transition ${
              zipReady === false
                ? 'bg-ink-700/40 pointer-events-none'
                : 'bg-moss hover:bg-moss-dark'
            }`}
            onClick={(e) => {
              if (zipReady === false) e.preventDefault()
            }}
          >
            Download ZIP
          </a>
        </div>
      </div>

      {open && (
        <div className="space-y-2 p-3 sm:p-4">
          {stack.projects.map((project) => {
            const isOpen = !!openProjects[project.number]
            return (
              <article
                key={project.number}
                className="rounded-lg border border-ink-100 bg-ink-50/60"
              >
                <button
                  type="button"
                  className="flex w-full items-start gap-3 px-3 py-3 text-left"
                  onClick={() => toggleProject(project.number)}
                >
                  <span className="text-moss" aria-hidden>
                    {isOpen ? '▾' : '▸'}
                  </span>
                  <span className="flex-1">
                    <span className="font-medium text-ink-900">
                      {project.number}. {project.title}
                    </span>
                    <span className="mt-1 flex flex-wrap gap-2 text-xs">
                      <span className="rounded bg-moss/10 px-2 py-0.5 font-medium text-moss-dark">
                        Rec {project.recommendationField || project.recommendation}
                      </span>
                      <span className="rounded bg-sand/40 px-2 py-0.5 text-ink-700">
                        {project.difficultyTier || project.tierSummary}
                      </span>
                      <span className="rounded bg-white px-2 py-0.5 text-ink-700/70">
                        {project.complexity}
                      </span>
                    </span>
                  </span>
                </button>

                {isOpen && (
                  <div className="space-y-3 border-t border-ink-100 px-4 py-3 text-sm text-ink-700/80">
                    <p>{project.description}</p>
                    {project.features.length > 0 && (
                      <div>
                        <p className="mb-1 font-medium text-ink-900">Key features</p>
                        <ul className="list-disc space-y-1 pl-5">
                          {project.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {project.targetAudience && (
                      <p>
                        <span className="font-medium text-ink-900">Audience:</span>{' '}
                        {project.targetAudience}
                      </p>
                    )}
                    {project.why && (
                      <p>
                        <span className="font-medium text-ink-900">Why this stack:</span>{' '}
                        {project.why}
                      </p>
                    )}
                    {project.monetization && (
                      <p>
                        <span className="font-medium text-ink-900">Monetization:</span>{' '}
                        {project.monetization}
                      </p>
                    )}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export function useZipAvailability(downloadPath: string) {
  const [ready, setReady] = useState<boolean | null>(null)
  useEffect(() => {
    let cancelled = false
    fetch(downloadPath, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled) setReady(res.ok)
      })
      .catch(() => {
        if (!cancelled) setReady(false)
      })
    return () => {
      cancelled = true
    }
  }, [downloadPath])
  return ready
}
