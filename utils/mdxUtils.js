import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import mdxPrism from 'mdx-prism'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export function getAllProjectSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory)
  console.log('MDX DEBUG: Files in projectsDirectory:', fileNames)
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    }
  })
}

export function getProjectBySlug(slug) {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
  console.log('MDX DEBUG: Looking for file at:', fullPath)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data,
    content,
  }
}

export function getAllProjects() {
  const fileNames = fs.readdirSync(projectsDirectory)
  const projects = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '')
    const project = getProjectBySlug(slug)
    
    return {
      slug,
      ...project,
    }
  })

  // Sort projects by date (newest first)
  return projects.sort((a, b) => {
    if (a.frontmatter.date < b.frontmatter.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function serializeMDX(content) {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [mdxPrism],
    },
  })
  return mdxSource
}

export function extractHeadings(content) {
  const headings = content.match(/#{2,4} .+/g)
  if (!headings) return []
  
  return headings.map((heading) => {
    const level = heading.match(/#/g).length - 2
    const title = heading.replace(/#{2,4} /, '')
    return { title, level }
  })
}

// Helper function to get featured projects
export function getFeaturedProjects(limit = 3) {
  const allProjects = getAllProjects()
  return allProjects.slice(0, limit)
}

// Helper function to get projects by category
export function getProjectsByCategory(category) {
  const allProjects = getAllProjects()
  return allProjects.filter(project => 
    project.frontmatter.category === category
  )
}

// Helper function to get projects by tag
export function getProjectsByTag(tag) {
  const allProjects = getAllProjects()
  return allProjects.filter(project => 
    project.frontmatter.tags && project.frontmatter.tags.includes(tag)
  )
} 