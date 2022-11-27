<template>
  <div class="home">
    <h1>当前已有的页面</h1>
    <br/>
    <br/>
    <a href="/register">注册页面</a>
    <a href="/login">登录页面</a>
    <a href="/paperdetail">论文详情页面</a>
    <a href="/profile">个人信息页面</a>
    <a href="/scholar">学者个人信息页面</a>
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
<style scoped>
.home{
  margin: 128px auto auto;
  width:400px;
  border: 4px solid black;
}
a:link,a:visited{
  display:block;
  margin: auto;
  font-weight:bold;
  font-size:24px;
  color:dodgerblue;
  width:240px;
  text-align:center;
  padding:8px;
  text-decoration:none;
}
a:hover,a:active{
  background-color:lightsteelblue;
}
</style>
