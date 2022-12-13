<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/advancedsearch">Advanced Search</router-link>
    </nav> -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
</style>
<script>
export default{
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('storeState')) {
      //replaceState，替换store的根状态
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('storeState'))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('storeState', JSON.stringify(this.$store.state))
    })
  },
}
</script>
>