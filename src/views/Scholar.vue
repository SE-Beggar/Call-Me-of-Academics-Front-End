<template>
  <div>
    <div class="user_box">
      <div class="inner_box">
        <div class="head_box">
          <img
            src="../assets/image/style_img/default_head.png"
            class="head_pic"
          />
        </div>
        <div class="name_box">
          <div class="name">
            <p>{{ scholar.username }}</p>
          </div>
          <div class="intro">
            <div class="email">
              <i class="el-icon-message icon" />
              <div class="title">邮箱：</div>
              {{ scholar.email }}
            </div>
            <div class="orgs">
              <i class="el-icon-office-building icon" />
              <div class="title">机构：</div>
              <el-tag
                v-for="(org, index) in scholar.orgs"
                :key="index"
                class="org"
                effect="plain"
              >
                {{ org }}
              </el-tag>
            </div>
            <div class="domains">
              <i class="el-icon-discover icon" />
              <div class="title">领域：</div>
              <el-tag
                class="domain"
                v-for="(interest, index) in scholar.tags"
                :key="index"
                effect="plain"
              >
                {{ interest }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user_info">
      <div class="inner_box2">
        <el-tabs v-model="currentTab" @tab-click="">
          <el-tab-pane label="发表文献" name="articles">
            <ArticlesTable :papers="scholar.pubs" />
          </el-tab-pane>
          <el-tab-pane label="信息分析" name="analysis">
            <AuthorAnalysis
              :n-citation-sum="scholar.nCitationSum"
              :n-downloaded-sum="scholar.nDownloadeSum"
              :h-index="scholar.hIndex"
              :parteners="scholar.parteners"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ArticlesTable from "@/components/ArticlesTable.vue";
import AuthorAnalysis from "@/components/AuthorAnalysis.vue";
export default {
  components: { ArticlesTable, AuthorAnalysis },
  data() {
    return {
      scholar: {
        id: 1,
        username: "Hongbin Tan",
        email: "thb@buaae.edu.cn",
        orgs: ["Beihang University", "Natinal Science Park"],
        tags: ["Software", "Data Mining", "VGG"],
        pubs: [
          {
            id: 20, //论文在数据库的id，而非在列表中的id
            title: "讨口子",
            author: "潘海霞",
            authorID: 20,
            time: "2020.1.2",
            publisher: "上海出版社",
            downloadnum: 0,
            quotenum: 10,
          },
          {
            id: 20, //论文在数据库的id，而非在列表中的id
            title: "讨口子",
            author: "潘海霞",
            authorID: 20,
            time: "2020.1.2",
            publisher: "上海出版社",
            downloadnum: 0,
            quotenum: 10,
          },
        ],
        nCitationSum: 1910,
        nDownloadeSum: 201,
        hIndex: 175,
        parteners: [
          { id: "2", username: "Li Zhang" },
          { id: "3", username: "Hailong Sun" },
          { id: "4", username: "San Zhang" },
          { id: "5", username: "Si Li" },
          { id: "6", username: "Wu Wang" },
        ],
      },
      currentTab: "articles",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.user_box {
  width: 100%;
}
.inner_box {
  margin: auto;
}
.inner_box2 {
  width: 800px;
  margin: auto;
}
.head_box {
  display: inline-block;
  vertical-align: top;
  width: 160px;
  height: 160px;
  border: 2px solid white;
  border-radius: 80px;
  margin: 60px 10px 20px;
}
.head_pic {
  width: 100%;
  border-radius: 80px;
}
.name_box {
  display: inline-block;
  vertical-align: top;
  width: 600px;
  margin: 60px 10px 10px;
}
.name {
  height: 60px;
}
.name > p {
  font-size: 42px;
  font-weight: 700;
  text-align: left;
}
.intro {
  text-align: left;
  line-height: 200%;
  .icon {
    font-size: 18px;
    margin-right: 5px;
  }
  .title {
    font-weight: bold;
  }

  .email {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
  }

  .orgs {
    align-items: center;
    display: flex;
    flex-wrap: wrap;

    .org {
      display: flex;
      white-space: nowrap;
      margin: 5px 5px 5px 0px;
    }
  }
  .domains {
    align-items: center;
    display: flex;
    flex-wrap: wrap;

    .domain {
      display: flex;
      white-space: nowrap;
      margin: 5px 5px 5px 0px;
    }
  }
}
.intro > p {
  text-align: left;
}
.user_info {
  width: 100%;
}
</style>
