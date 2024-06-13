<template>
  <div class="list">
    <div class="list__top px-4">
      <h6 v-if="header" class="list__header">{{ header }}</h6>
      <div v-if="subheader" class="list__subheader d-flex my-4">
        <span>{{ subheader }}</span>
        <span
          v-if="sortable"
          @click="toggleSortOrder"
          class="sort-icon"
          :class="sortOrder"
        ></span>
      </div>
    </div>
    <ul v-if="items.length" class="list-group list-group-flush">
      <li
        v-for="(item, index) in sortedItems"
        :key="index"
        class="list-group-item px-4 py-3"
        :class="{ selected: itemLabel(item) === modelValue, selectable }"
        @click="selectItem(item)"
      >
        {{ itemLabel(item) }}
      </li>
    </ul>
    <span v-else class="px-4 py-2">No data</span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface AnyObject {
  [key: string]: unknown
}

export interface Props {
  items: any[]
  header?: string
  subheader?: string
  itemLabelKey?: string
  sortKey?: string
  selectable?: boolean
  sortable?: boolean
  initialOrder?: 'asc' | 'desc'
  modelValue?: any
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  sortable: true,
})

const emit = defineEmits(['update:modelValue'])

const sortOrder = ref(props.initialOrder)

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const selectItem = (item: AnyObject | string) => {
  emit('update:modelValue', itemLabel(item))
}

const itemLabel = (item: AnyObject | string) =>
  props.itemLabelKey && typeof item === 'object'
    ? item[props.itemLabelKey as keyof typeof item]
    : item

const sortedItems = computed(() => {
  if (!sortOrder.value) return props.items
  const sortKey = props.sortKey as string
  return [...props.items].sort((a, b) => {
    const aValue = (sortKey && typeof a === 'object' ? a[sortKey] : a) as string
    const bValue = (sortKey && typeof b === 'object' ? b[sortKey] : b) as string
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue
    }

    return sortOrder.value === 'asc'
      ? aValue.localeCompare(bValue, 'pl')
      : bValue.localeCompare(aValue, 'pl')
  })
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';
@import '../styles/variables';

.list {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__top {
    flex: 0 0 auto;
    border-bottom: 1px solid $gray-medium;
  }

  &__header {
    font-size: 14px;
  }

  &__subheader span {
    font-size: 12px;
    font-weight: 600;
  }
}

.list-group {
  flex: 1 1 auto;
  overflow-y: auto;
}

.list-group-item {
  color: $dark;
  pointer-events: none;
  font-size: 12px;
  border-color: $bg-color;

  &.selectable {
    cursor: pointer;
    pointer-events: all;

    &:hover {
      background-color: $gray-light;
    }

    &.selected {
      color: $primary;
    }
  }
}

.sort-icon {
  display: inline-flex;
  flex-direction: column;
  height: 10px;
  justify-content: space-between;
  color: $gray;
  cursor: pointer;
  margin: 4px;

  &.asc {
    &:before {
      color: $dark;
    }
  }

  &.desc {
    &:after {
      color: $dark;
    }
  }

  &:before {
    content: '';
    @include triangle(8px, 'top', currentColor);
  }

  &:after {
    content: '';
    @include triangle(8px, 'bottom', currentColor);
  }
}
</style>
