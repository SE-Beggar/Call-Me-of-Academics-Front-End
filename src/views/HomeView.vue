<template>
  <div>
    <TopBanner/>

    <div class="home">
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
      <a href="/collection">期刊页面</a>
      <a href="/testpage">样式测试</a>
    </div>

    <div>
        <div class="text_head">
          免费的在线学术成果分享平台
        </div>
        <div class="text_detail">
          面向广大科研从业人员的学术成果分享平台，为认证通过的科研从业人员建立个人门户系统，分类管理和维护个人学术成果
        </div>
    </div>

    <div class="div_btn2 btnblack" @click="gotoMain"
      style="margin:auto;margin-top:40px;margin-bottom:60px;">
      开始使用
    </div>

    <div class="div_intro1">
      <div class="intro_img">
        <img src="../assets/image/pic1.png">
      </div>
      <div class="intro_text">
        <div class="text_head">
          无需账号，但你可能想有一个
        </div>
        <div class="text_detail">
          使用本站绝大多数功能内容都无需账号，如果您想有账号或有更专业的需求可以注册
        </div>
        <div class="div_btn2" @click="gotoRegister"
          style="margin:auto;margin-top:40px;margin-bottom:60px;">
          注册账号
        </div>
      </div>
    </div>

    <div class="div_intro2">
      <div class="intro_text">
        <div class="text_head">
          沉浸于学术的海洋
        </div>
        <div class="text_detail">
          首页独家推荐，词云系统，荐你想见
        </div>
        <div class="div_btn2 btnblue" @click="gotoMain"
          style="margin:auto;margin-top:40px;margin-bottom:60px;">
          进入主页
        </div>
      </div>
      <div class="intro_img">
        <img src="../assets/image/pic2.png">
      </div>
    </div>

    <div class="div_intro1">
      <div class="intro_img">
        <img src="../assets/image/pic3.png">
      </div>
      <div class="intro_text">
        <div class="text_head">
          轻松查找论文
        </div>
        <div class="text_detail">
          支持多种高级搜索方式，多种分类和过滤手段，助力于论文查找
        </div>
        <div class="div_btn2" @click="gotoPaper"
          style="margin:auto;margin-top:40px;margin-bottom:60px;">
          查找论文
        </div>
      </div>
    </div>

    <div class="div_intro2">
      <div class="intro_text">
        <div class="text_head">
          轻松查找学者
        </div>
        <div class="text_detail">
          多种方式查找学者，学者设立门户，展示信息更加全面
        </div>
        <div class="div_btn2 btnblue" @click="gotoScholar"
          style="margin:auto;margin-top:40px;margin-bottom:60px;">
          查找学者
        </div>
      </div>
      <div class="intro_img">
        <img src="../assets/image/pic4.png">
      </div>
    </div>

    <BottomBanner/>
  </div>
</template>

<script>
// // @ is an alias to /src
import TopBanner from '@/components/TopBanner.vue'
import BottomBanner from '@/components/BottomBanner.vue'

export default {
  name: 'HomeView',
  components: {
    TopBanner,
    BottomBanner
  },
  methods: {
    gotoRegister(){
        this.$router.push("/register")
    },
    gotoMain(){
        this.$router.push("/main")
    },
    gotoPaper(){
        this.$store.state.type=1;
        this.$router.push("/searchpaper")
    },
    gotoScholar(){
        this.$router.push("/searchAuthor")
    }
  }
}
</script>
<style scoped>
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
.btnblack{
  background-color:black;
}
.btnblue{
  background-color:#66CCFF;
}
.btnred{
  background-color:#FF6666;
}
.btnorange{
  background-color: #FF9966;
}
.div_btn1:hover {
  cursor: pointer;
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.24),0 6px 18px 0 rgba(0,0,0,0.19);
}
.div_btn2{
  color:white;
  font-size: 24px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  border-radius: 10px;
  margin: 10px;
  padding: 15px 34px;
  width: 200px;
  transition: 1.0s;
}
.div_btn2:hover {
  cursor: pointer;
  padding: 18px 38px;
  width:220px;
  box-shadow: 0 5px 8px 0 rgba(0,0,0,0.24),0 7px 18px 0 rgba(0,0,0,0.19);
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
  margin:auto;
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