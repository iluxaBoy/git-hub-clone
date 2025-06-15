<script setup lang="ts">
  import DataTabel from '@/components/ui/data-tabel/DataTabel.vue'
  import { supabase } from '@/lib/supabaseClient'
  import type { Tables } from '../../../database/database.types'
  import type { ColumnDef } from '@tanstack/vue-table'
  import { RouterLink } from 'vue-router'

  const projects = ref<Tables<'projects'>[] | null>()

  // IIFE
  ;(async (): Promise<void> => {
    const { data, error } = await supabase.from('projects').select()

    if (error) console.error(error)

    projects.value = data
  })()

  const columns: ColumnDef<Tables<'projects'>>[] = [
    {
      accessorKey: 'name',
      header: () => h('div', { class: 'text-left' }, 'Name'),
      cell: ({ row }) => {
        return h(
          RouterLink,
          {
            to: `/projects/${row.original.slug}`,
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
    v-if="projects"
    :columns="columns"
    :data="projects"
  />
</template>

<style>
  @reference "@/assets/main.css";

  td {
    @apply p-0;
  }

  td > * {
    @apply p-2;
  }
</style>
