#!/usr/bin/env node
/**
 * Parse PROJECT_USE_CASES.md into showcase/src/data/useCases.json + templates.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const mdPath = path.join(root, 'PROJECT_USE_CASES.md')
const outDir = path.join(root, 'showcase', 'src', 'data')

const STACK_MAP = {
  'Static HTML/CSS/JS': {
    id: 'html-css-js',
    category: 'Frontend',
  },
  'React Vite': { id: 'react-vite', category: 'Frontend' },
  'Vue.js Vite': { id: 'vue-vite', category: 'Frontend' },
  'Next.js Starter': { id: 'nextjs-starter', category: 'Frontend' },
  'Remix Starter': { id: 'remix-starter', category: 'Frontend' },
  'Express API': { id: 'express-api', category: 'Backend' },
  'GraphQL API': { id: 'graphql-api', category: 'Backend' },
  'NestJS Starter': { id: 'nestjs-starter', category: 'Backend' },
  'Node PostgreSQL': { id: 'node-postgres', category: 'Backend' },
  'Serverless Functions': { id: 'serverless-functions', category: 'Backend' },
  'PERN Starter': { id: 'pern-starter', category: 'Full-Stack' },
  'CRM Platform': { id: 'crm-platform', category: 'Full-Stack' },
  'E-commerce Platform': { id: 'ecommerce-platform', category: 'Full-Stack' },
  'Blog / CMS': { id: 'blog-cms', category: 'Full-Stack' },
  'Realtime Socket.io': { id: 'realtime-socketio', category: 'Full-Stack' },
  'SaaS Starter': { id: 'saas-starter', category: 'Full-Stack' },
  'tRPC Starter': { id: 'trpc-starter', category: 'Full-Stack' },
  'Stripe Integration': { id: 'stripe-integration', category: 'Infrastructure' },
  'Docker Node': { id: 'docker-node', category: 'Infrastructure' },
  'Monorepo Turborepo': { id: 'monorepo-turborepo', category: 'Infrastructure' },
}

function field(body, name) {
  const re = new RegExp(`\\*\\*${name}\\*\\*:\\s*(.+)`)
  const m = body.match(re)
  return m ? m[1].trim() : ''
}

function features(body) {
  const m = body.match(/\*\*Key Features\*\*:\n((?:- .+\n?)+)/)
  if (!m) return []
  return m[1]
    .split('\n')
    .map((l) => l.replace(/^- /, '').trim())
    .filter(Boolean)
}

function parseMarkdown(md) {
  const stacks = []
  const stackBlocks = md.split(/<details>\s*\n<summary><strong>([^<]+)<\/strong><\/summary>/).slice(1)

  for (let i = 0; i < stackBlocks.length; i += 2) {
    const stackName = stackBlocks[i].trim()
    const chunk = stackBlocks[i + 1] || ''
    // Stop at closing stack details before next major section — take until last nested projects
    const meta = STACK_MAP[stackName]
    if (!meta) {
      // skip non-template sections (e.g. Combining Multiple Boilerplates)
      continue
    }

    const projects = []
    const projectRe =
      /<details>\s*\n<summary>(\d+)\. (.+?) — <em>([^<]+)<\/em> · ([^<]+)<\/summary>\s*\n([\s\S]*?)<\/details>/g
    let pm
    while ((pm = projectRe.exec(chunk))) {
      const body = pm[5]
      projects.push({
        number: Number(pm[1]),
        title: pm[2].trim(),
        recommendation: pm[3].trim(),
        tierSummary: pm[4].trim(),
        description: field(body, 'Description'),
        features: features(body),
        targetAudience: field(body, 'Target Audience'),
        why: field(body, 'Why This Boilerplate'),
        complexity: field(body, 'Complexity'),
        difficultyTier: field(body, 'Difficulty Tier') || pm[4].trim(),
        recommendationField: field(body, 'Recommendation') || pm[3].trim(),
        monetization: field(body, 'Monetization'),
      })
    }

    stacks.push({
      name: stackName,
      templateId: meta.id,
      category: meta.category,
      downloadPath: `/downloads/${meta.id}.zip`,
      projects,
    })
  }

  return stacks
}

const md = fs.readFileSync(mdPath, 'utf8')
const stacks = parseMarkdown(md)

const templates = stacks.map((s) => ({
  id: s.templateId,
  name: s.name,
  category: s.category,
  downloadPath: s.downloadPath,
  projectCount: s.projects.length,
}))

// Also list any library folders not in use-cases (still downloadable)
const libDir = path.join(root, 'boilerplate-library')
const known = new Set(templates.map((t) => t.id))
for (const name of fs.readdirSync(libDir)) {
  const p = path.join(libDir, name)
  if (!fs.statSync(p).isDirectory()) continue
  if (name === 'mern-starter') continue
  if (known.has(name)) continue
  templates.push({
    id: name,
    name: name,
    category: 'Other',
    downloadPath: `/downloads/${name}.zip`,
    projectCount: 0,
  })
}

fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'useCases.json'), JSON.stringify({ stacks }, null, 2))
fs.writeFileSync(path.join(outDir, 'templates.json'), JSON.stringify({ templates }, null, 2))

console.log(
  `Synced ${stacks.length} stacks, ${stacks.reduce((n, s) => n + s.projects.length, 0)} projects → showcase/src/data/`,
)
