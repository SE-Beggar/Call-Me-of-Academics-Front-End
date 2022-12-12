<template>
    <div>
    <el-button class="ret" type="primary" @click="ret">返回</el-button>
    <div class="venue">
        <h1>{{venue.title}}</h1>
        <div class="content">
            <h2>摘要</h2>
            <a>{{venue.abstract}}</a>
            <h2>出版社</h2>
            <a>
                {{venue.publisher}}
            </a>
            <h2>类型</h2>
            <a>
                {{venue.doc_type}}
            </a>
            <h2>关键词</h2>
            <a v-for="ref in venue.keywords">
                {{ref }}
            </a>
            <h2>被引量</h2>
            <a>
                {{venue.n_citation}}
            </a>
        </div>
        <el-button type="primary" @click="download">下载</el-button>
        <el-button type="primary" @click="preview">预览</el-button>
        <h2>论文目录</h2>
                <el-table :data="venue.papers.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" :current-page.sync="currentPage">
                <el-table-column
                    prop="title"
                    label="标题"
                    width="360"
                    >    
                </el-table-column>
                <el-table-column prop="authors[0].name" label="第一作者">
                    <template slot-scope="scope">
                        <el-link @click="authorDetail(scope.row.authors[0].id)">
                            {{scope.row.authors[0].name}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="year"
                    label="年份">
                </el-table-column>
                <el-table-column prop="id" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="paperDetail(scope.row.id)">查看详情</el-button>
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
</div>
</template>
<style>
    div.venue{
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
                venue:{
                    title:"这是期刊标题",
                    abstract:"这是摘要",
                    authors:[{id:1,name:"xxx1"},{id:1,name:"xxx2"}],
                    doc_type:"book",
                    publisher:"这是出版社",
                    n_citation:"20",
                    keywords:["关键词1","关键词2"],
                    pdf:"//static.aminer.org/upload/pdf/1254/370/239/53e9ab9eb7602d970354a97e.pdf",
                    papers:[{
                        id:"1",
                        title:"标题",
                        authors:[{id:1,name:"名字"}],
                        year:"2002"
                    }]
                },
                currentPage:1,
                pagesize:10,
            }
        },
        created(){
            this.$axios({
                    method: 'get',
                    url: '/api/collection/list/',
                    params: {
                    id: this.$store.state.venueid
                    }
                    })
                    .then(res => {          
                    switch (res.data.errno) {
                        case 0:
                            this.venue=res.data.venue
                        break;
                        case 1:
                            this.$message.error("期刊不存在");
                        break;
                    }
                    })
                    .catch(err => {
                    console.log(err);         
                    })            
        },
        methods:{
            handleSizeChange(val) {
            this.pagesize=val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
            ret(){
                this.$router.back();
            },
            download(){
        let url="https:"+this.venue.pdf
        //let url = "https://dl.winmoes.com/wp-content/uploads/2022/08/4448412e3b83cf8.png?imageMogr2/crop/626x"
        const downloadRes = async () => {
        let response = await fetch(url); 
        let blob = await response.blob();  
        let objectUrl = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = objectUrl;
        a.download =this.venue.title;
        a.click()
        a.remove(); 
       }
      downloadRes();
            },
            preview(){
                let hre="https:"+this.venue.pdf;
                window.open(hre, '_blank');
            },
            authorDetail(id){
                this.$store.state.authorID=id;
                this.$router.push('/')
            },
            paperDetail(paperID) {
            this.$store.state.paperid=paperID;
            this.$router.push('/Paperdetail');
        },
        }
    }
</script>