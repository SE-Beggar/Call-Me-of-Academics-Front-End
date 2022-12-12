<template>
  <div>
    <TopBanner/>
    <div class="form_box">
      <h1 class="box_title">注册</h1>
      <el-form ref="form">
        <el-form-item>
          <el-input class="el_in" placeholder="请输入用户名" v-model="username"
            prefix-icon="el-icon-user" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="el_in" placeholder="请输入邮箱" v-model="email"
            prefix-icon="el-icon-postcard" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="el_in" placeholder="请输入验证码" v-model="code"
            prefix-icon="el-icon-s-check" clearable style="float:left;width:60%;">
          </el-input>
          <el-button class="el_btn2" @click="send">发送</el-button>
        </el-form-item>
        <el-form-item>
          <el-input class="el_in" placeholder="请输入密码" v-model="password1"
            prefix-icon="el-icon-lock" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="el_in" placeholder="请确认密码" v-model="password2"
            prefix-icon="el-icon-lock" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="el_btn1" @click="Register"> 注册 </el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="el_btn3" @click="ret"> 返回 </el-button>
          <el-button class="el_btn3" @click="gotologin"> 登录 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <form class="form2">
      <el-button type="primary" class="retl" @click="gotologin">返回</el-button>
      <br />
      <h1>注册</h1>
      <label>用户名</label>
      <input v-model="username" placeholder="请输入用户名" />
      <label>邮箱</label>
      <input v-model="email" placeholder="请输入邮箱" />
      <label>验证码</label>
      <el-button type="info" class="code" @click="send">发送验证码</el-button>
      <input v-model="code" placeholder="请输入验证码" />
      <label>密码</label>
      <input v-model="password1" placeholder="请输入密码" />
      <label>确认密码</label>
      <input v-model="password2" placeholder="请再次输入密码" />
      <el-button type="primary" @click="Register">注册</el-button>
    </form> -->
  </div>
</template>
<script>
import qs from "qs";
import TopBanner from '@/components/TopBanner.vue'
import BottomBanner from '@/components/BottomBanner.vue'
export default {
    components: { TopBanner, BottomBanner },
    data() {
        return {
            username: "",
            email: "",
            code: "",
            password1: "",
            password2: ""
        };
    },
    methods: {
        ret() {
            this.$router.back();
        },
        gotologin() {
            this.$router.push("/login");
        },
        send() {
            if (this.email == "") {
                this.$message.error("邮箱不能为空");
                return;
            }
            this.$axios({
                method: "get",
                url: "/api/user/register/",
                params: {
                    email: this.email
                }
            })
                .then(res => {
                switch (res.data.errno) {
                    case 0:
                        this.$message.success("发送成功");
                        break;
                    case 2001:
                        this.$message.error("该邮箱已注册!");
                        break;
                    case 2002:
                        this.$message.error("请求方式错误!");
                        break;
                }
            })
                .catch(err => {
                console.log(err);
            });
        },
        Register() {
            if (email == "" || username == "" || password1 == "" || password2 == "") {
                this.$message.warning("请填写完整信息");
                return;
            }
            if (password1 != password2) {
                this.$message.warning("两次输入的密码应一致");
                return;
            }
            this.$axios({
                method: "post",
                url: "/api/user/register/",
                data: qs.stringify({
                    username: this.username,
                    email: this.email,
                    code: this.code,
                    password: this.password1
                })
            })
                .then(res => {
                switch (res.data.errno) {
                    case 0:
                        this.$message.success("注册成功");
                        setTimeout(() => {
                            this.$router.push("/login");
                        }, 1000);
                        break;
                    case 1001:
                        this.$message.error("该邮箱已注册!");
                        break;
                    case 1002:
                        this.$message.error("验证码错误");
                        break;
                }
            })
                .catch(err => {
                console.log(err);
            });
        }
    }
}
</script>
<style scoped>
.form_box {
  width: 24%;
  height: auto;
  padding: 10px 25px;
  margin: auto;
  border-radius: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 1s;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 12px 18px 0 rgba(0, 0, 0, 0.24),
    0 16px 40px 0 rgba(0, 0, 0, 0.19);
  animation: appear_effect 1.5s;
}
.form_box:hover {
  width: 26%;
  padding: 20px 40px;
}
.box_title{
    margin: 20px;
}
.el_in {
  font-size: 16px;
}
.el_btn1 {
  width: 86%;
  font-size:18px;
  color:white;
  background-color: #66CCFF;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  transition: 0.2s;
}
.el_btn1:hover {
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25),0 4px 8px 0 rgba(0,0,0,0.20);
}
.el_btn2 {
  width: 32%;
  font-size:18px;
  color:white;
  background-color: #66CCFF;
  border-radius:10px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  transition: 0.2s;
}
.el_btn2:hover {
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25),0 4px 8px 0 rgba(0,0,0,0.20);
}
.el_btn3 {
  width: 42%;
  font-size:18px;
  color:white;
  background-color: #66CCFF;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  transition: 0.2s;
}
.el_btn3:hover {
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25),0 4px 8px 0 rgba(0,0,0,0.20);
}


/* form.form2 {
  width: 300px;
  height: 600px;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
input {
  width: 100%;
  padding: 12px 10px;
  margin: 12px auto;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}
label {
  float: left;
}
.retl {
  position: absolute;
  left: 20px;
}
.code {
  float: right;
} */
</style>