<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const projectId = route.params.id
</script>

<template>
  <div>
    <h1>Project {{ projectId }}</h1>
  </div>
</template>

<style scoped></style>
