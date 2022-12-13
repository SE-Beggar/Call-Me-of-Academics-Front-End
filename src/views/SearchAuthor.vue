<template>
    <div>
        <TopBanner/>
        <div id="search">
            <div v-if="this.AdvancedSearch==1">
              <AdvancedSearchBox/>
            </div>
            <div id="normalSearch">
                <el-input placeholder="请输入内容" v-model="input">
                    <el-select v-model="select" slot="prepend" placeholder="论文检索">
                        <el-option label="论文检索" value="1"></el-option>
                        <el-option label="学者检索" value="2"></el-option>
                        <el-option label="期刊检索" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" v-on:click="search">搜索</el-button>
                </el-input>
            </div>
            <div id="advancedSearch">
                <el-link @click="toAdvanced">使用高级检索</el-link>
            </div>
        </div>
        <div id="searchResult" style="min-height: 600px;">
            <div v-for="i in scholars.length" :key=i>
                <el-card class="authorCard">
                    <div slot="header">
                        <span>{{scholars[i-1].name}}</span>
                        <el-button class="authorButton" @click="toDetail(scholars[i-1].id)">查看详情</el-button>
                    </div>
                    <div class="text">
                        <div style="float:left">发表论文数：{{scholars[i-1].n_pubs}}</div>
                    </div>
                    <div class="text">
                        <div style="float:left">职位：{{scholars[i-1].position}}</div>
                    </div>
                    <div class="text">
                        <div style="float:left">论文总引用量：{{scholars[i-1].n_citation}}</div>
                    </div>
                    <div v-if="scholars[i-1].isidentify==0">
                        <!-- <el-button type="primary" @click="identify(scholars[i-1].id)">认证该学者</el-button> -->
                        <button class="el_btn btnblue" @click="identify(scholars[i-1].id)"
                         style="width:150px;">认证该学者</button>
                    </div>
                </el-card>
            </div>
        </div>

        <el-dialog :visible.sync="uploadinfo" width="30%" :before-close="handleClose">
          <div>
            <p class="desc">请输入认证信息：</p>
            <el-input type="textarea" class="infoInput" v-model="description"></el-input>
            <div style="height: 20px;"></div>
            <p class="desc">请上传认证材料：</p>
            <el-upload ref="upload" style="display: inline" drag :headers="headers"
              action="_____" :on-preview="handlePreview"
              :http-request="handleUploadForm" :auto-upload="false" :on-remove="handleRemove"
              :before-remove="beforeRemove" multiple>
              <el-link icon="el-icon-paperclip" type="primary">添加需要上传的文件</el-link>
            </el-upload>
            <div style="margin-top:20px;">
              <button class="el_btn btnblue" @click="upload()">上传</button>
              <button class="el_btn btnred" @click="uploadinfo = false">取消</button>
              <!-- <el-button type="primary" @click="upload()">上传</el-button>
              <el-button type="primary" @click="file2InfoVisible = false">确 定</el-button> -->
            </div>
          </div>
        </el-dialog>

        <div style="height:100px;width:100%;float:left;"></div>
        <BottomBanner/>
    </div>
</template>

<style>
#search {
    margin-top: 40px;
    margin-left: 10%;
    width: 80%;
    float: left;
}

#normalSearch {
    width: 90%;
    float: left;
}

#advancedSearch {
    padding-top: 10px;
    width: 10%;
    float: right;
}

.el-select .el-input {
    width: 130px;
}

#searchResult {
    margin-top: 20px;
    margin-left: 10%;
    width: 80%;
    float: left;
}

.authorCard {
    width: 40%;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 5%;
    float: left;
}

.authorButton {
    float: right;
}

.text {
    font-size: 15px;
    margin-bottom: 18px;
    width: 50%;
    float: left;
}

