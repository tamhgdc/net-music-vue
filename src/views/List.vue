<template>
  <div class="list-wrap">
    <ListTopNav />
    <component :detail="detail" :is="type"></component>
    <ListOperate :detail="detail" />
  </div>
</template>

<script>
import ListTopNav from "../components/list/ListTopNav.vue";
import ListBaseHeader from "../components/list/ListBaseHeader.vue";
import ListOperate from "../components/list/ListOperate.vue";
import { loadPlaylistDetailByIdAPI } from "../service/playlist";
export default {
  data() {
    return {
      detail: {},
      privileges: [],
    };
  },
  components: {
    ListTopNav,
    ListBaseHeader,
    ListOperate,
  },
  created() {
    loadPlaylistDetailByIdAPI(this.$route.params.id).then((res) => {
      this.detail = res.playlist;
      this.privileges = res.privileges;
      console.log(res.playlist);
    });
  },
  computed: {
    type() {
      return this.$route.params.type || "ListBaseType";
    },
  },
};
</script>

<style lang="less" scoped>
.list-wrap {
  position: relative;
  background-color: white;
}
</style>
