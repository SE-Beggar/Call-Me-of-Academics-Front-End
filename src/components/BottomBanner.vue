<template>
  <div class="div_intro1" style="height:300px;display: block;">
    <div class="info_img">
      <p style="margin-bottom:20px;font-size:18px;">友情链接</p>
      <img src="../assets/image/nbpl.png">
    </div>
    <div class="info_img">
      <p style="margin-bottom:20px;font-size:18px;">关于我们</p>
      <img src="../assets/image/about_us.png">
    </div>
    <div class="info_img" style="width:240px;">
      <p style="margin-bottom:20px;font-size:18px;">访问统计</p>
      <img src="https://badges.toozhao.com/badges/01G9NYGBKXCVD7GT0YGTKPJET9/blue.svg"
          style="width:100%;margin:auto;" alt="连接异常">
    </div>
  </div>
</template>

<script>
export default {
  name:"BottomBanner"
}
</script>

<style scoped>
.div_intro1 {
  width: 100%;
  float: left;
  height: 600px;
  background: linear-gradient(to right, #66CCFF, #daf1fc); 
}
.info_img {
  width: 180px;
  float: right;
  border-radius:10px;
  margin:50px 80px 0 0;
}
.info_img img {
  border-radius:10px;
  width:100%;
  display: block;
}
</style>