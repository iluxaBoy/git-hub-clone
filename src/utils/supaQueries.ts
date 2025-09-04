import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// TASKS
export const tasksWithProjectsQuery = supabase.from('tasks').select(`
    *,
    projects(
      id,
      name,
      slug
    )
    `)

export type TasksWithProjects = QueryData<typeof tasksWithProjectsQuery>

export const taskQuery = (id: string) =>
  supabase
    .from('tasks')
    .select(
      `
  *,
  projects(
    id,
    name,
    slug
  )
  `,
    )
    .eq('id', id)
    .single()
export type Task = QueryData<ReturnType<typeof taskQuery>>

// PROJECTS
export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) =>
  supabase
    .from('projects')
    .select(
      `
    *,
    tasks (
      id,
      name,
      status,
      due_date
    )
  `,
    )
    .eq('slug', slug)
    .single()

export type Project = QueryData<ReturnType<typeof projectQuery>>

// PROFILES
export const profilesQuery = (id: string) => supabase.from('profiles').select().eq('id', id).single()
