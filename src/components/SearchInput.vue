<template>
  <div class="search" :class="{ 'search--focused': isFocused }">
    <input
      type="text"
      class="search__input form-control"
      placeholder="Search..."
      v-model="searchQuery"
      @input="onSearch"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
    <SearchIcon class="search__icon" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SearchIcon from '../svg-icons/search-icon.vue'

const emit = defineEmits(['search'])

const searchQuery = ref('')
const isFocused = ref(false)

const onSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<style lang="scss" scoped>
@import '../styles/_variables.scss';

.search {
  position: relative;
  max-width: 288px;
  color: $gray;

  &--focused {
    color: $primary;
  }

  &__input {
    font-size: 12px;
    height: 40px;
    padding-right: 40px;

    &:focus {
      border-color: $primary;
      box-shadow: none;
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
  }
}
</style>
