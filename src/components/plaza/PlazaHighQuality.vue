<template>
  <div class="plaza-hight-quality">
    <div class="header">
      <div class="title">{{ cat || "全部精品" }}</div>
      <PlazaHQSift @setCat="setCat" />
    </div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, i) in list" :key="i" class="list-wrap">
          <PLBlock
            v-for="pl in item"
            :key="pl.id"
            :size="'30vw'"
            :opt="{
              route: {
                name: 'List',
                params: {
                  id: pl.id,
                  type:
                    pl.alg && pl.al.includes('official')
                      ? 'ListOfficialHeader'
                      : 'ListBaseHeader',
                },
              },
              pl,
            }"
          />
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import PlazaHQSift from "./PlazaHQSift.vue";
import PLBlock from "../PLBlock.vue";
import { loadHighQualityPlayListAPI } from "../../service/playlist";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      limit: 12,
      updateTime: 0,
      cat: "",
    };
  },
  methods: {
    setCat(v) {
      console.log(v);
      this.cat = v;
      this.list = [];
      this.loading = true;
      this.finished = false;
      this.onLoad();
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const params =
        this.cat == ""
          ? {
              limit: this.limit,
              before: this.updateTime,
            }
          : {
              cat: this.cat,
              limit: this.limit,
              before: this.updateTime,
            };
      loadHighQualityPlayListAPI(params).then((res) => {
        for (let i = 0; i < res.playlists.length; i += 3) {
          this.list.push(res.playlists.slice(i, i + 3));
        }
        this.updateTime = res.lasttime;
        this.loading = false;
        this.finished = res.code != 200 || this.list.length > 50;
      });
    },
  },
  components: {
    PlazaHQSift,
    PLBlock,
  },
};
</script>
<style lang="less" scoped>
.plaza-hight-quality {
  .header {
    display: flex;
    justify-content: space-between;
    height: 10vw;
    font-size: 4vw;
    line-height: 10vw;
    width: 94vw;
    padding: 0 3vw;
  }
  .list-wrap {
    display: flex;
    justify-content: space-around;
    padding: 2vw 0;
  }
}
</style>
