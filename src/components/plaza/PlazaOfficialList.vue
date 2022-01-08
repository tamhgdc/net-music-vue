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
import { loadUsersPlayListAPI } from "../../service/playlist";
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    loadUsersPlayListAPI([1287293193, 1463586082]).then((res) => {
      res[0].playlist.splice(0, 1);
      this.list = res
        .map((x) => x.playlist)
        .flat()
        .sort((a, b) => b.playCount - a.playCount);
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
