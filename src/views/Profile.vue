<template>
  <div>
    <div class="user_box">
    头像 名称<br/>
    头像 简介
    </div>
    <div class="info_form">
      其他全部个人信息列表
    </div>
  </div>
</template>

<script>
  import qs from "qs";
  export default{
    data(){
      return{
        username:"Lorem ipsum",
        email:"lorem@ipsum.com",
        password0:"",
        password1:"",
        password2:"",
        scholar:""
      }
    }
  }
</script>

<style scoped>
.user_box{
  width:100%;
  height: 200px;
  border:4px black solid;
}
</style>