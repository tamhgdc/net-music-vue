<template>
  <div class="tags">
    <BaseTopNav />
    <TagsWrap v-for="item in categories" :key="item.title" :data="item" />
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
      categories: [],
    };
  },
  //TODO: 分类
  created() {
    loadAllPlaylistCategoryAPI().then((res) => {
      console.log(res);
      console.log(Object.keys(res.categories));
      this.categories = Object.keys(res.categories).reduce((p, c) => {
        return p.concat({
          title: res.categories[c],
          tags: res.sub.filter((x) => x.category == c),
        });
      }, []);
      // console.log(this.categories);
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
  background-color: white;
}
</style>
