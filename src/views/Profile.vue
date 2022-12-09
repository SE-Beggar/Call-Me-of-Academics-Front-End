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
            <p><b>个人简介：</b>{{user.description}}</p>
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
          </el-tab-pane>
          <el-tab-pane label="信息修改" name="edit">
            <el-form class="info_edit">
              <el-form-item label="用户名">
                <el-input class="infoInput" v-model="user.username"></el-input>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input type="textarea" class="infoInput" v-model="user.description"></el-input>
              </el-form-item>
              <el-form-item label="原密码">
                <el-input type="password" class="infoInput" v-model="user.password" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="新密码">
                <el-input type="password" class="infoInput" v-model="password1"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input type="password" class="infoInput" v-model="password2"></el-input>
              </el-form-item>
              <el-button class="el_btn" @click="save">保存修改</el-button>
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
          description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, tenetur asperiores. Laborum sint id iste deleniti, aut labore placeat ipsam, accusantium magni tempore dolores numquam repudiandae aliquam quam aperiam cumque.",
          password:"password",
        },
        password1:"",
        password2:"",
        panel:"info"
      }
    },
    created(){
      this.fillDefaultForm()
    },
    methods:{
      fillDefaultForm(){
        this.$axios({
                    method: 'get',
                    url: '/api/user/userspace/',
                    params: {
                    email:this.$store.state.email
                    }
                    })
                    .then(res => {          
                    switch (res.data.errno) {
                        case 0:
                          this.user=res.data.user;
                        break;
                    }
                    })
                    .catch(err => {
                    console.log(err);         
                    })
      },
      save(){
        if(this.password1==this.password2&&this.password1!=''){
          this.user.password=this.password1;
          this.password1='',
          this.password2=''
        }
        this.$axios({
                    method: 'post', 
                    url: '/api/user/userspace/',
                    data: qs.stringify({
                      user:this.user
                    })
                })
                .then(res => {
                    switch (res.data.errno) {
                    case 0:
                        this.$message.success("更改成功");
                        break;
                    }
                })
                .catch(err => {
                    console.log(err);  
                })
                this.$router.go(0);
      }
    }
  }
</script>