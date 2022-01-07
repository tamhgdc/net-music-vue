<template>
  <div class="tag-playlist">
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
                type: pl.alg.includes('official')
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
</template>

<script>
import { loadPlaylistByCateAPI } from "../../service/playlist";
import PLBlock from "../PLBlock.vue";
export default {
  props: ["cat"],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      limit: 12,
      offset: 0,
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      loadPlaylistByCateAPI({
        cat: this.cat,
        limit: this.limit,
        offset: this.offset * this.limit,
      }).then((res) => {
        for (let i = 0; i < res.playlists.length; i += 3) {
          this.list.push(res.playlists.slice(i, i + 3));
        }
        console.log(this.list);
        this.offset++;
        this.loading = false;
        this.finished = res.code != 200;
      });
    },
  },
  components: {
    PLBlock,
  },
};
</script>

<style lang="less" scoped>
.tag-playlist {
  width: 100vw;
  .list-wrap {
    display: flex;
    justify-content: space-around;
    padding: 2vw 0;
  }
}
</style>
