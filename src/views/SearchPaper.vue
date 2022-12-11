<template>
    <div>
        <div id="search">
            <div id="normalSearch">
                <el-input placeholder="请输入内容" v-model="input">
                    <el-select v-model="select" slot="prepend" placeholder="论文检索">
                        <el-option label="论文检索" value="1"></el-option>
                        <el-option label="学者检索" value="2"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" v-on:click="search">搜索</el-button>
                </el-input>
            </div>
            <div id="advancedSearch">
                <el-link @click="toAdvanced">前往高级检索</el-link>
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
            <div id="subjectList">
                <el-card>
                    <div slot="header" class="clearfix">
                        <span>学科分类</span>
                    </div>
                    <el-checkbox-group v-model="subjectSelected">
                        <div v-for="t in subjects" :key="t">
                            <el-checkbox :label="t" class="subject"></el-checkbox>
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
            <el-table :data="papers" style="width: 100%">
                <el-table-column type="index"> </el-table-column>
                <el-table-column prop="title" label="论文标题"></el-table-column>
                <el-table-column prop="author" label="第一作者">
                    <template slot-scope="scope">
                        <el-link @click="authorDetail(scope.row.authorID)">
                            {{scope.row.author}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="publisher" label="所属机构"></el-table-column>
                <el-table-column prop="time" label="发表时间" sortable></el-table-column>
                <el-table-column prop="downloadnum" label="下载次数" sortable></el-table-column>
                <el-table-column prop="quotenum" label="被引次数" sortable></el-table-column>
                <el-table-column prop="id" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="paperDetail(scope.row.id)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
<div class="block">
  <span class="demonstration">大于 7 页时的效果</span>
  <el-pagination
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
</div>
    </div>
</template>

<style>
#search {
    margin-top: 50px;
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
目前设置三个筛选项：学科subjectSelected、类型typeSelected、发表时间yearSelected
各个筛选项内取并集，然后三个筛选项之间取交集得到筛选后结果（若某一筛选项为空表示该筛选项全选，各筛选项默认为空）
*/
import qs from "qs";
export default {
    data() {
        return {
            input: '',
            select: '',
            types:[
                "期刊",
                "会议",
            ],
            typeSelected:[],//存放已被选择的type的数组，下同
            subjects:[
                "数学",
                "物理",
                "生物",
                "化学"
            ],
            subjectSelected:[],
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
            yearSelected:[],
            papers: [
                {
                    "id":20,//论文在数据库的id，而非在列表中的id
                    "title": "讨口子",
                    "author": "潘海霞",
                    "authorID": 20,
                    "time": "2020.1.2",
                    "publisher": "上海出版社",
                    "downloadnum":0,
                    "quotenum":10
                },
                {
                    "id": 30,//论文在数据库的id，而非在列表中的id
                    "title": "讨口子",
                    "author": "潘海霞",
                    "authorID": 20,
                    "time": "2020.1.2",
                    "publisher": "上海出版社",
                    "downloadnum":0,
                    "quotenum":10
                }
            ],
        }
    },
    created(){
        if(this.$store.state.type==1){
            this.$axios({
                method: 'post', 
                url: '/api/paper/searchpaper/',
                    data: qs.stringify({
                        title:this.$store.state.searchcontent,
                        typeSelected:this.typeSelected,
                        subjectSelected:this.subjectSelected,
                        yearSelected:this.yearSelected
                    })
                })
                .then(res => {
                    switch (res.data.errno) {
                    case 0:
                        this.papers=res.data.papers;
                        break;
                    }
                })
                .catch(err => {
                    console.log(err);  
                })
        }
        else if(this.$store.state.type==2){
            this.$axios({
                method: 'post', 
                url: '/api/paper/advancesearch/',
                    data: qs.stringify({
                        advancecontent:this.$store.state.advancecontent,
                        typeSelected:this.typeSelected,
                        subjectSelected:this.subjectSelected,
                        yearSelected:this.yearSelected
                    })
                })
                .then(res => {
                    switch (res.data.errno) {
                    case 0:
                        this.papers=res.data.papers;
                        break;
                    }
                })
                .catch(err => {
                    console.log(err);  
                })          
        }
        else{
            this.$message.error("不对劲");
        }
    },
    methods: {
        search() {
            if (this.select == 2) {
                this.$store.state.searchcontent=this.input;
                this.$router.push('/searchAuthor')
            }
            else {
                this.$store.state.type=1;
                this.$store.state.searchcontent=this.input;
                this.$router.go(0)
            }
        },
        authorDetail(authorID) {
            this.$store.state.authorID=authorID;
            this.$router.push('/')
            //学者详情页面路由未写..
        },
        paperDetail(paperID) {
            //进入id为paperID的论文详情页面
            this.$store.state.paperid=paperID;
            this.$router.push('/Paperdetail');
        },
        toAdvanced() {
            //前往高级检索页面
            this.$router.push('/advancedsearch')
        },
        selectInResult() {
            this.$router.go(0);
        }
    }
}
</script>