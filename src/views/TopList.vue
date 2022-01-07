<template>
  <div class="top-list">
    <BaseTopNav :title="'排行榜'" />
    <van-tabs v-model="active">
      <van-tab title="标签 1">
        <TopListWrap :title="'官方榜'" :list="officialList" :mode="true">
          <template #icon>
            <van-icon
              class="iconfont"
              :style="{ color: '#e60026' }"
              slot="icon"
              class-prefix="icon"
              name="wangyiyunyinle"
            ></van-icon>
          </template>
        </TopListWrap>
        <TopListWrap :title="'全球榜'" :list="globeList" />
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import BaseTopNav from "../components/BaseTopNav.vue";
import TopListWrap from "../components/toplist/TopListWrap.vue";
import { loadTopListAPI } from "../service/playlist";
export default {
  data() {
    return {
      active: 0,
      officialList: [],
      globeList: [],
    };
  },
  created() {
    loadTopListAPI().then((res) => {
      console.log(res);
      this.officialList = res.list.filter((x) => x.ToplistType != undefined);
      const key = /欧美|韩语|越南语|俄语|日语|泰语/g;
      this.globeList = res.list
        .filter((x) => {
          return key.test(x.name) || key.test(x.tags.join(""));
        })
        .sort((a, b) => b.playCount - a.playCount);
    });
  },
  components: {
    BaseTopNav,
    TopListWrap,
  },
};
</script>

<style lang="less" scoped>
.top-list {
}
</style>
