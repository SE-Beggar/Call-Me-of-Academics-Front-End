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
            <div v-for="i in scholars.length" :key=i>
                <el-card class="authorCard">
                    <div slot="header">
                        <span>{{scholars[i-1].name}}</span>
                        <el-button class="authorButton" @click="toDetail(scholars[i-1].id)">查看详情</el-button>
                    </div>
                    <div class="text">
                        <div style="float:left">发表论文数：{{scholars[i-1].n_pubs}}</div>
                    </div>
                    <div class="text">
                        <div style="float:left">职位：{{scholars[i-1].position}}</div>
                    </div>
                    <div class="text">
                        <div style="float:left">论文总下载量：{{scholars[i-1].downloadnum}}</div>
                    </div>
                    <div v-if="scholars[i-1].isidentify==0">
                        <el-button type="primary" @click="identify(scholars[i-1].id)">认证该学者</el-button>
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
            scholars:[{
                id:1,
                name:'名字',
                isidentify:1,
                position:'北航',
                n_pubs:10,
                downloadnum:20,
            },{
                id:1,
                name:'名字',
                isidentify:0,
                position:'北航',
                n_pubs:10,
                downloadnum:20
            },{
                id:1,
                name:'名字',
                isidentify:0,
                position:'北航',
                n_pubs:10,
                downloadnum:20
            },{
                id:1,
                name:'名字',
                isidentify:1,
                position:'北航',
                n_pubs:10,
                downloadnum:20
            }]
        }
    },
    created(){
        this.$axios({
                method: 'post', 
                url: '/api/paper/searchscholar/',
                    data: qs.stringify({
                        scholar:this.$store.state.searchcontent
                    })
                })
                .then(res => {
                    switch (res.data.errno) {
                    case 0:
                        this.scholars=res.data.scholars;
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
                this.$router.go(0)
            }
            else {
                this.$store.state.type=1;
                this.$store.state.searchcontent=this.input;
                this.$router.push('/searchPaper')
            }
        }, 
        toAdvanced() {
            //前往高级检索页面
            this.$router.push('/advancedsearch')
        },
        toDetail(id){
            this.$store.state.authorID=id;
            this.$router.push('/')
            //学者详情页面路由
        },
        identify(id){
            this.$axios({
                method: 'post', 
                url: '/api/user/identify/',
                    data: qs.stringify({
                        scholarid:id,
                        email:this.$store.state.email
                    })
                })
                .then(res => {
                    switch (res.data.errno) {
                    case 0:
                        this.$message.success("操作成功,等待管理员核验");
                        break;
                    }
                })
                .catch(err => {
                    console.log(err);  
                })            
        }
    }
}
</script>