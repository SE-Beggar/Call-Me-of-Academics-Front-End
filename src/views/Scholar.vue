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
            <p>{{ scholar.name }}</p>
          </div>
          <div class="intro">
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
                {{ interest.t }}
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
              :name="scholar.name"
              :nCitationSum="scholar.n_citation"
              :nDownloadedSum="scholar.n_download"
              :h-index="scholar.h_index"
              :parteners="scholar.tags"
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
import qs from "qs";
export default {
  components: { ArticlesTable, AuthorAnalysis },
  data() {
    return {
      scholar: {
        id: 1,
        name: "Hongbin Tan",
        orgs: ["Beihang University", "Natinal Science Park"],
        tags: [{t:"software",w:60},{t:"math",w:200},{t:"chinese",w:35},{t:"english",w:100}],
        pubs: [
          {
            id: 20, //论文在数据库的id，而非在列表中的id
            title: "讨口子",
            authors:[{
              id:1,
              name:"扣子"
            }],
            year: "2020.1.2",
            publisher: "上海出版社",
            n_download: 0,
            n_citation: 10,
          },
        ],
        n_citation: 1910,
        n_download: 201,
        h_index: 175
      },
      currentTab: "articles",
    };
  },
  created() {
    this.$axios({
                    method: 'post', 
                    url: '/api/paper/scholar/',
                    data: qs.stringify({
                      id:this.$store.state.authorID
                    })
                })
                .then(res => {
                    switch (res.data.errno) {
                    case 0:
                        this.scholar=res.data.scholar
                        break;
                    }
                })
                .catch(err => {
                    console.log(err);  
                })
  },
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