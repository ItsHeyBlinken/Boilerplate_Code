import { useMemo, useState } from 'react'
import useCases from './data/useCases.json'
import { StackAccordion, useZipAvailability } from './components/StackAccordion'
import type { Stack } from './types'

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Full-Stack', 'Infrastructure'] as const
const RECS = ['All', 'S', 'A', 'B', 'C'] as const

function StackCard({ stack }: { stack: Stack }) {
  const zipReady = useZipAvailability(stack.downloadPath)
  return <StackAccordion stack={stack} zipReady={zipReady} />
}

export default function App() {
  const stacks = useCases.stacks as Stack[]
  const [category, setCategory] = useState<string>('All')
  const [rec, setRec] = useState<string>('All')
  const [tier, setTier] = useState<string>('All')
  const [query, setQuery] = useState('')

  const tiers = useMemo(() => {
    const set = new Set<string>()
    for (const s of stacks) {
      for (const p of s.projects) {
        if (p.difficultyTier) set.add(p.difficultyTier)
      }
    }
    return ['All', ...Array.from(set).sort()]
  }, [stacks])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return stacks
      .filter((s) => (category === 'All' ? true : s.category === category))
      .map((s) => ({
        ...s,
        projects: s.projects.filter((p) => {
          if (rec !== 'All' && (p.recommendationField || p.recommendation) !== rec) return false
          if (tier !== 'All' && (p.difficultyTier || p.tierSummary) !== tier) return false
          if (!q) return true
          const hay = [
            s.name,
            p.title,
            p.description,
            p.targetAudience,
            ...(p.features || []),
          ]
            .join(' ')
            .toLowerCase()
          return hay.includes(q)
        }),
      }))
      .filter((s) => s.projects.length > 0 || (!q && rec === 'All' && tier === 'All'))
  }, [stacks, category, rec, tier, query])

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-10">
      <header className="mb-10 space-y-5">
        <p className="font-display text-sm uppercase tracking-[0.22em] text-moss">Boilerplate Library</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
          Use cases &amp; template downloads
        </h1>
        <p className="max-w-2xl text-ink-700/75">
          Browse ranked project ideas for each starter, then download a ZIP of the template to use on
          your machine or VPS.
        </p>

        <div className="grid gap-3 rounded-xl border border-ink-100 bg-white/70 p-4 text-sm text-ink-700/80 sm:grid-cols-3">
          <div>
            <p className="font-display font-semibold text-ink-900">Recommendation</p>
            <p>S standout · A strong · B solid · C niche</p>
          </div>
          <div>
            <p className="font-display font-semibold text-ink-900">Difficulty tier</p>
            <p>Tier 3 beginner · Tier 2 intermediate · Tier 1 advanced</p>
          </div>
          <div>
            <p className="font-display font-semibold text-ink-900">Downloads</p>
            <p>ZIPs ship with the static build. On VPS run pack before build.</p>
          </div>
        </div>
      </header>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-sm">
          <span className="mb-1 block text-ink-700/60">Category</span>
          <select
            className="w-full rounded-md border border-ink-100 bg-white px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-ink-700/60">Recommendation</span>
          <select
            className="w-full rounded-md border border-ink-100 bg-white px-3 py-2"
            value={rec}
            onChange={(e) => setRec(e.target.value)}
          >
            {RECS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-ink-700/60">Difficulty tier</span>
          <select
            className="w-full rounded-md border border-ink-100 bg-white px-3 py-2"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
          >
            {tiers.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm sm:col-span-2 lg:col-span-1">
          <span className="mb-1 block text-ink-700/60">Search</span>
          <input
            className="w-full rounded-md border border-ink-100 bg-white px-3 py-2"
            placeholder="Search ideas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <div className="space-y-4">
        {filtered.map((stack) => (
          <StackCard key={stack.templateId} stack={stack} />
        ))}
        {filtered.length === 0 && (
          <p className="rounded-lg border border-ink-100 bg-white/70 px-4 py-8 text-center text-ink-700/60">
            No projects match these filters.
          </p>
        )}
      </div>

      <footer className="mt-12 border-t border-ink-100 pt-6 text-sm text-ink-700/55">
        Source of truth: <code className="text-ink-700">PROJECT_USE_CASES.md</code>. Sync with{' '}
        <code className="text-ink-700">npm run sync:use-cases</code>.
      </footer>
    </div>
  )
}
