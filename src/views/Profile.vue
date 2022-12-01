<template>
  <div>
    <div class="user_box">
      <div class="inner_box">
        <div class="head_box">
          <img src="../assets/image/style_img/default_head.png" class="head_pic">
        </div>
        <div class="name_box">
          <div class="name">
            <p>{{user.username}}</p>
          </div>
          <div class="intro">
            <p><b>个人简介：</b>{{user.profile}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="user_info">
      <div class="inner_box2">
        <el-tabs v-model="panel" @tab-click="">
          <el-tab-pane label="个人信息" name="info">
            <p class="info_entry"><b>用户名：</b>{{user.username}}</p>
            <p class="info_entry"><b>邮箱：</b>{{user.email}}</p>
            <p class="info_entry"><b>身份：</b>{{user.identity}}</p>
          </el-tab-pane>
          <el-tab-pane label="信息修改" name="edit">
            <el-form class="info_edit">
              <el-form-item label="用户名">
                <el-input class="infoInput" v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input type="textarea" class="infoInput" v-model="form.profile"></el-input>
              </el-form-item>
              <el-form-item label="原密码">
                <el-input type="password" class="infoInput" v-model="form.password0"></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input type="password" class="infoInput" v-model="form.password1"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input type="password" class="infoInput" v-model="form.password2"></el-input>
              </el-form-item>
              <el-button class="el_btn" @click="">保存修改</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user_box{
  width:100%;
}
.inner_box{
  width: 64%;
  margin: auto;
}
.inner_box2{
  width: 48%;
  margin: auto;
}
.head_box{
  display: inline-block;
  vertical-align: top;
  width: 160px;
  height: 160px;
  border: 2px solid white;
  border-radius: 80px;
  margin: 60px 10px 20px;
}
.head_pic{
  width:100%;
  border-radius: 80px;
}
.name_box{
  display: inline-block;
  vertical-align: top;
  height: 160px;
  width: 480px;
  margin: 60px 10px 20px;
}
.name{
  height: 60px;
}
.name>p{
  font-size: 42px;
  font-weight: 700;
  text-align: left;
}
.intro{
  height: 100px;
  overflow: auto;
}
.intro>p{
  text-align: left;
}
.user_info{
  width: 100%;
}
.info_entry{
  text-align: left;
  margin: 20px 40px;
  line-height: 32px;
}
.info_edit{
  margin: 0 40px;
}
.el_btn{
  width: 64%;
  font-size:18px;
  color:black;
  background-color: white;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  margin: 10px;
  transition: 0.2s;
}
.el_btn:hover {
  width: 72%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.25),0 4px 8px 0 rgba(0,0,0,0.20);
}
.el_btn:active {
  background-color: #f7f7f7;
}
</style>

<script>
  import qs from "qs";
  export default{
    data(){
      return{
        user:{
          username:"Lorem ipsum",
          email:"lorem@ipsum.com",
          profile:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, tenetur asperiores. Laborum sint id iste deleniti, aut labore placeat ipsam, accusantium magni tempore dolores numquam repudiandae aliquam quam aperiam cumque.",
          password:"password",
          identity:"普通用户"
        },
        form:{
          username:"",
          profile:"",
          password0:"",
          password1:"",
          password2:""
        },
        panel:"info"
      }
    },
    created(){
      this.fillDefaultForm()
    },
    methods:{
      fillDefaultForm(){
        this.form.username=this.user.username
        this.form.profile=this.user.profile
      }
    }
  }
</script>