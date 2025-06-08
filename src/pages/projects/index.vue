<script setup lang="ts">
  import { supabase } from '@/lib/supabaseClient'
  import { ref } from 'vue'
  import type { Tables } from '../../../database/database.types'

  const projects = ref<Tables<'projects'>[] | null>()

  // IIFE
  ;(async (): Promise<void> => {
    const { data, error } = await supabase.from('projects').select()

    if (error) console.error(error)

    projects.value = data
    console.log(projects.value)
  })()
</script>

<template>
  <div>
    <h1>Project Page</h1>
    <RouterLink to="/">Home</RouterLink>
    <ul>
      <li
        v-for="project in projects"
        :key="project.id"
      >
        {{ project }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
