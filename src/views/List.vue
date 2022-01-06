<template>
  <div class="list-wrap">
    <ListTopNav
      :title="type == 'ListOfficialHeader' ? '官方动态歌单' : '歌单®️'"
    />
    <component :detail="detail" :is="type"></component>
    <ListInfoBar :detail="detail" />
    <ListOperate :detail="detail" />
    <van-list
      v-if="playlist.length > 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ListCell
        v-for="(item, i) in playlist"
        :opt="{ song: item, i, detail: privileges[i] }"
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
import ListTopNav from "../components/list/ListTopNav.vue";
import ListBaseHeader from "../components/list/ListBaseHeader.vue";
import ListOfficialHeader from "../components/list/ListOfficialHeader.vue";
import ListInfoBar from "../components/list/ListInfoBar.vue";
import ListOperate from "../components/list/ListOperate.vue";
import ListCell from "../components/list/ListCell.vue";
import {
  loadPlaylistDetailByIdAPI,
  loadPlaylistAllSongByIdAPI,
} from "../service/playlist";
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
    ListTopNav,
    ListBaseHeader,
    ListOfficialHeader,
    ListInfoBar,
    ListOperate,
    ListCell,
  },
  created() {
    loadPlaylistDetailByIdAPI(this.$route.params.id).then((res) => {
      this.detail = res.playlist;

      console.log(res);
    });
    loadPlaylistAllSongByIdAPI(this.$route.params.id).then((res) => {
      this.playlist = res.songs;
      this.privileges = res.privileges;
    });
  },
  computed: {
    type() {
      return this.$route.params.type || "ListBaseType";
    },
  },
  methods: {
    onLoad() {},
  },
};
</script>

<style lang="less" scoped>
.list-wrap {
  position: relative;
  background-color: white;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
