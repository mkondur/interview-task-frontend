<template>
  <div class="container mt-5">
    <h1>Timetable</h1>
    <TimetableNav />
    <div class="mt-4">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TimetableNav from '../components/TimetableNav.vue'
</script>
