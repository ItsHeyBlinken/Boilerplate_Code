export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

export const generateUniqueSlug = async (
  baseSlug: string,
  checkUnique: (slug: string) => Promise<boolean>,
  maxAttempts: number = 10
): Promise<string> => {
  let slug = baseSlug
  let attempt = 1

  while (await checkUnique(slug) && attempt <= maxAttempts) {
    slug = `${baseSlug}-${attempt}`
    attempt++
  }

  if (attempt > maxAttempts) {
    // If we've exhausted attempts, append timestamp
    slug = `${baseSlug}-${Date.now()}`
  }

  return slug
}