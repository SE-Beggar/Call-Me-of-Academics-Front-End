<template>
    <div class="articlesTable">
      <el-table :data="papers" style="width: 100%">
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="title" label="论文标题"></el-table-column>
        <el-table-column prop="authors[0].name" label="第一作者">
          <template slot-scope="scope">
            <el-link @click="authorDetail(scope.row.authors[0].id)">
              {{ scope.row.authors[0].name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="publisher" label="所属机构"></el-table-column>
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
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="paperDetail(scope.row.id)"
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
