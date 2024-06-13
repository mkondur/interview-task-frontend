<template>
  <div class="">
    <div class="d-flex flex-wrap gap-2 py-3">
      <button
        v-for="line in busLines"
        :key="line"
        class="btn btn-primary line"
        :class="{ active: selectedLine === line }"
        @click="selectLine(line)"
      >
        {{ line }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'

defineProps<{
  busLines: string[]
}>()

const emit = defineEmits(['lineSelected'])

const selectedLine = ref('')

const selectLine = (line: string) => {
  selectedLine.value = line
  emit('lineSelected', line)
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';

.line {
  padding: 3px;
  min-width: 54px;

  &.active {
    background-color: $primary-dark;
  }
}
</style>
