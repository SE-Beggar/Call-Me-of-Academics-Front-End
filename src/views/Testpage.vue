<template>
  <div>
    <div v-for="item in searchlists">
    <v-highlight-component :message='item' :search='search'/>
  </div>
  </div>
</template>

<script>
import qs from "qs";
export default{
    data(){
        return{
            input:"这是",
            searchlists:["这是句子1","这是句子2"],
            search: ['句子'],
        };
    },
};
</script>

<style scoped>


</style>
