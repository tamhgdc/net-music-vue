<template>
  <div>
    <HomeGrid>
      <template #content>
        <PLBlock
          v-for="pl in remdList"
          :key="pl.id"
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
        ></PLBlock>
      </template>
    </HomeGrid>
  </div>
</template>

<script>
import HomeGrid from "./HomeGrid.vue";
import PLBlock from "../PLBlock.vue";
import { loadPlaylistAndLimitAPI } from "../../service/playlist.js";
export default {
  data() {
    return {
      remdList: [],
    };
  },
  components: {
    HomeGrid,
    PLBlock,
  },
  created() {
    loadPlaylistAndLimitAPI(6).then((res) => {
      // console.log(res.result);
      this.remdList = res.result;
    });
  },
};
</script>

<style></style>
