<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容" style="width: 200px;border:1px solid red;"></el-input>
  </div>
</template>

<script>
import qs from "qs";
// import SingleReview from "./SingleReview";
export default {
  data() {
    return {
      input:""
    }
  },
}
</script>

<style scoped>


</style>
