<template>
  <div class="authorAnalysis">
    <div class="citationTable">
      <div class="title">引用量</div>
      <div id="citation" class="table"></div>
    </div>
    <div class="relationTable">
      <div class="title">合作学者</div>
      <div id="relation" class="table"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { GraphChart } from "echarts/charts";
echarts.use([GridComponent, BarChart, CanvasRenderer, GraphChart]);
export default {
  name: "AuthorAnalysis",
  components: {},
  props: ["nCitationSum", "nDownloadedSum", "hIndex", "parteners"],
  data() {
    return {};
  },
  methods: {
    citationGraph() {
      var chartDom = document.getElementById("citation");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        xAxis: {
          type: "category",
          data: ["被引用量", "被下载量", "h因子"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [this.nCitationSum, this.nDownloadedSum, this.hIndex],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    // 中心节点是全局用户的用户名，周围节点来自 props.partners,
    createNodes(count) {
      var nodes = [
        { id: 1000 + "", name: this.$store.state.username, symbolSize: 70 },
      ];
      for (var i = 0; i < count; i++) {
        nodes.push({
          id: i + "",
          name: this.parteners[i].username,
          symbolSize: 55,
        });
      }
      return nodes;
    },
    createEdges(count) {
      var edges = [];
      if (count === 2) {
        return [[0, 1]];
      }
      for (var i = 0; i < count; i++) {
        edges.push([1000, i]);
      }
      return edges;
    },
    relationGraph() {
      var chartDom = document.getElementById("relation");
      var myChart = echarts.init(chartDom);
      var option;
      var datas = [];
      var i = this.parteners.length;
      datas.push({
        nodes: this.createNodes(i),
        edges: this.createEdges(i),
      });
      option = {
        series: datas.map(function (item, idx) {
          return {
            type: "graph",
            label: {
              show: true,
              fontSize: 10,
            },
            layout: "force",
            animation: false,
            data: item.nodes,
            left: (idx % 4) * 25 + "%",
            top: Math.floor(idx / 4) * 20 - (20 - i) * 2 + "%",
            height: "100%",
            width: "100%",
            force: {
              initLayout: "circular",
              // gravity: 0
              repulsion: i * 40,
              edgeLength: i * 10,
            },
            edges: item.edges.map(function (e) {
              return {
                source: e[0] + "",
                target: e[1] + "",
              };
            }),
          };
        }),
      };
      option && myChart.setOption(option);
      myChart.resize();
    },
  },
  mounted() {
    this.citationGraph();
    this.relationGraph();
  },
};
</script>

<style lang="scss" scoped>
.authorAnalysis {
  .citationTable {
    margin-top: 20px;
    .table {
      margin: 0 auto;
      width: 300px;
      height: 250px;
    }
  }
  .relationTable {
    .table {
      margin: 0 auto;
      width: 680px;
      height: 800px;
    }
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
