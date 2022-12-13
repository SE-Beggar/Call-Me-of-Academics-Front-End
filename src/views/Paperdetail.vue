<template>
  <div>
    <TopBanner />
    <div class="paper">
      <button class="el_btn3" @click="ret" style="float:left;">返回</button>
      <h1>{{ paper.title }}</h1>
      <div class="year">
        <b style="font-size: 18px;">时间 </b>
        <el-tag effect="plain" type="info"
          style="font-size: 18px;color: black;">
          {{ paper.year }}
        </el-tag>
      </div>
      <div class="content">
        <h2>摘要</h2>
        <p>{{ paper.abstract }}</p>
        <h2>关键词</h2>
        <div style="text-align: left;">
          <el-tag v-for="(ref,index) in paper.keywords" 
            :key="index" effect="plain"
            style="margin: 0 10px;font-size: 18px;">
            {{ ref }}
          </el-tag>
        </div>
        <h2>作者</h2>
        <div style="text-align:left;">
          <el-tag v-for="(au,index) in paper.authors" 
            :key="index" effect="plain"
            style="margin: 0 10px;font-size: 18px;">
            {{ au.name }}
          </el-tag>
        </div>
        <p class="s_entry">
          <b>出版社：</b>{{ paper.publisher }}
        </p>
        <p class="s_entry">
          <b>文献类型：</b>{{ paper.doc_type }}
        </p>
        <p class="s_entry">
          <b>语言：</b>{{ paper.lang }}
        </p>
      </div>
      <button class="el_btn1 btnblue" @click="download" v-if="paper.pdf!=''">下载</button>
      <button class="el_btn1 btngreen" @click="preview" v-if="paper.pdf!=''">预览</button>
      <h2>外部链接</h2>
      <p v-for="item in paper.url">
       <el-link :href="item">{{item}}</el-link>
      </p>
    </div>
    <BottomBanner />
  </div>
</template>
<style scoped>
.paper {
  padding: 40px 80px;
  width: 60%;
  margin: auto;
  min-height: 800px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 6px 9px 0 rgba(0, 0, 0, 0.24),
    0 8px 0px 0 rgba(0, 0, 0, 0.19);
}
.year {
  margin: 25px;
}
h1{
  margin: 30px;
}
h2{
  text-align: left;
  margin: 20px;
}
p{
  text-align: left;
  text-indent: 40px;
  font-size: 18px;
}
.s_entry{
  text-align: left;
  text-indent: 20px;
  font-size: 18px;
  margin: 32px 0;
}
.s_entry b{
  font-size: 21px;
}
.el_btn1 {
  width: 18%;
  font-size:18px;
  color:white;
  border-radius:10px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 5px;
  margin: 20px;
  transition: 0.2s;
}
.el_btn1:hover {
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25),0 4px 8px 0 rgba(0,0,0,0.20);
}
.el_btn2 {
  width: 100px;
  font-size:16px;
  color:white;
  border-radius:10px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 5px;
  transition: 0.2s;
}
.el_btn2:hover {
  box-shadow: 0 2px 3px 0 rgba(0,0,0,0.25),0 4px 8px 0 rgba(0,0,0,0.20);
}
.el_btn3 {
  width: 100px;
  font-size:18px;
  color:white;
  background-color: #FF6666;
  border-radius:10px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  margin: 20px;
  transition: 0.2s;
}
.el_btn3:hover {
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
import BottomBanner from "@/components/BottomBanner.vue";
import TopBanner from "@/components/TopBanner.vue";
import qs from "qs";
export default {
  data() {
    return {
      paper: {
        title: "最强聊天机器人ChatGPT面世，AI又来抢饭碗了？",
        abstract: "近日，OpenAI发布了一个全新的聊天机器人模型ChatGPT，它能够模拟人类的语言行为，与用户进行自然交互。 在推特网友们晒出的截图中，ChatGPT不仅能流畅地与人对话，还能舞文弄墨、编写代码……创作天马行空的内容也不在话下，它几乎无所不能。由于该测试目前免费，一经推出?",
        keywords: ["聊天机器人", "人工智能", "ChatGPT", "OpenAI"],
        doc_type: "科技报道",
        authors: [{ id: 1, name: "王兴德" }, { id: 2, name: "刘霞" }, { id: 2, name: "欧阳小白" }],
        year: "2022-12-13",
        pdf: "//www.baidu.com",
        lang: "CN",
        publisher: "元宇宙周刊",
        url:["http://doi.acm.org/10.1145/1135777.1135863","http://doi.acm.org/10.1145/1135777.1135863"]
      },
    };
  },
  created() {
    this.$axios({
      method: "get",
      url: "/api/paper/paperdetails/",
      params: {
        paperid: this.$store.state.paperid
      }
    })
      .then(res => {
        switch (res.data.errno) {
          case 0:
            this.paper = res.data.paper;
            break;
          case 3001:
            this.$message.error("论文不存在");
            break;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    ret() {
      this.$router.back();
    },
    download() {
      let url = "https:" + this.paper.pdf;
      //let url = "https://dl.winmoes.com/wp-content/uploads/2022/08/4448412e3b83cf8.png?imageMogr2/crop/626x"
      const downloadRes = async () => {
        let response = await fetch(url);
        let blob = await response.blob();
        let objectUrl = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = objectUrl;
        a.download = this.paper.title;
        a.click();
        a.remove();
      };
      downloadRes();
    },
    preview() {
      let hre = "https:" + this.paper.pdf;
      window.open(hre, "_blank");
    },
    authorDetail(authorID) {
      this.$store.state.authorID = authorID;
      this.$router.push("/scholar");
    },
    paperDetail(paperID) {
      this.$store.state.paperid = paperID;
      this.$router.go(0);
    },
  },
  components: { TopBanner, BottomBanner }
}
</script>