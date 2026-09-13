#!/usr/bin/env node
/**
 * Pack each boilerplate-library/* folder into showcase/public/downloads/{name}.zip
 * Requires system `zip` CLI (common on Linux VPS).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const libDir = path.join(root, 'boilerplate-library')
const outDir = path.join(root, 'showcase', 'public', 'downloads')

fs.mkdirSync(outDir, { recursive: true })

const zipCheck = spawnSync('zip', ['-v'], { encoding: 'utf8' })
if (zipCheck.error) {
  console.error('System `zip` CLI is required. On Debian/Ubuntu: sudo apt install zip')
  process.exit(1)
}

const excludes = [
  '*/node_modules/*',
  '*/.git/*',
  '*/.next/*',
  '*/dist/*',
  '*/build/*',
  '*/coverage/*',
  '*/.turbo/*',
  '*/.cache/*',
  '*/.env',
  '*/.env.*',
  '*/.DS_Store',
  '*/*.log',
]

let ok = 0
for (const name of fs.readdirSync(libDir).sort()) {
  const sourceDir = path.join(libDir, name)
  if (!fs.statSync(sourceDir).isDirectory()) continue
  if (name === 'mern-starter') {
    console.warn('skip legacy mern-starter (use pern-starter)')
    continue
  }

  const zipPath = path.join(outDir, `${name}.zip`)
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath)

  const args = ['-q', '-r', zipPath, name, ...excludes.flatMap((x) => ['-x', x])]
  const result = spawnSync('zip', args, { cwd: libDir, encoding: 'utf8' })
  if (result.status !== 0) {
    console.error(`Failed to zip ${name}:`, result.stderr || result.stdout)
    continue
  }

  const size = fs.statSync(zipPath).size
  console.log(`packed ${name}.zip (${(size / 1024).toFixed(1)} KB)`)
  ok += 1
}

console.log(`Done. ${ok} template zip(s) → showcase/public/downloads/`)
