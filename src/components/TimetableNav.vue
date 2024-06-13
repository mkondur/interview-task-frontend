<template>
  <nav class="rounded-2 px-4 py-3">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link to="/" class="nav-link" active-class="active"
          >Bus Lines</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/stops" class="nav-link" active-class="active"
          >Stops</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import '../styles/_variables.scss';
nav {
  background-color: $white;

  .nav-tabs {
    border-bottom: none;

    .nav-link {
      color: $gray;
      border: none;
      font-size: 14px;

      &.router-link-exact-active {
        color: $dark;
        font-weight: 500;
        position: relative;

        &:after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -16px;
          height: 2px;
          background-color: $primary;
        }
      }
    }
  }
}
</style>
