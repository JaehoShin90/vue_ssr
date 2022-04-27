<template>
  <div id="nav">
    <router-link to="/Home">홈</router-link>
    <router-link to="/Product">상품리스트</router-link>
    <router-link to="/Test">테스트</router-link>
  </div>
</template>

<script>
export default {
  name: "Header",
  beforeCreate() {
    console.log('Header beforeCreate');
    // alert('Header beforeCreate');
  },
  created(){
    console.log('Header created');
    // window.alert('Header created');
  },
  beforeMount() {
    console.log('Header beforeMount');
    // alert('Header beforeMount');
  },
  mounted() {
    console.log('Header mounted');
    // alert('Header mounted');
  }
}
</script>

<style scoped>
#nav{
  display: flex;
  justify-content: space-around;
}
</style>