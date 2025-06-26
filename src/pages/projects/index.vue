<script setup lang="ts">
  import { projectsQuery, type Projects } from '@/utils/supaQueries'
  import { columns } from '@/utils/tableColumns/projectsColumns'

  usePageStore().pageData.title = 'Projects'

  const projects = ref<Projects | null>()

  const getProjects = async (): Promise<void> => {
    const { data, error } = await projectsQuery

    if (error) throw error

    projects.value = data
  }
  await getProjects()
</script>

<template>
  <DataTabel
    v-if="projects"
    :columns="columns"
    :data="projects"
  />
</template>

