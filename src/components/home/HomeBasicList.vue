<template>
  <div>
    <HomeGrid :route="opt.route">
      <template #title>
        {{ opt.title }}
      </template>
      <template #content>
        <PLBlock
          v-for="pl in list"
          :key="pl.id"
          :opt="{
            route: {
              name: 'List',
              params: {
                id: pl.id,
                type:
                  pl.alg && pl.alg.includes('official')
                    ? 'ListOfficialHeader'
                    : 'ListBaseHeader',
              },
            },
            pl,
          }"
        ></PLBlock>
      </template>
    </HomeGrid>
  </div>
</template>

<script>
import HomeGrid from "./HomeGrid.vue";
import PLBlock from "../PLBlock.vue";
import {
  loadUserPlayListAPI,
  loadPlaylistAndLimitAPI,
} from "../../service/playlist";
export default {
  props: ["opt"],
  data() {
    return {
      list: [],
    };
  },
  components: {
    HomeGrid,
    PLBlock,
  },
  created() {
    if (this.opt.id) {
      loadUserPlayListAPI(this.opt.id).then((res) => {
        // console.log(res.result);
        this.list = res.playlist
          .slice(2)
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);
      });
    } else {
      loadPlaylistAndLimitAPI(6).then((res) => {
        // console.log(res.result);
        this.list = res.result;
      });
    }
  },
};
</script>

<style></style>
