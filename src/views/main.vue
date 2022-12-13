<template>
    <div>
        <div id="search">
            <div id="normalSearch">
                <el-input placeholder="请输入内容" v-model="input" @input="preview">
                    <el-select v-model="select" slot="prepend" placeholder="论文检索">
                        <el-option label="论文检索" value="1"></el-option>
                        <el-option label="学者检索" value="2"></el-option>
                        <el-option label="期刊检索" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" v-on:click="search">搜索</el-button>
                </el-input>
                <div class="topp">
                <p class="preview" v-for="item in searchlist">
                    <v-highlight-component :message='item' :search='sinput'/>
                </p>
                </div>
            </div>
            <div id="advancedSearch">
                <el-link @click="toAdvanced">前往高级检索</el-link>
            </div>
        </div>
        <div id="recommend">
            <div v-for="i in recommendAuthors.length" :key=i>
                <el-card class="authorCard">
                    <div slot="header">
                        <span>{{recommendAuthors[i-1].name}}</span>
                        <el-button class="authorButton" @click="toDetail(recommendAuthors[i-1].id)">查看详情</el-button>
                    </div>
                    <div class="text">
                        <div style="float:left">发表论文数：{{recommendAuthors[i-1].n_pubs}}</div>
                    </div>
                    <div class="text">
                        <div style="float:left">职位：{{recommendAuthors[i-1].position}}</div>
                    </div>
                    <div class="text">
                        <div style="float:left">论文总引用量：{{recommendAuthors[i-1].n_citation}}</div>
                    </div>
                </el-card>
            </div>
            <div id="cloud">
                <div ref="wordcloud" class="wordcloud"></div>
            </div>
            <div id="random">您可能对这些感兴趣。。。</div>
            <div id="recommendPaper">
                <el-table :data="recommendPapers" style="width: 100%">
                    <el-table-column type="index"> </el-table-column>
                    <el-table-column prop="title" label="论文标题"></el-table-column>
                    <el-table-column prop="authors[0].name" label="第一作者">
                        <template slot-scope="scope">
                            <el-link @click="authorDetail(scope.row.authors[0].id)">
                                {{scope.row.authors[0].name}}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="publisher" label="出版社"></el-table-column>
                    <el-table-column prop="year" label="发表时间"></el-table-column>
                    <el-table-column prop="n_citation" label="被引次数"></el-table-column>
                    <el-table-column prop="id" label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="paperDetail(scope.row.id)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
#recommend {
    margin-top: 20px;
    margin-left: 10%;
    width: 80%;
    float: left;
}
.menuItem {
    width: 10%;
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
#recommendPaper {
    margin-top: 50px;
}
.wordcloud {
    width: 100%;
    height: 300px;
    margin: auto;
}
#random {
    width:100%;
    float: left;
    margin-top: 20px;
}
div.topp{
    position:absolute;
    width:70%;
}
p.preview{
    background-color: azure;
    margin: auto;
    width:70%;
    border-style:dashed;
    border-width:1px;
    border-radius: 4px;
    border-color: gray;
}
</style>


