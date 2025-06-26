<script setup lang="ts">
  import { tasksWithProjectsQuery, type TasksWithProjects } from '@/utils/supaQueries'
  import { columns } from '@/utils/tableColumns/tasksColumns'

  usePageStore().pageData.title = 'My Tasks'

  const tasks = ref<TasksWithProjects | null>()

  const getTasks = async (): Promise<void> => {
    const { data, error } = await tasksWithProjectsQuery

    if (error) throw error

    tasks.value = data
  }
  await getTasks()
</script>

<template>
  <DataTabel
    v-if="tasks"
    :columns="columns"
    :data="tasks"
  />
</template>

