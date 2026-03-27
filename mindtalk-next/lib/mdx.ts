import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export function getMDXFrontmatter<T = Record<string, unknown>>(filePath: string): T {
  const fullPath = path.join(contentDir, filePath)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { data } = matter(raw)
  return data as T
}

export function getMDXContent(filePath: string): { frontmatter: Record<string, unknown>; content: string } {
  const fullPath = path.join(contentDir, filePath)
  const raw = fs.readFileSync(fullPath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)
  return { frontmatter, content }
}

export type VerticalSlug = 'anxiety' | 'emotional-reset' | 'relationships' | 'burnout'

export const VERTICAL_SLUGS: VerticalSlug[] = [
  'anxiety',
  'emotional-reset',
  'relationships',
  'burnout',
]
