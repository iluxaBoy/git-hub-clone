<script setup lang="ts">
  const route = useRoute<'/projects/[slug]'>()
  const projectId = route.params?.slug
</script>

<template>
  <div>
    <h1>Project {{ projectId }}</h1>
  </div>
</template>
