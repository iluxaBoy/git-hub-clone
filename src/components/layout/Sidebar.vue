<script setup lang="ts">
  const links = [
    {
      title: 'Dashboard',
      icon: 'lucide:house',
      to: '/',
    },
    {
      title: 'Projects',
      icon: 'lucide:building-2',
      to: '/projects',
    },
    {
      title: 'My Tasks',
      icon: 'lucide:badge-check',
      to: '/tasks',
    },
  ]
  const accountLinks = [
    {
      title: 'Profile',
      icon: 'lucide:user',
      to: '/profile',
    },
    {
      title: 'Settings',
      icon: 'lucide:settings',
      to: '/settings',
    },
    {
      title: 'Sign out',
      icon: 'lucide:log-out',
      to: '/signout',
    },
  ]
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 lg:w-52 w-16 transition-[width]"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button
        variant="outline"
        size="icon"
        class="w-8 h-8 !bg-background"
      >
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>

      <Button
        variant="outline"
        size="icon"
        class="w-8 h-8 !bg-background"
      >
        <iconify-icon icon="lucide:plus"></iconify-icon>
      </Button>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" />
      </div>
    </nav>
  </aside>
</template>
