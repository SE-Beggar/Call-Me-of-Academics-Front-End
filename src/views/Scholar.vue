<template>
  <div>
    <div class="user_box">
      <div class="inner_box">
        <div class="head_box">
          <img src="../assets/image/style_img/default_head.png" class="head_pic">
        </div>
        <div class="name_box">
          <div class="name">
            <p>{{ scholar.username }}</p>
          </div>
          <div class="intro">
            <p><b>学者简介：</b>{{ scholar.scholar_info }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="user_info">
      <div class="inner_box2">
        <el-tabs v-model="panel" @tab-click="">
          <el-tab-pane label="学者信息" name="info">

          </el-tab-pane>
          <el-tab-pane label="信息统计" name="statistics">

          </el-tab-pane>
          <el-tab-pane label="信息分析" name="analysis">

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
</style>

<script>
import qs from "qs";
export default{
  data(){
    return{
      scholar:{
        username:"谭火彬",
        email:"lorem@ipsum.com",
        scholar_info:"谭火彬，男，博士，副教授，研究生导师，现任职于北京航空航天大学。教学方面，承担了北航学院和软件学院多门程序设计和软件工程专业本科和研究生核心课程。主要从事软件工程、智能化软件和大数据分析等领域的教学和科研工作。",
        password:"password",
        identity:"研究人员"
      },
      panel:"info"
    }
  },
  created(){
      
  },
  methods:{

  }
}
</script>