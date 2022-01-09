<template>
  <div class="top-list">
    <BaseTopNav :title="'排行榜'" />
    <van-tabs v-model="active" scrollspy sticky offset-top="14vw">
      <van-tab title="官方">
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
      </van-tab>
      <van-tab title="精品">
        <TopListWrap :title="'精品'" :list="other" />
      </van-tab>

      <van-tab title="曲风">
        <TopListWrap :title="'曲风'" :list="styleList" />
      </van-tab>
      <van-tab title="全球">
        <TopListWrap :title="'全球榜'" :list="globeList" />
      </van-tab>
      <van-tab title="特色">
        <TopListWrap :title="'特色'" :list="specialList" />
      </van-tab>
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
      other: [],
      styleList: [],
      specialList: [],
    };
  },
  created() {
    loadTopListAPI().then((res) => {
      console.log(res);
      this.officialList = res.list.filter((x) => x.ToplistType != undefined);

      const key = /欧美|韩语|越南语|俄语|日语|泰语|法国|俄罗斯/;
      this.globeList = res.list
        .filter((x) => {
          return key.test(x.name) || key.test(x.tags.join(""));
        })
        .sort((a, b) => b.playCount - a.playCount);

      this.other = res.list.filter(
        (x) =>
          !this.globeList.some((y) => x.id == y.id) &&
          !this.officialList.some((y) => x.id == y.id)
      );
      this.specialList = this.other.filter((x) => /首个/.test(x.description));
      this.styleList = this.other
        .filter((x) => /云音乐|中文/.test(x.name))
        .sort((a, b) => b.playCount - a.playCount);

      this.other = res.list.filter(
        (x) =>
          !this.globeList.some((y) => x.id == y.id) &&
          !this.officialList.some((y) => x.id == y.id) &&
          !this.styleList.some((y) => x.id == y.id) &&
          !this.specialList.some((y) => x.id == y.id)
      );
      console.log(this.other);
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
