<template>
  <div>
    <TopBanner/>
    <div class="venue">
      <button class="el_btn3" @click="ret" style="float:left;">返回</button>
      <h1>{{ venue.NormalizedName }}</h1>
      <div class="content">
        <h2>全名</h2>
        <p>{{ venue.DisplayName}}</p>
      </div>
      <h2>论文目录</h2>
      <el-table :data="venue.papers.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 100%"
        :current-page.sync="currentPage">
        <el-table-column prop="title" label="标题" width="360">
        </el-table-column>
        <el-table-column prop="authors[0].name" label="第一作者">
          <template slot-scope="scope">
            <el-link @click="authorDetail(scope.row.authors[0].id)">
              {{ scope.row.authors[0].name }}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column prop="year" label="年份">
        </el-table-column>
        <el-table-column prop="id" label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="primary" @click="paperDetail(scope.row.id)">查看详情</el-button> -->
            <button class="el_btn2" @click="paperDetail(scope.row.id)">查看详情</button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 15, 20]"
        :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <BottomBanner/>
  </div>
</template>
<style scoped>
.venue {
  padding: 40px 80px;
  width: 60%;
  margin: auto;
  min-height: 800px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 6px 9px 0 rgba(0, 0, 0, 0.24),
    0 8px 0px 0 rgba(0, 0, 0, 0.19);
}
h1{
  margin: 30px;
}
h2 {
  text-align: left;
  margin: 20px;
}
p {
  text-align: left;
  text-indent: 40px;
  font-size: 18px;
}
.s_entry {
  text-align: left;
  text-indent: 20px;
  font-size: 18px;
  margin: 32px 0;
}
.s_entry b {
  font-size: 21px;
}
.el_btn1 {
  width: 18%;
  font-size: 18px;
  color: white;
  background-color: #66CCFF;
  border-radius: 10px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 5px;
  margin: 20px;
  transition: 0.2s;
}
.el_btn1:hover {
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25), 0 4px 8px 0 rgba(0, 0, 0, 0.20);
}
.el_btn2 {
  width: 100px;
  font-size: 16px;
  color: white;
  background-color: #66CCFF;
  border-radius: 10px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 5px;
  transition: 0.2s;
}
.el_btn2:hover {
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25), 0 4px 8px 0 rgba(0, 0, 0, 0.20);
}
.el_btn3 {
  width: 100px;
  font-size: 18px;
  color: white;
  background-color: #FF6666;
  border-radius: 10px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 10px;
  margin: 20px;
  transition: 0.2s;
}
.el_btn3:hover {
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25), 0 4px 8px 0 rgba(0, 0, 0, 0.20);
}
</style>
<script>
import TopBanner from "@/components/TopBanner.vue";
import BottomBanner from "@/components/BottomBanner.vue";
import qs from "qs";
export default {
    components: { TopBanner, BottomBanner },
    data() {
        return {
            venue: {
                NormalizedName: "生成对抗网络集合",
                DisplayName: "如图像生成与修复、人脸识别等多个领域中，均有较好的表现。",
                papers: [{
                        id: "1",
                        title: "标题",
                        authors: [{ id: 1, name: "名字" }],
                        n_citation:10,
                        year: "2002"
                    }]
            },
            currentPage: 1,
            pagesize: 10,
        };
    },
    created() {
        this.$axios({
            method: "get",
            url: "/api/collection/list/",
            params: {
                id: this.$store.state.venueid
            }
        })
            .then(res => {
            switch (res.data.errno) {
                case 0:
                    this.venue = res.data.venue;
                    break;
                case 1:
                    this.$message.error("期刊不存在");
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
            let url = "https:" + this.venue.pdf;
            //let url = "https://dl.winmoes.com/wp-content/uploads/2022/08/4448412e3b83cf8.png?imageMogr2/crop/626x"
            const downloadRes = async () => {
                let response = await fetch(url);
                let blob = await response.blob();
                let objectUrl = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.href = objectUrl;
                a.download = this.venue.title;
                a.click();
                a.remove();
            };
            downloadRes();
        },
        preview() {
            let hre = "https:" + this.venue.pdf;
            window.open(hre, "_blank");
        },
        authorDetail(id) {
            this.$store.state.authorID = id;
            this.$router.push("/scholar");
        },
        paperDetail(paperID) {
            this.$store.state.paperid = paperID;
            this.$router.push("/Paperdetail");
        },
    }
}
</script>