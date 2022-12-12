<template>
  <div>
    <TopBanner/>
    <div class="form_box">
      <h1 class="box_title">登录</h1>
      <el-form ref="form">
        <el-form-item>
          <el-input
            class="el_in"
            placeholder="请输入邮箱"
            v-model="email"
            prefix-icon="el-icon-postcard"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            class="el_in"
            placeholder="请输入密码"
            v-model="password"
            prefix-icon="el-icon-lock"
            show-password
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="el_btn1" @click="login"> 登录 </el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="el_btn2" @click="ret"> 返回 </el-button>
          <el-button class="el_btn2" @click="gotoRegister"> 注册 </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- <el-button class="ret" type="primary" @click="ret">返回</el-button>
    <form class="form1">
      <h1>登录</h1>
      <label>邮箱</label>
      <input v-model="email" placeholder="请输入邮箱" />
      <label>密码</label>
      <input v-model="password" placeholder="请输入密码" />
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="danger" @click="gotoRegister">注册</el-button>
    </form> -->
  </div>
</template>
<script>
import qs from "qs";
import TopBanner from '@/components/TopBanner.vue'
import BottomBanner from '@/components/BottomBanner.vue'
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    created() {
        if (this.$store.state.islogin) {
            this.$message.success("您已经登录，将跳转到主页");
            setTimeout(() => {
                this.$router.push("/");
            }, 1000);
        }
    },
    methods: {
        gotoRegister() {
            this.$router.push("/register");
        },
        ret() {
            this.$router.back();
        },
        login() {
            if (email == "" || password == "") {
                this.$message.warning("请填写完整信息");
                return;
            }
            this.$axios({
                method: "post",
                url: "/api/user/login/",
                data: qs.stringify({
                    email: this.email,
                    password: this.password,
                }),
            })
                .then((res) => {
                switch (res.data.errno) {
                    case 0:
                        this.$message.success("登录成功！");
                        this.$store.state.mailbox = res.data.email;
                        this.$store.state.username = res.data.username;
                        this.$store.state.islogin = true;
                        setTimeout(() => {
                            this.$router.push("/");
                        }, 1000);
                        break;
                    case 1001:
                        this.$message.error("密码错误!");
                        break;
                    case 1002:
                        this.$message.error("用户不存在!");
                        break;
                }
            })
                .catch((err) => {
                console.log(err);
            });
        },
    },
    components: { TopBanner }
};
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
  width: 42%;
  font-size:18px;
  color:white;
  background-color: #66CCFF;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  transition: 0.2s;
}
.el_btn2:hover {
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25),0 4px 8px 0 rgba(0,0,0,0.20);
}

/* form.form1 {
  width: 300px;
  height: 300px;
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
.ret {
  float: left;
} */
</style>