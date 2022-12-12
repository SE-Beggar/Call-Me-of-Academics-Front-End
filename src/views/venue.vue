<template>
    <div>
        <div id="search">
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
                <el-link @click="toAdvanced">前往高级检索</el-link>
            </div>
        </div>
        <div id="searchResult">
            <div v-for="i in venues.length" :key=i>
                <el-card class="authorCard">
                    <div slot="header">
                        <span>{{venues[i-1].raw}}</span>
                        <el-button class="authorButton" @click="toDetail(venues[i-1].id)">查看详情</el-button>
                    </div>
                    <div class="text">
                        <div style="float:left">简介：{{venues[i-1].abstract}}</div>
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
import qs from "qs";
export default {
    data() {
        return {
            input: '',
            select: '',
            venues:[{
                id:1,
                raw:'名字',
                abstract:"这是一个期刊"
            }]
        }
    },
    created(){
        this.$axios({
                method: 'post', 
                url: '/api/collection/search/',
                    data: qs.stringify({
                        name:this.$store.state.searchcontent
                    })
                })
                .then(res => {
                    switch (res.data.errno) {
                    case 0:
                        this.venues=res.data.venues
                        break;
                    }
                })
                .catch(err => {
                    console.log(err);  
                })   
    },
    methods: {
        search() {
            if (this.select == 2) {
                //搜学者 关键词this.input
                this.$store.state.searchcontent=this.input;
                this.$router.push('/searchauthor')
            }
            else if(this.select == 3){
                this.$store.state.searchcontent=this.input;
                this.$router.go(0);
            }
            else {
                this.$store.state.type=1;
                this.$store.state.searchcontent=this.input;
                this.$router.push('/searchPaper')
            }
        }, 
        toAdvanced() {
            this.$store.state.type=2;
            this.$router.push('/advancedsearch')
        },
        toDetail(id){
            this.$store.state.venueid=id;
            this.$router.push('/collection')
        },
    }
}
</script>