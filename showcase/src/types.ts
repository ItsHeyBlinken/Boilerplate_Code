export type Project = {
  number: number
  title: string
  recommendation: string
  tierSummary: string
  description: string
  features: string[]
  targetAudience: string
  why: string
  complexity: string
  difficultyTier: string
  recommendationField: string
  monetization: string
}

export type Stack = {
  name: string
  templateId: string
  category: string
  downloadPath: string
  projects: Project[]
}

export type TemplateMeta = {
  id: string
  name: string
  category: string
  downloadPath: string
  projectCount: number
}
