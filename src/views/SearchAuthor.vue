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
        <div id="searchResult">
            <div v-for="i in authors.length" :key=i>
                <el-card class="authorCard">
                    <div slot="header">
                        <span>{{authors[i-1].name}}</span>
                        <el-button class="authorButton" @click="toDetail(authors[i-1].authorID)">查看详情</el-button>
                    </div>
                    <div class="text">
                        <div style="float:left">发表论文数：{{authors[i-1].hasPapers}}</div>
                    </div>
                    <div class="text">
                        <div style="float:left">所属机构：{{authors[i-1].organization}}</div>
                    </div>
                    <div class="text">
                        <div style="float:left">论文总下载量：{{authors[i-1].downloadTimes}}</div>
                    </div>
                </el-card>
            </div>
        </div>
        
    </div>
</template>

<style>
#search {
    margin-top: 50px;
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
</style>

<script>
export default {
    data() {
        return {
            input: '',
            select: '',
            authors: [
                {
                    "authorID": 11,
                    "name": "学者1",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },
                {
                    "authorID": 12,
                    "name": "学者2",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },
                {
                    "authorID": 13,
                    "name": "学者3",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },
                {
                    "authorID": 14,
                    "name": "学者4",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },
                {
                    "authorID": 14,
                    "name": "学者5",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },
                {
                    "authorID": 14,
                    "name": "学者6",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },{
                    "authorID": 14,
                    "name": "学者7",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },
            ],
        }
    },
    methods: {
        search() {
            if (this.select == 2) {
                //搜学者 关键词this.input
                this.$message.success("搜学者");
            }
            else {
                //搜论文 关键词this.input
                this.$message.success("搜论文");
            }
        }, 
        toAdvanced() {
            //前往高级检索页面
        },
        toDetail(authorID) {
            //进入id为authorID的论文详情页面
            this.$message.success(authorID);
        },
    }
}
</script>