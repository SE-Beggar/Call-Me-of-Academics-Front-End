<template>
  <div>
    <div id="top_banner">
      <div class="top_left" @click="gotoMain">
        <img src="../assets/image/style_img/header.png" style="float:left;height:72px;">
      </div>

      <div class="top_mid">
        <ul>
          <li><a href="/">宣传页</a></li>
          <li><a href="/main">主页面</a></li>
          <li><a href="/searchpaper" @click="clean">查论文</a></li>
          <li><a href="/searchauthor">查学者</a></li>
        </ul>
      </div>
      
      <div class="top_right">
        <div v-if="this.$store.state.islogin===false">
        <div class="div_btn1" style="float:left" @click="gotoLogin">登录</div>
        <div class="div_btn1" style="float:left" @click="gotoRegister">注册</div>
        </div>
        <div v-if="this.$store.state.islogin===true" class="head_box" @click="gotoProfile">
          <div class="username">
            <p>{{this.$store.state.username}}</p>
          </div>
          <img src="../assets/image/heads/1.png">
        </div>
      </div>
    </div>
    <div style="height:72px;"></div>
  </div>
</template>

<script>
export default {
  name:"TopBanner",
  methods:{
    gotoMain(){
      this.$router.push("/main")
    },
    gotoLogin(){
      this.$router.push("/login")
    },
    gotoRegister(){
      this.$router.push("/register")
    },
    gotoProfile(){
      this.$router.push("/profile")
    },
    clean(){
      this.$store.state.searchcontent="";
      this.$store.state.type=1;
    }
  }
}
</script>

<style scoped>
#top_banner {
  width: 100%;
  height: 72px;
  position: fixed;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
  box-shadow: 10rpx 10rpx 10rpx rgb(0 0 0 / 18%);
  overflow: hidden;
}
.top_left {
  float:left;
  margin-left: 40px;
}
.top_left:hover {
  cursor: pointer;
}
.top_mid{
  float: left;
  height: 72px;
  width: 400px;
}
.top_mid ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0);
  height: 72px;
}
.top_mid li {
  float: left;
}
.top_mid li a {
  display: block;
  height: 72px;
  line-height: 72px;
  font-weight: 600;
  color: black;
  text-align: center;
  padding: 0 26px;
  text-decoration: none;
}
.top_mid li a:hover {
  background-color: rgba(0,0,0,0.5);
  color: white;
}
.top_right {
  float:right;
  margin-right:40px;
  font-size: 30px;
}
.head_box {
  width: 66px;
  height: 66px;
  border:1px solid;
  border-radius: 20px;
  float:left;
  margin-top:2px;
  margin-right:20px;
}
.head_box:hover {
  margin-top:0;
  border:3px solid;
  cursor: pointer;
  width: auto;
}
.head_box:hover .username{
  display: block;
}
.head_box img{
  width: 66px;
  height: 66px;
  border-radius: 20px;
}
.div_btn1 {
  color:black;
  font-size: 20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  width: 80px;
  transition: 1.0s;
}
.div_btn1:hover {
  cursor: pointer;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.24),0 6px 18px 0 rgba(0,0,0,0.19);
}
.username{
  display: none;
  float: left;
  height: 42px;
  margin-top: 14px;
  font-weight: 700;
  /* border: 1px solid ; */
  padding: 0 10px;
  border-radius: 10px;
  /* width: 144px; */
  overflow: hidden;
}
.username p{
  font-size: 21px;
  line-height: 42px;
}
</style>