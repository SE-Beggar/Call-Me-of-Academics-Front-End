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
        <div id="recommend">
            <div id="cloud">
                <div ref="wordcloud" class="wordcloud"></div>
            </div>
            <div id="recommendAuthor" v-for="i in 4" :key=i>
                <el-card class="authorCard">
                    <div slot="header">
                        <span>{{recommendAuthors[i-1].name}}</span>
                        <el-button class="authorButton" @click="authorDetail(recommendAuthors[i-1].authorID)">查看详情</el-button>
                    </div>
                    <div class="text">
                        <div style="float:left">发表论文数：{{recommendAuthors[i-1].hasPapers}}</div>
                    </div>
                    <div class="text">
                        <div style="float:left">所属机构：{{recommendAuthors[i-1].organization}}</div>
                    </div>
                    <div class="text">
                        <div style="float:left">论文总下载量：{{recommendAuthors[i-1].downloadTimes}}</div>
                    </div>
                </el-card>
            </div>
            <div id="random">您可能对这些感兴趣。。。</div>
            <div id="recommendPaper">
                <el-table :data="recommendPapers" style="width: 100%">
                    <el-table-column type="index"> </el-table-column>
                    <el-table-column prop="title" label="论文标题"></el-table-column>
                    <el-table-column prop="firstAuthor" label="第一作者">
                        <template slot-scope="scope">
                            <el-link @click="authorDetail(scope.row.firstAuthorID)">
                                {{scope.row.firstAuthor}}
                            </el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="organization" label="所属机构"></el-table-column>
                    <el-table-column prop="date" label="发表时间"></el-table-column>
                    <el-table-column prop="downloadTimes" label="下载次数"></el-table-column>
                    <el-table-column prop="referTimes" label="被引次数"></el-table-column>
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
            input: '',
            select: '',
            recommendAuthors: [//推荐的学者列表（4个），初始为数学学科的学者即authors[0]
            {
                    "authorID": 11,
                    "name": "数学1",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },
                {
                    "authorID": 12,
                    "name": "数学2",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },
                {
                    "authorID": 13,
                    "name": "数学3",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },
                {
                    "authorID": 14,
                    "name": "数学4",
                    "hasPapers": 251,
                    "organization" :"数学出版社1",
                    "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                },
            ],
            authors: [
                [//数学
                    {
                        "authorID": 11,
                        "name": "数学1",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 12,
                        "name": "数学2",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 13,
                        "name": "数学3",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 14,
                        "name": "数学4",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                ],
                [//物理
                    {
                        "authorID": 11,
                        "name": "物理1",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 12,
                        "name": "物理2",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 13,
                        "name": "物理3",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 14,
                        "name": "物理4",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                ],
                [//化学
                    {
                        "authorID": 11,
                        "name": "化学1",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 12,
                        "name": "化学2",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 13,
                        "name": "化学3",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 14,
                        "name": "化学4",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                ],
                [//生物
                    {
                        "authorID": 11,
                        "name": "生物1",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 12,
                        "name": "生物2",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 13,
                        "name": "生物3",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                    {
                        "authorID": 14,
                        "name": "生物4",
                        "hasPapers": 251,
                        "organization": "数学出版社1",
                        "downloadTimes": 1001//论文总下载量，根据数据库存的情况决定要不要此项
                    },
                ],
            ],
            recommendPapers: [//随机推荐的论文列表（10篇）
                {
                    "id": 18,//论文在数据库的id，而非在列表中的id
                    "title": "数学论文1",
                    "firstAuthorID": 20,
                    "firstAuthor": "谭火彬",
                    "date": "2020.1.1",
                    "organization": "北京出版社",
                    "downloadTimes": 36,
                    "referTimes": 19,
                },
                {
                    "id": 30,
                    "title": "数学论文2",
                    "firstAuthorID": 20,
                    "firstAuthor": "讨口子",
                    "date": "2020.1.2",
                    "organization": "上海出版社",
                    "downloadTimes": 109,
                    "referTimes": 93,
                }
            ],
        }
    },
    mounted() {
        this.initchart();
    },
    methods: {
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
            })
        },
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
        authorDetail(authorID) {
            //进入id为authorID的论文详情页面
        },
        paperDetail(paperID) {
            //进入id为paperID的论文详情页面
            this.$message.success(paperID);
            this.$router.push('/Paperdetail');
        },
    }
}
</script>