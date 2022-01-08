<template>
  <div class="list-wrap">
    <PLBlock
      v-for="pl in list"
      :key="pl.id * Math.random()"
      :size="'30vw'"
      :opt="{
        route: {
          name: 'List',
          params: {
            id: pl.id,
            type: 'ListOfficialHeader',
          },
        },
        pl,
      }"
    />
  </div>
</template>

<script>
import PLBlock from "../PLBlock.vue";
import {
  loadUsersPlayListAPI,
  loadPlaylistDetailByIdsAPI,
} from "../../service/playlist";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    loadUsersPlayListAPI([1287293193, 1463586082])
      .then((res) => {
        res[0].playlist.splice(0, 1);
        const ids = res
          .map((x) => x.playlist)
          .flat()
          .map((x) => x.id);
        return loadPlaylistDetailByIdsAPI(ids);
      })
      .then((res) => {
        this.list = res.map((x) => x.playlist).sort(() => Math.random() - 0.5);
      });
  },
  components: {
    PLBlock,
  },
};
</script>

.
<style lang="less" scoped>
.list-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
}
</style>
