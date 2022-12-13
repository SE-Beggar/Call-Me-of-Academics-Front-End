<template>
    <div class="articlesTable">
      <el-table :data="papers" style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="title" label="论文标题"></el-table-column>
        <el-table-column prop="r" label="作者排次">
        </el-table-column>
        <el-table-column prop="publisher" label="出版社"></el-table-column>
        <el-table-column prop="year" label="发表时间" sortable></el-table-column>
        <el-table-column
          prop="n_download"
          label="下载次数"
          sortable
        ></el-table-column>
        <el-table-column
          prop="n_citation"
          label="被引次数"
          sortable
        ></el-table-column>
        <el-table-column prop="i" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="paperDetail(scope.row.i)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    name: "ArticlesTable",
    props: ['papers'],
    data() {
      return {};
    },
    methods: {
      paperDetail(paperID) {
        //进入id为paperID的论文详情页面
        this.$store.state.paperid = paperID;
        this.$router.push("/Paperdetail");
      },
      authorDetail(authorID) {
        this.$store.state.authorID = authorID;
        this.$router.push("/scholar");
      },
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
