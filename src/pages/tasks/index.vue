<script setup lang="ts">
  import { supabase } from '@/lib/supabaseClient'
  import type { Tables } from '../../../database/database.types'
  import type { ColumnDef } from '@tanstack/vue-table'
  import DataTabel from '@/components/ui/data-tabel/DataTabel.vue'
  import { RouterLink } from 'vue-router'

  const tasks = ref<Tables<'tasks'>[] | null>()

  // IIFE
  ;(async (): Promise<void> => {
    const { data, error } = await supabase.from('tasks').select()

    if (error) console.error(error)

    tasks.value = data
  })()

  const columns: ColumnDef<Tables<'tasks'>>[] = [
    {
      accessorKey: 'name',
      header: () => h('div', { class: 'text-left' }, 'Name'),
      cell: ({ row }) => {
        return h(
          RouterLink,
          {
            to: `/tasks/${row.original.id}`,
            class: 'text-left font-medium hover:bg-muted block w-full',
          },
          () => row.getValue('name'),
        )
      },
    },
    {
      accessorKey: 'status',
      header: () => h('div', { class: 'text-left' }, 'Status'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('status'))
      },
    },
    {
      accessorKey: 'due_date',
      header: () => h('div', { class: 'text-left' }, 'Due Date'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
      },
    },
    {
      accessorKey: 'project_id',
      header: () => h('div', { class: 'text-left' }, 'Project'),
      cell: ({ row }) => {
        return h('div', { class: 'text-left font-medium' }, row.getValue('project_id'))
      },
    },
    {
      accessorKey: 'collaborators',
      header: () => h('div', { class: 'text-left' }, 'Collaborators'),
      cell: ({ row }) => {
        return h(
          'div',
          { class: 'text-left font-medium' },
          JSON.stringify(row.getValue('collaborators')),
        )
      },
    },
  ]
</script>

<template>
  <DataTabel
    v-if="tasks"
    :columns="columns"
    :data="tasks"
  />
</template>

<style scoped></style>
