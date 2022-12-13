<template>
  <div class="search">
    <div class="container">
      <el-card class="box-card">
        <div class="search-boxes">
          <div v-for="(line, index) in queries" :key="index">
            <div class="search-box" v-show="!hide || index == 0">
              <div class="logic">
                <el-select
                  v-show="index"
                  v-model="line.logic"
                  placeholder="请选择"
                >
                  <el-option label="AND" :value="0" />
                  <el-option label="OR" :value="1" />
                </el-select>
              </div>
              <el-input
                placeholder="请输入内容"
                v-model="line.input"
                class="input-with-select"
              >
                <el-select
                  v-model="line.entry"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(option, idx) in options"
                    :label="option"
                    :value="idx"
                    :key="idx"
                  />
                </el-select>
              </el-input>
              <div class="operations">
                <div class="operation" v-show="!hide">
                  <i
                    v-if="index > 0 && queries.length > 1"
                    class="el-icon-minus icon-item"
                    @click="delQuery(index)"
                  />
                </div>
                <div class="operation" v-show="!hide">
                  <i
                    v-show="index + 1 == queries.length"
                    class="el-icon-plus icon-item"
                    @click="addQuery"
                  />
                </div>
                <el-button
                  v-show="hide && index == 0"
                  @click="searchClick"
                  class="search-btn"
                  type="primary"
                  >检索</el-button
                >
              </div>
            </div>
          </div>

          <div class="time-box" v-show="!hide">
            <span class="label">时间范围：</span>
            <el-date-picker
              class="time-picker"
              v-model="timerange"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </div>

        <el-divider v-if="!hide" />
        <div class="button-group" v-show="!hide">
          <el-button @click="clearInput" type="text">重置条件</el-button>
          <el-button @click="searchClick" class="search-btn" type="primary"
            >检索</el-button
          >
        </div>
      </el-card>
      <div class="toggleBtnWrapper">
        <el-button
          :icon="iconType"
          @click="toggleBtnClick"
          circle
          class="toggleBtn"
          size="small"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Collapse } from "element-ui";

export default {
  name: "AdvancedSearchBox",
  data() {
    return {
      show3: false,
      hide: false,
      queries: [
        { logic: 0, entry: 0, input: "" },
        { logic: 0, entry: 2, input: "" },
        { logic: 0, entry: 3, input: "" },
      ],
      options: ["篇名", "关键词", "期刊名", "作者", "第一作者"],
      timerange: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      iconType: "el-icon-d-arrow-left",
    };
  },
  methods: {
    addQuery() {
      this.queries.push({ logic: 0, entry: 0, input: "" });
    },
    delQuery(pos) {
      this.queries.splice(pos, 1);
    },
    clearInput() {
      this.queries = [
        { logic: 0, entry: 0, input: "" },
        { logic: 0, entry: 2, input: "" },
        { logic: 0, entry: 3, input: "" },
      ];
      this.timerange = "";
    },
    searchClick() {
      this.$store.state.advancecontent = this.queries;
      this.$store.state.timerange = this.timerange;
      this.$store.state.type = 2;
      this.$router.push("/searchPaper");
    },
    toggleBtnClick() {
      this.hide = !this.hide;
      this.iconType = this.hide
        ? "el-icon-d-arrow-right"
        : "el-icon-d-arrow-left";
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  .container {
    max-width: 100%;
    padding: 30px 15px;
    .box-card {
      padding: 5px 0 10px;

      .search-boxes {
        .search-box {
          display: flex;
          text-align: center;
          align-items: center;

          .logic {
            min-width: 90px;
            max-width: 90px;
          }
          .input-with-select {
            margin: 10px 0px 10px 10px;
            .el-select {
              width: 100px;
            }
          }
          .operations {
            display: flex;
            align-items: center;
            .operation {
              display: flex;
              align-items: center;
              width: 26px;
              height: 26px;
              margin-left: 10px;
              .icon-item {
                color: rgba(48, 48, 48, 0.7);
                font-size: 20px;
                font-weight: bold;
              }
              :hover {
                color: #303030;
              }
            }
            .search-btn {
              width: 120px;
              margin-left: 30px;
            }
          }
        }
        .time-box {
          display: flex;
          align-items: center;
          .label {
            width: 90px;
            font-size: 14px;
            font-weight: bold;
          }
          .time-picker {
            margin: 10px 0px 10px 10px;
          }
        }
      }

      .button-group {
        .search-btn {
          width: 120px;
          margin-left: 30px;
        }
      }
    }
  }

  .toggleBtn {
    position: absolute;
    transform: rotate(90deg);
    margin-top: -16px;
    color: #606266;
    background-color: white;

    &:hover {
      color: #606266;
      background-color: whitesmoke;
    }
  }
}
</style>
