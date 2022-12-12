<template>
    <div>
    <el-button class="ret" type="primary" @click="ret">返回</el-button>
    <div class="paper">
        <h1>{{paper.title}}</h1>
        <h4 class="year">时间:{{paper.year}}</h4>
        <div class="content">
            <h2>摘要</h2>
            <a>{{paper.abstract}}</a>
            <h2>关键词</h2>
            <a v-for="ref in paper.keywords">
                {{ref}}
            </a>
            <h2>作者</h2>
            <a v-for="au in paper.autors">
                {{au}};
            </a>
            <h2>出版社</h2>
            <a>
                {{paper.publisher}}
            </a>
            <h2>文献类型</h2>
            <a>
                {{paper.type}}
            </a>
            <h2>语言</h2>
            <a>
                {{paper.lang}}
            </a>
        </div>
        <el-button type="primary" @click="download">下载</el-button>
        <el-button type="primary" @click="preview">预览</el-button>
        <h2>参考文献</h2>
                <el-table
                :data="paper.references"
                style="width: 100%">
                <el-table-column
                    prop="title"
                    label="标题"
                    width="360">
                </el-table-column>
                <el-table-column
                    prop="autor"
                    label="作者"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="publisher"
                    label="出版社"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="year"
                    label="时间">
                </el-table-column>
                </el-table>
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
    h4.year{
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
                    title:"这是论文标题",
                    abstract:"这是摘要",
                    keywords:["关键词1","关键词2"],
                    doc_type:"类型1",
                    autors:["xxx1","xxx2"],
                    year:"2001",
                    pdf:"//www.baidu.com",
                    lang:"en",
                    publisher:"这是出版社",
                    references:[{title:"参考文献1",autor:"第一作者",publisher:"出版社1",year:"202001"}],
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
        let url="https:"+this.paper.pdf
        //let url = "https://dl.winmoes.com/wp-content/uploads/2022/08/4448412e3b83cf8.png?imageMogr2/crop/626x"
        const downloadRes = async () => {
        let response = await fetch(url); 
        let blob = await response.blob();  
        let objectUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = objectUrl;
        a.download = "文献";
        a.click()
        a.remove(); 
       }
      downloadRes();
            },
            preview(){
                let hre="https:"+this.paper.pdf;
                window.open(hre, '_blank');
            }
        }
    }
</script>