<template>
  <div>
    <TopBanner/>
    <div class="user_box">
      <div class="inner_box">
        <div class="head_box">
          <img src="../assets/image/heads/1.png" class="head_pic" v-if="user.sex=='男'">
          <img src="../assets/image/heads/2.png" class="head_pic" v-if="user.sex=='女'">
          <img src="../assets/image/heads/3.png" class="head_pic" v-if="user.sex=='秘密'">
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
          <el-tab-pane style="min-height:600px;" label="个人信息" name="info">
            <p class="info_entry"><b>用户名：</b>{{user.username}}</p>
            <p class="info_entry"><b>邮箱：</b>{{user.email}}</p>
            <p class="info_entry"><b>性别：</b>{{user.sex}}</p>           
          </el-tab-pane>
          <el-tab-pane style="min-height:600px;" label="信息修改" name="edit">
            <el-form class="info_edit">
              <el-form-item label="用户名">
                <el-input class="infoInput" v-model="user.username"></el-input>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input type="textarea" class="infoInput" v-model="user.description"></el-input>
              </el-form-item>
              <el-form-item label="性别">
                <el-select class="infoInput" :placeholder="sex" v-model="user.sex" style="float:left;">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                    <el-option label="秘密" value="秘密"></el-option>
              </el-select>
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
          <el-tab-pane style="min-height:600px;" label="管理认证" name="admin" v-if="isadmin==1">
            <el-table :data="lists" style="width: 100%">
                <el-table-column type="index"> </el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="scholarname" label="学者名">
                    <template slot-scope="scope">
                        <el-link @click="authorDetail(scope.row_number)">
                            {{scope.row.scholarname}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" @click="display(scope.row.id)">查看</el-button>
                        <el-button type="primary" @click="accept(scope.row.id)">同意</el-button>
                        <el-button type="danger" @click="refuse(scope.row.id)">拒绝</el-button> -->
                        <button class="el_btn2 btnblue" @click="display(scope.row.id)">查看</button>
                        <button class="el_btn2 btngreen" @click="accept(scope.row.id)">同意</button>
                        <button class="el_btn2 btnred" @click="refuse(scope.row.id)">拒绝</button>
                    </template>
                </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <el-dialog :visible.sync="displayinfo" width="30%" :before-close="handleClose">
      <div>
        <h2>申请者信息</h2>
        <p class="desc"><b>用户名：</b>{{lists[number].username}}</p>
        <p class="desc"><b>学者名：</b>{{lists[number].scholarname}}</p>
        <p class="desc"><b>用户邮箱：</b>{{lists[number].email}}</p>
        <p class="desc"><b>认证信息：</b>{{lists[number].description}}</p>
        <el-link class="desc"><b style="color: aqua;" @click="download">附件</b></el-link>
        <div style="margin-top:20px;">
          <button class="el_btn1" @click="displayinfo=false">查看完毕</button>
        </div>
      </div>
    </el-dialog>
    <BottomBanner/>
  </div>
</template>

<style scoped>
.user_box{
  width:100%;
}
.inner_box{
  width: 72%;
  margin: auto;
}
.inner_box2{
  width: 60%;
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

.desc{
  font-size: 18px;
  line-height: 60px;
  text-align: left;
  /* font-weight: 700; */
}
.el_btn1 {
  width: 40%;
  font-size:18px;
  color:white;
  background-color: #66CCFF;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 2px 10px;
  margin: 10px 20px;
  transition: 0.2s;
}
.el_btn1:hover {
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25),0 4px 8px 0 rgba(0,0,0,0.20);
}
.el_btn2 {
  width: 80px;
  font-size:16px;
  color:white;
  background-color: #66CCFF;
  border-radius:10px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 5px 10px;
  margin: 5px;
  transition: 0.2s;
}
.el_btn2:hover {
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25),0 4px 8px 0 rgba(0,0,0,0.20);
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
.btngreen{
  background-color: #99CC66;
}
</style>

<script>
import BottomBanner from "@/components/BottomBanner.vue";
import TopBanner from "@/components/TopBanner.vue";
import qs from "qs";
  export default{
    components: { TopBanner, BottomBanner },
    data() {
        return {
            displayinfo:false,
            user: {
                username: "Lorem ipsum",
                email: "lorem@ipsum.com",
                sex:"男",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, tenetur asperiores. Laborum sint id iste deleniti, aut labore placeat ipsam, accusantium magni tempore dolores numquam repudiandae aliquam quam aperiam cumque.",
                password: "password",
            },
            lists: [{
                    id: 1,
                    email: 1,
                    scholarid: 1,
                    username: "用户名",
                    scholarname: "学者名",
                    description:"1111",
                    url:"/baidu.com"
                }
            ],
            password1: "",
            password2: "",
            panel: "info",
            isadmin: 1,
            number:0
        };
    },
    created() {
        this.fillDefaultForm();
        if (this.isadmin == 1) {
            this.$axios({
                method: "get",
                url: "/api/admin/identify/"
            })
                .then(res => {
                switch (res.data.errno) {
                    case 0:
                        this.lists = res.data.lists;
                        break;
                }
            })
                .catch(err => {
                console.log(err);
            });
        }
    },
    methods: {
        fillDefaultForm() {
            this.$axios({
                method: "get",
                url: "/api/user/userspace/",
                params: {
                    email: this.$store.state.email
                }
            })
                .then(res => {
                switch (res.data.errno) {
                    case 0:
                        this.user = res.data.user;
                        this.isadmin = res.data.isadmin;
                        break;
                }
            })
                .catch(err => {
                console.log(err);
            });
        },
        download(){
        let url = "192.168.124.7//" + this.lists[number].url;
      const downloadRes = async () => {
        let response = await fetch(url);
        let blob = await response.blob();
        let objectUrl = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = objectUrl;
        a.download = "附件";
        a.click();
        a.remove();
      };
      downloadRes();
        },
        save() {
            if(this.password1!=this.password2){
              this.$message.error("两次密码须一致")
              return;
            }
            if (this.password1 == this.password2 && this.password1 != "") {
                this.user.password = this.password1;
                this.password1 = "",
                this.password2 = "";
            }
            else{
              this.user.password="";
            }
            this.$axios({
                method: "post",
                url: "/api/user/userspace/",
                data: qs.stringify({
                    user: this.user
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
            });
            this.$router.go(0);
        },
        display(id){
          //this.$message.success(id)
          this.number=id-1;
          this.displayinfo=true
        },
        accept(id) {
            this.$axios({
                method: "post",
                url: "/api/admin/identify/",
                data: qs.stringify({
                    listid: id,
                    op: 0
                })
            })
                .then(res => {
                switch (res.data.errno) {
                    case 0:
                        this.$message.success("操作成功");
                        break;
                    case 1:
                        this.$message.error("该学者已被他人认证");
                        break;
                }
            })
                .catch(err => {
                console.log(err);
            });
            this.$router.go(0);
        },
        authorDetail(id){
          this.$store.state.authorID=id;
          this.$router.push('/scholar')
        },
        refuse(id) {
            this.$axios({
                method: "post",
                url: "/api/admin/identify/",
                data: qs.stringify({
                    listid: id,
                    op: 1
                })
            })
                .then(res => {
                switch (res.data.errno) {
                    case 0:
                        this.$message.success("操作成功");
                        break;
                }
            })
                .catch(err => {
                console.log(err);
            });
            this.$router.go(0);
        }
    }
}
</script>