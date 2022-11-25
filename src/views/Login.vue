<template>
    <div>
        <form class="form1">
            <h1>
                登录
            </h1>
            <label>邮箱</label>
            <input v-model="email" placeholder="请输入邮箱">
            <label>密码</label>
            <input v-model="password" placeholder="请输入密码">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="danger" @click="gotoRegister">注册</el-button>
        </form>
    </div>
</template>
<script>
    import qs from "qs";
    export default{
        data(){
            return{
                email:"",
                password:""
            }
        },
        created(){
            if(this.$store.state.islogin){
                this.$message.success("您已经登录，将跳转到主页")
                setTimeout(() => {
                    this.$router.push('/')
                }, 1000)
            }
        },
        methods:{
            gotoRegister(){
                this.$router.push('/register');
            },
            login(){
                if(email==""||password==""){
                    this.$message.warning("请填写完整信息");
                    return;
                }
                this.$axios({
                    method: 'post', 
                    url: '/api/user/login/',
                    data: qs.stringify({
                    email: this.email,
                    password: this.password
                    })
                })
                .then(res => {
                    switch (res.data.errno) {
                    case 0:
                        this.$message.success("登录成功！");
                        this.$store.state.mailbox = res.data.email;
                        this.$store.state.username = res.data.username;
                        this.$store.state.islogin=true;
                        setTimeout(() => {
                        this.$router.push('/');
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
                .catch(err => {
                    console.log(err);  
                })
            }
        }
    }
</script>
<style>
    form.form1{
        width:300px;
        height:300px;
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
</style>