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
        <div id="filter">
            <div id="typeList">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>论文类别</span>
                    </div>
                    <el-checkbox-group v-model="typeSelected">
                        <div v-for="t in types" :key="t">
                            <el-checkbox :label="t" class="type"></el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-card>
            </div>
            <div id="yearList">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>发表年份</span>
                    </div>
                    <el-checkbox-group v-model="yearSelected">
                        <div v-for="t in years" :key="t">
                            <el-checkbox :label="t" class="year"></el-checkbox>
                        </div>
                    </el-checkbox-group>
                </el-card>
            </div>
            <el-button @click="selectInResult" id="selectButton">结果中筛选</el-button>
        </div>
        <div id="searchResult">
            <el-table :data="papers.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" :current-page.sync="currentPage">
                <el-table-column type="index"> </el-table-column>
                <el-table-column prop="title" label="论文标题"></el-table-column>
                <el-table-column prop="authors[0].name" label="第一作者">
                    <template slot-scope="scope">
                        <el-link @click="authorDetail(scope.row.authors[0].id)">
                            {{scope.row.authors[0].name}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="publisher" label="所属机构"></el-table-column>
                <el-table-column prop="year" label="发布年份" sortable></el-table-column>
                <el-table-column prop="n_download" label="下载次数" sortable></el-table-column>
                <el-table-column prop="n_citation" label="被引次数" sortable></el-table-column>
                <el-table-column prop="id" label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" @click="paperDetail(scope.row.id)">查看详情</el-button> -->
                        <button class="el_btn btnblue" @click="paperDetail(scope.row.id)">查看详情</button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[10, 15, 20]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </div>
        <div style="height:100px;width:100%;float:left;"></div>
        <BottomBanner/>
    </div>
</template>

<style scoped>
.el_btn {
  width: 100px;
  font-size:16px;
  color:white;
  background-color: #66CCFF;
  border-radius:10px;
  border: 1px solid rgba(150, 169, 183, 0.413);
  padding: 5px;
  margin: 5px;
  transition: 0.2s;
}
.el_btn:hover {
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
#search {
    margin-top: 40px;
    margin-left: 10%;
    width: 80%;
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

#filter {
    margin-top: 20px;
    margin-left: 10%;
    width: 10%;
    float: left;
}

#subjectList,#yearList {
    margin-top: 20px;
}

#selectButton {
    margin-top: 20px;
    margin-bottom: 20px;
}

.type,.subject,.year {
    margin-left: 10px;
    margin-bottom: 15px;
    size: small;
    float: left;
}

#searchResult {
    margin-top: 20px;
    margin-left: 2%;
    width: 68%;
    float: left;
}

</style>


<script>
/*
结果中筛选想法：
目前设置三个筛选项：学科subjectSelected、类型typeSelected、发布年份yearSelected
各个筛选项内取并集，然后三个筛选项之间取交集得到筛选后结果（若某一筛选项为空表示该筛选项全选，各筛选项默认为空）
*/
import AdvancedSearchBox from "@/components/AdvancedSearchBox.vue";
import BottomBanner from "@/components/BottomBanner.vue";
import TopBanner from "@/components/TopBanner.vue";
import qs from "qs";
export default {
    components: { TopBanner, BottomBanner, AdvancedSearchBox },
    data() {
        return {
            AdvancedSearch:0,
            input: "",
            select: "",
            currentPage: 1,
            pagesize: 10,
            types: [
                "期刊",
                "会议",
            ],
            typeSelected: [],
            years: [
                "2022",
                "2021",
                "2020",
                "2019",
                "2018",
                "2017",
                "2016",
                "2015及更早"
            ],
            yearSelected: [],
            papers: [
                {
                    "id": 20,
                    "title": "讨口子1",
                    authors: [{
                            id: 1,
                            name: "名字1"
                        }],
                    "year": "2021",
                    "publisher": "上海出版社",
                    "n_download": 1,
                    "n_citation": 10
                }
            ],
        };
    },
    created() {
        if (this.$store.state.type == 1) {
            this.$axios({
                method: "post",
                url: "/api/paper/searchpaper/",
                data: qs.stringify({
                    title: this.$store.state.searchcontent,
                    typeSelected: this.typeSelected,
                    yearSelected: this.yearSelected
                })
            })
                .then(res => {
                switch (res.data.errno) {
                    case 0:
                        this.papers = res.data.papers;
                        break;
                }
            })
                .catch(err => {
                console.log(err);
            });
        }
        else if (this.$store.state.type == 2) {
            this.$axios({
                method: "post",
                url: "/api/paper/advancesearch/",
                data: qs.stringify({
                    advancecontent: this.$store.state.advancecontent,
                    typeSelected: this.typeSelected,
                    yearSelected: this.yearSelected
                })
            })
                .then(res => {
                switch (res.data.errno) {
                    case 0:
                        this.papers = res.data.papers;
                        break;
                }
            })
                .catch(err => {
                console.log(err);
            });
        }
        else {
            this.$message.error("不对劲");
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pagesize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        search() {
            if (this.select == 2) {
                this.$store.state.searchcontent = this.input;
                this.$router.push("/searchAuthor");
            }
            else if (this.select == 3) {
                this.$store.state.searchcontent = this.input;
                this.$router.push("/searchvenue");
            }
            else {
                this.$store.state.type = 1;
                this.$store.state.searchcontent = this.input;
                this.$router.go(0);
            }
        },
        authorDetail(authorID) {
            this.$store.state.authorID = authorID;
            this.$router.push("/scholar");
        },
        paperDetail(paperID) {
            //进入id为paperID的论文详情页面
            this.$store.state.paperid = paperID;
            this.$router.push("/Paperdetail");
        },
        toAdvanced() {
            this.AdvancedSearch=1-this.AdvancedSearch
            //前往高级检索页面
            // this.$router.push("/advancedsearch");
        },
        selectInResult() {
            this.$router.go(0);
        }
    }
}
</script>