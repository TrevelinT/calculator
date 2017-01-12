<template lang="html">
  <header class="app-header">
    <h1 class="app-title">{{ message }}</h1>
    <span class="app-menu-icon" @click="toggleMenu">Menu</span>
  </header>
</template>

<script>
export default {
  data: () => ({
    message: 'Simple Calculator'
  }),
  methods: {
    toggleMenu() {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="css">

.app-header {
  background-color: #009bcc;
  padding: 0.8em;
  box-sizing: border-box;
  height: 12vh;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  max-height: 4em;
}

.app-title {
  color: #fff;
  font-size: 1.2em;
  margin: 0 0 0 2em;
  font-weight: 500;
}

/* ==========================================================================
   Menu Icon
   ========================================================================== */

.app-menu-icon {
  text-indent: -500em;
  position: absolute;
  x-top: 1.45em;
  cursor: pointer;
}

.app-menu-icon:before { top: 0.5em; }

.app-menu-icon:after { bottom: 0.5em; }

.app-menu-icon:before,
.app-menu-icon:after {
  content: " ";
  position: absolute;
  left: 0;
}

.app-menu-icon,
.app-menu-icon:before,
.app-menu-icon:after {
  height: 0.25em;
  width: 1.5em;
  background-color: #fff;
}
</style>
