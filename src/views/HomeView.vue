<template>
  <!-- <div class="home">
    <h1>当前已有的页面</h1>
    <br/>
    <br/>
    <a href="/register">注册页面</a>
    <a href="/login">登录页面</a>
    <a href="/main">主页面</a>
    <a href="/advancedsearch">高级搜索页面</a>
    <a href="/searchPaper">搜索论文页面</a>
    <a href="/searchAuthor">搜索学者页面</a>
    <a href="/paperdetail">论文详情页面</a>
    <a href="/profile">个人信息页面</a>
    <a href="/scholar">学者个人信息页面</a>
    <a href="/testpage">样式测试</a>
  </div> -->
  <div>
    <div id="top_banner">
      <div class="top_left">
        <img src="../assets/image/characters/begger_top.png" style="float:left;height:72px;">
      </div>
      <!--如果读取到登录信息就显示登录后的情况-->
      <div class="top_right">
        <div v-if="this.$store.state.islogin===false">
        <div class="div_btn1" style="float:left" @click="gotoLogin">登录</div>
        <div class="div_btn1" style="float:left" @click="gotoRegister">注册</div>
        </div>
        <div v-if="this.$store.state.islogin===true" class="head_box" @click="gotoProfile">
          <img src="../assets/image/heads/1.png">
        </div>
      </div>
    </div>

    <div style="height:100px;"></div>
    <div>
        <div class="text_head">
          免费在线的学术成果分享平台
        </div>
        <div class="text_detail">
          面向广大科研从业人员的学术成果分享平台，为认证通过的科研从业人员建立个人门户系统，分类管理和维护个人学术成果
        </div>
    </div>

    <div class="div_btn2" @click="gotoMain"
      style="margin:auto;margin-top:40px;margin-bottom:60px;">
      开始使用
    </div>

    <div class="div_intro1">
      <div class="intro_img">
        <img src="../assets/image/img_test.jpg">
      </div>
      <div class="intro_text">
        <div class="text_head">
          跳转_____页面
        </div>
        <div class="text_detail">
          宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语
        </div>
        <div class="div_btn2" @click="gotoLogin"
          style="margin:auto;margin-top:40px;margin-bottom:60px;">
          开始使用
        </div>
      </div>
    </div>

    <div class="div_intro2">
      <div class="intro_text">
        <div class="text_head">
          跳转_____页面
        </div>
        <div class="text_detail">
          宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语
        </div>
        <div class="div_btn2" @click="gotoLogin"
          style="margin:auto;margin-top:40px;margin-bottom:60px;">
          开始使用
        </div>
      </div>
      <div class="intro_img">
        <img src="../assets/image/img_test.jpg">
      </div>
    </div>

    <div class="div_intro1">
      <div class="intro_img">
        <img src="../assets/image/img_test.jpg">
      </div>
      <div class="intro_text">
        <div class="text_head">
          跳转_____页面
        </div>
        <div class="text_detail">
          宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语
        </div>
        <div class="div_btn2" @click="gotoLogin"
          style="margin:auto;margin-top:40px;margin-bottom:60px;">
          开始使用
        </div>
      </div>
    </div>

    <div class="div_intro2">
      <div class="intro_text">
        <div class="text_head">
          跳转_____页面
        </div>
        <div class="text_detail">
          宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语宣传语
        </div>
        <div class="div_btn2" @click="gotoLogin"
          style="margin:auto;margin-top:40px;margin-bottom:60px;">
          开始使用
        </div>
      </div>
      <div class="intro_img">
        <img src="../assets/image/img_test.jpg">
      </div>
    </div>

    <div class="div_intro1" style="height:300px;display: block;">
      <div class="info_img">
        <p style="margin-bottom:20px;font-size:18px;">友情链接</p>
        <img src="../assets/image/nbpl.png">
      </div>
      <div class="info_img">
        <p style="margin-bottom:20px;font-size:18px;">关于我们</p>
        <img src="../assets/image/about_us.png">
      </div>
      <div class="info_img" style="width:240px;">
        <p style="margin-bottom:20px;font-size:18px;">访问统计</p>
        <img src="https://badges.toozhao.com/badges/01G9NYGBKXCVD7GT0YGTKPJET9/blue.svg"
            style="width:100%;margin:auto;" alt="连接异常">
      </div>
    </div>
  </div>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  // components: {
  //   HelloWorld
  // }
  methods: {
    gotoLogin(){
        this.$router.push("/login")
    },
    gotoRegister(){
        this.$router.push("/register")
    },
    gotoMain(){
        this.$router.push("/main")
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
}
.top_left:hover {
  cursor: pointer;
}
.top_right {
  float:right;
  margin-right:40px;
  font-size: 30px;
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

.div_btn2{
  color:white;
  font-size: 24px;
  background-color:black;
  border: 1px solid rgba(150, 169, 183, 0.413);
  border-radius: 10px;
  margin: 10px;
  padding: 15px 34px;
  width: 200px;
  transition: 1.0s;
}
.div_btn2:hover {
  cursor: pointer;
  padding: 20px 48px;
  width:240px;
  box-shadow: 0 10px 16px 0 rgba(0,0,0,0.24),0 14px 36px 0 rgba(0,0,0,0.19);
}

.text_head {
  font-size:48px;
  font-weight:600;
  color:black;
}
.text_detail {
  margin-top:24px;
  font-size:20px;
  color:#6c7d8f;
}

.div_intro1 {
  display: flex;
  flex-direction: row;
  height: 600px;
  background: linear-gradient(to right, #66CCFF, #daf1fc); 
}
.div_intro2 {
  display: flex;
  flex-direction: row;
  height: 600px;
}

.intro_text {
  float:left;
  width:40%;
  margin: auto;
}
.intro_img {
  border-radius: 10px;
  float: right;
  width:40%;
  margin: auto;
  transition: 1.0s;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3), 0 12px 40px 0 rgba(0, 0, 0, 0.28);
  animation: resize_effect 1.5s;
}
.intro_img:hover {
  width: 45%;
}

.intro_img img {
  border-radius:10px;
  width:100%;
  display: block;
}

.info_img {
  width: 180px;
  float: right;
  border-radius:10px;
  margin:50px 80px 0 0;
}
.info_img img {
  border-radius:10px;
  width:100%;
  display: block;
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
}
.head_box img{
  width: 66px;
  height: 66px;
  border-radius: 20px;
}




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
  text-align:center;
  padding:8px;
  text-decoration:none;
}
a:hover,a:active{
  background-color:lightsteelblue;
}
</style>