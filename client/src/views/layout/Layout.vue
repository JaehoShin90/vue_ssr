<template>
  <div>
    <Header/>
    <slot/>
  </div>
</template>

<script>
import Header from "@/views/layout/Header";
export default {
  name: "layout",
  components: {Header}
}
</script>

<style scoped>

</style>