<script>
//注：原多个一维数组authors1,...,authors4已合并成二维数组authors，原authors1对应author[0]（papers同
/*
主页面推送想法：
分学科推送，对于每个学科推送4位相关学者和10篇下载量/被引量最高的论文放入二维数组authors和papers中(create中完成)，
同时在create中给recommendAuthors赋初始值authors[0](recommendPapers类似)
然后根据点击导航栏给recommendAuthors、recommendPapers赋值（无需交互，已完成），展示的是recommendAuthors、recommendPapers中的内容
*/
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import qs from "qs";
export default {
    data() {
        return {
            options: [
            {
                value: 1,
                name: '数学'
            }, {
                value: 2,
                name: '物理'
            }, {
                value: 3,
                name: '化学'
            }, {
                value: 4,
                name: '生物'
            },
        ],
            sinput:[],
            timer: null,
            len:false,
            value: 1,
            input: '',
            select: '',
            recommendAuthors: [
                {
                    id:1,
                    name:"学者1",
                    position:"教授",//学者职位
                    n_pubs:201,//文献数量
                    n_citation: 19,
                },
                {
                    id:1,
                    name:"学者2",
                    position:"教授",//学者职位
                    n_pubs:201,//文献数量
                    n_citation: 19,
                },
                {
                    id:1,
                    name:"学者3",
                    position:"教授",//学者职位
                    n_pubs:201,//文献数量
                    n_citation: 19,
                },
            ],
            authors: [
                [{
                    id:1,
                    name:"学者1",
                    position:"教授",//学者职位
                    n_pubs:201,//文献数量
                    n_citation: 19,
                }],[{
                    id:1,
                    name:"学者2",
                    position:"教授",//学者职位
                    n_pubs:201,//文献数量
                    n_citation: 19,
                }]
            ],
            recommendPapers: [//推荐的论文列表（10篇），初始为数学论文即papers[0]
                {
                    id: 18,
                    title: "数学论文1",
                    year: "2020",
                    publisher: "北京出版社",
                    n_download: 36,
                    n_citation: 19,
                }
            ],
            searchlist:["预览1","预览2","预览3","预览4","预览5","预览6","预览7","预览8"]
        }
    },
    created(){
        this.$axios({
                    method: 'get',
                    url: '/api/paper/main/'
                    })
                    .then(res => {          
                    switch (res.data.errno) {
                        case 0:
                            this.authors=res.data.authors;
                            this.recommendAuthors=this.authors[0];
                            this.recommendPapers=res.data.papers;
                        break;
                    }
                    })
                    .catch(err => {
                    console.log(err);         
                    })     
    },
    mounted() {
        this.initchart();
    },
    methods: {
        preview(){
            this.clearTimer()
            this.sinput=[]
            this.sinput[0]=this.input
            if (this.input && this.input.length > 0) {
                this.len = true
                this.timer = setTimeout(() => {
                    this.$axios({
                        method: 'post', 
                        url: '/api/paper/preview/',
                            data: qs.stringify({
                                input:this.input
                            })
                        })
                        .then(res => {
                            switch (res.data.errno) {
                            case 0:
                                this.searchlist=res.data.lists;
                                break;
                            }
                        })
                        .catch(err => {
                            console.log(err);  
                        })             
                }, 500)
            } else {
                if (this.len) {
                    this.$axios({
                        method: 'post', 
                        url: '/api/paper/preview/',
                            data: qs.stringify({
                                input:this.input
                            })
                        })
                        .then(res => {
                            switch (res.data.errno) {
                            case 0:
                                this.searchlist=res.data.lists;
                                break;
                            }
                        })
                        .catch(err => {
                            console.log(err);  
                        })                   
                }
                if (this.input == '') {
                    this.len = false
                    return
                }
            }
        },
        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer)
            }
        },
        initchart() {
            let myChart = this.$echarts.init(this.$refs.wordcloud);
            myChart.setOption({
                series: [
                    {
                        type: "wordCloud",
                        //用来调整词之间的距离
                        gridSize: 10,
                        //用来调整字的大小范围
                        // Text size range which the value in data will be mapped to.
                        // Default to have minimum 12px and maximum 60px size.
                        sizeRange: [14, 60],
                        // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
                        //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
                        // rotationRange: [-45, 0, 45, 90],
                        // rotationRange: [ 0,90],
                        rotationRange: [0, 0],
                        //随机生成字体颜色
                        // maskImage: maskImage,
                        textStyle: {
                            color: function () {
                                return (
                                    "rgb(" +
                                    Math.round(Math.random() * 255) +
                                    ", " +
                                    Math.round(Math.random() * 255) +
                                    ", " +
                                    Math.round(Math.random() * 255) +
                                    ")"
                                );
                            }
                        },
                        //位置相关设置
                        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                        // Default to be put in the center and has 75% x 80% size.
                        left: "center",
                        top: "center",
                        right: null,
                        bottom: null,
                        width: "200%",
                        height: "200%",
                        //数据
                        data: this.options
                    }
                ]
            })
            myChart.on('click', (params) => {//词云点击响应
                this.recommendAuthors = this.authors[params.data.value - 1];
            }
            )
        },
        search() {
            if (this.select == 2) {
                //搜学者 关键词this.input
                this.$store.state.searchcontent=this.input;
                this.$router.push('/searchAuthor')
            }
            else if(this.select ==3){
                this.$store.state.searchcontent=this.input;
                this.$router.push('/searchvenue')
            }
            else {
                this.$store.state.type=1;
                this.$store.state.searchcontent=this.input;
                this.$router.push('/searchPaper')
            }
        },
        toAdvanced() {
            //前往高级检索页面
            this.$store.state.type=2;
            this.$router.push('/advancedsearch')
        },
        authorDetail(author) {
            this.$store.state.authorID=author;
            this.$router.push('/scholar')
        },
        paperDetail(paperID) {
            //进入id为paperID的论文详情页面
            this.$message.success(paperID);
            this.$router.push('/Paperdetail');
        },
    }
}
</script>