.desc{
  font-size: 18px;
  line-height: 60px;
  /* font-weight: 700; */
  float: left;
}
.el_btn {
  width: 40%;
  font-size:18px;
  color:white;
  border-radius:20px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 2px 10px;
  margin: 10px 20px;
  transition: 0.2s;
}
.el_btn:hover {
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25),0 4px 8px 0 rgba(0,0,0,0.20);
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
import AdvancedSearchBox from "@/components/AdvancedSearchBox.vue";
import TopBanner from "@/components/TopBanner.vue";
import BottomBanner from "@/components/BottomBanner.vue";
import qs from "qs";
export default {
    components: { TopBanner, BottomBanner, AdvancedSearchBox },
    data() {
        return {
            AdvancedSearch:0,
            //与上传信息相关的data
            uploadinfo:false,
            description:"",

            input: "",
            select: "",
            scholars: [{
                    id: 1,
                    name: "名字",
                    isidentify: 1,
                    position: "北航",
                    n_pubs: 10,
                    n_citation: 20,
                }, {
                    id: 1,
                    name: "名字",
                    isidentify: 0,
                    position: "北航",
                    n_pubs: 10,
                    n_citation: 20
                }, {
                    id: 1,
                    name: "名字",
                    isidentify: 0,
                    position: "北航",
                    n_pubs: 10,
                    n_citation: 20
                }, {
                    id: 1,
                    name: "名字",
                    isidentify: 1,
                    position: "北航",
                    n_pubs: 10,
                    n_citation: 20
                }]
        };
    },
    created() {
        this.$axios({
            method: "post",
            url: "/api/paper/searchscholar/",
            data: qs.stringify({
                scholar: this.$store.state.searchcontent
            })
        })
            .then(res => {
            switch (res.data.errno) {
                case 0:
                    this.scholars = res.data.scholars;
                    break;
            }
        })
            .catch(err => {
            console.log(err);
        });
    },
    methods: {
      //从墨书项目的Draw.vue移植过来的，需要改！！！
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${file.name}？`);
        },
        handleUploadForm(param) {
          let thisInfo = this
          let formData = new FormData()
          // 在formData中加入我们需要的参数
          formData.append('file', param.file)
          formData.append('projectid', this.$store.state.projectid)
          formData.append('email', this.$store.state.mailbox)
          formData.append('type', 1)
          // 向后端发送数据
          thisInfo.$axios.post('/api/project/upload/', formData).then(res => {              /* res 是 response 的缩写 */
            switch (res.data.errno) {
              case 0:
                this.$message.success("上传成功!")
                break;
              case 11001:
                this.$message.error("上传失败!");
                break;
            }
          })
              .catch(err => {
                console.log(err);         /* 若出现异常则在终端输出相关信息 */
              })
          thisInfo.formFileList = []
          thisInfo.uploadFormFileList = []
        },
        upload() {
          this.$refs.upload.submit();
        }, 


        search() {
            if (this.select == 2) {
                //搜学者 关键词this.input
                this.$store.state.searchcontent = this.input;
                this.$router.go(0);
            }
            else if (this.select == 3) {
                this.$store.state.searchcontent = this.input;
                this.$router.push("/searchvenue");
            }
            else {
                this.$store.state.type = 1;
                this.$store.state.searchcontent = this.input;
                this.$router.push("/searchPaper");
            }
        },
        toAdvanced() {
            this.AdvancedSearch=1-this.AdvancedSearch
            //前往高级检索页面
            // this.$router.push("/advancedsearch");
        },
        toDetail(id) {
            this.$store.state.authorID = id;
            this.$router.push("/");
            //学者详情页面路由
        },
        identify(id) {
            this.uploadinfo=true
            this.$axios({
                method: "post",
                url: "/api/user/identify/",
                data: qs.stringify({
                    scholarid: id,
                    email: this.$store.state.email
                })
            })
                .then(res => {
                switch (res.data.errno) {
                    case 0:
                        this.$message.success("操作成功,等待管理员核验");
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