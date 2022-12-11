<template>
    <div>
    <el-button class="ret" type="primary" @click="ret">返回</el-button>
    <div class="paper">
        <h1>{{paper.title}}</h1>
        <h4 class="time">时间:{{paper.time}}</h4>
        <div class="content">
            <h2>摘要</h2>
            <a>{{paper.abstract}}</a>
            <h2>出版社</h2>
            <a>
                {{paper.publisher}}
            </a>
            <h2>领域</h2>
            <a>
                {{paper.field}}
            </a>
            <h2>下载量</h2>
            <a>
                {{paper.downloadnum}}
            </a>
            <h2>被引量</h2>
            <a>
                {{paper.quotenum}}
            </a>
        </div>
        <el-button type="primary" @click="download">下载</el-button>
        <el-button type="primary" @click="preview">预览</el-button>
        <h2>论文目录</h2>
                <el-table
                :data="paper.references"
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="标题"
                    width="360"
                    @click="paperview">    
                </el-table-column>
                <el-table-column
                    prop="autor"
                    label="作者"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="时间">
                </el-table-column>
                </el-table>
    </div>
    <div class="block">
        <span class="demonstration">页数较少时的效果</span>
         <el-pagination
            layout="prev, pager, next"
            :total="50">
        </el-pagination>
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
    div.paper{
        padding:50px 0px 0px 0px;
        width:80%;
        margin:auto;
    }
    div.content{
        width:50%; 
    }
    h4.time{
        position:relative;
        left:200px;
    }
    .ret{
        float:left;
    }
</style>
<script>
    import qs from "qs";
    export default{
        data(){
            return{
                paper:{
                    title:"这是期刊标题",
                    abstract:"这是摘要",
                    autors:["xxx1","xxx2"],
                    time:"2001",
                    field:"领域",
                    publisher:"这是出版社",
                    downloadnum:"10",
                    quotenum:"20",
                    references:[{title:"参考文献1",autor:"第一作者",publisher:"出版社1",time:"202001"}],
                }
            }
        },
        created(){
            this.$axios({
                    method: 'get',
                    url: '/api/paper/paperdetails/',
                    params: {
                    paperid: this.$store.state.paperid
                    }
                    })
                    .then(res => {          
                    switch (res.data.errno) {
                        case 0:
                            this.paper=res.data.paper
                        break;
                        case 3001:
                            this.$message.error("论文不存在");
                        break;
                    }
                    })
                    .catch(err => {
                    console.log(err);         
                    })            
        },
        methods:{
            ret(){
                this.$router.back();
            },
            download(){

            },
            preview(){

            },
            paperview(){

            }
            
        }
    }
</script>