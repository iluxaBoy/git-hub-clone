<script setup lang="ts">
  import { projectQuery, type Project } from '@/utils/supaQueries'

  const route = useRoute('/projects/[slug]')
  const projectSlug = route.params?.slug

  const project = ref<Project | null>(null)

  watch(
    () => project.value?.name,
    () => {
      usePageStore().pageData.title = `Project: ${project.value?.name || ''}`
    },
  )

  const getProject = async () => {
    const { data, error, status } = await projectQuery(projectSlug)

    if (error) useErrorStore().setError({ error, customCode: status })

    project.value = data
  }
  await getProject()
</script>

<template>
  <Table v-if="project">
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> {{ project.name }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        {{ project.description }}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell> {{ project.status }} </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary hover:scale-110 transition-transform"
            v-for="collab in project.collaborators"
            :key="collab"
          >
            <RouterLink
              class="w-full h-full flex items-center justify-center"
              to=""
            >
              <AvatarImage
                src=""
                alt=""
              />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>

  <section
    v-if="project"
    class="mt-10 flex flex-col md:flex-row gap-5 justify-between grow"
  >
    <div class="flex-1">
      <h2 class="mb-4 text-lg font-semibold w-fit">Tasks</h2>
      <div class="table-container overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="task in project.tasks"
              :key="task.id"
            >
              <TableCell> {{ task.name }} </TableCell>
              <TableCell> {{ task.status }} </TableCell>
              <TableCell> {{ task.due_date }} </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="flex-1">
      <h2 class="mb-4 text-lg font-semibold w-fit">Documents</h2>
      <div class="table-container overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80">
        <p class="text-muted-foreground text-sm font-semibold px-4 py-3">
          This project doesn't have documents yet...
        </p>
        <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
  th {
    width: 100px;
  }
</style>
