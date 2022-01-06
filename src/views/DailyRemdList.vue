<template>
  <div class="daily-remd-list">
    <BaseTopNav />
    <div></div>
    <ListOperate :detail="playlist" />
    <van-list
      v-if="playlist.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ListCell
        v-for="(item, i) in playlist"
        :opt="{ song: item, i, detail: item.privilege }"
        :key="item.id"
      >
        <template #leftIcon>
          <img :src="item.al.picUrl + '?param=50y50'" alt="" />
        </template>
      </ListCell>
    </van-list>
  </div>
</template>

<script>
import BaseTopNav from "../components/BaseTopNav.vue";
import ListOperate from "../components/list/ListOperate.vue";
import ListCell from "../components/list/ListCell.vue";
import { loadDailyRemdSongsAPI } from "../service/playlist";
export default {
  data() {
    return {
      detail: {},
      privileges: [],
      playlist: [],
      loading: false,
      finished: false,
    };
  },
  components: {
    BaseTopNav,
    ListOperate,
    ListCell,
  },
  created() {
    loadDailyRemdSongsAPI().then((res) => {
      this.playlist = res.data.dailySongs;
    });
  },
  methods: {
    onLoad() {},
  },
};
</script>

<style lang="less" scoped>
.daily-remd-list {
  width: 100vw;
  height: 100vw;
}
</style>
