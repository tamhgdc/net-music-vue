<template>
  <div class="tags">
    <BaseTopNav />
    <TagsWrap />
  </div>
</template>

<script>
import BaseTopNav from "../components/BaseTopNav.vue";
import TagsWrap from "../components/tags/TagsWrap.vue";
import { loadAllPlaylistCategoryAPI } from "../service/playlist";
export default {
  data() {
    return {
      tags: {},
    };
  },
  //TODO: 分类
  created() {
    loadAllPlaylistCategoryAPI().then((res) => {
      console.log(res);
      // tags = res;
      // res.sub.reduce((p,c)=>{

      // },{})
      // console.log(res.sub.find((x) => x.category == 0));
    });
  },
  components: {
    BaseTopNav,
    TagsWrap,
  },
};
</script>

<style lang="less" scoped>
.tags {
  width: 100vw;
  height: 100vh;
  background-color: red;
}
</style>
