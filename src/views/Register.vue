<template>
    <div>
        <form class="form2">
            <el-button type="primary" class="retl" @click="gotologin">返回</el-button>
            <br>
            <h1>
                 注册
            </h1>
            <label>用户名</label>
            <input v-model="username" placeholder="请输入用户名">
            <label>邮箱</label>
            <input v-model="email" placeholder="请输入邮箱">
            <label>验证码</label>
            <el-button type="info" slot="append" @click="send">发送验证码</el-button>   
            <input v-model="code" placeholder="请输入验证码">
            <label>密码</label>
            <input v-model="password1" placeholder="请输入密码">
            <label>确认密码</label>
            <input v-model="password2" placeholder="请再次输入密码">
            <el-button type="primary" @click="Register">注册</el-button>
        </form>
    </div>
</template>
<script>
    import qs from "qs";
    export default{
        data(){
            return{
                username:"",
                email:"",
                code:"",
                password1:"",
                password2:""
            }
        },
        methods:{
            gotologin(){
                this.$router.push('/login');
            },
            send(){
                if (this.email=="") {
                    this.$message.error("邮箱不能为空");
                    return;
                }
                this.$axios({
                    method: 'get',
                    url: '/api/user/register/',
                    params: {
                    email: this.email
                    }
                    })
                    .then(res => {              /* res 是 response 的缩写 */
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
                    console.log(err);         /* 若出现异常则在终端输出相关信息 */
                    })
            },
            Register(){
                if(email==""||username==""||password1==""||password2==""){
                    this.$message.warning("请填写完整信息");
                    return;
                }
                if(password1!=password2){
                    this.$message.warning("两次输入的密码应一致");
                    return;
                }
                this.$axios({
                    method: 'post', 
                    url: '/api/user/register/',
                    data: qs.stringify({
                    username:this.username,
                    email: this.email,
                    code:this.code,
                    password: this.password1
                    })
                })
                .then(res => {
                    switch (res.data.errno) {
                    case 0:
                        this.$message.success("注册成功");
                        setTimeout(() => {
                        this.$router.push('/login');
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
                })
            }
        }
    }
</script>
<style>
    form.form2{
        width:300px;
        height:600px;
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px 100px;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
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
    label{
        float:left;
    }
    .retl{
        position: absolute;
        left:20px;
    }
</style>