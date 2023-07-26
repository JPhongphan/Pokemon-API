<template>
  <navbar-comp />
  <div>
    <router-view />
  </div>
</template>
<script>
  import navbar from './components/navbar.vue'
  import footer from './components/footer.vue'
  export default {
    components: {
      NavbarComp: navbar,
      FooterComp: footer,
    },
  }
</script>
<style>
</style>