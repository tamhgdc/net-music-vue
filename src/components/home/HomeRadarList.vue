<template>
  <div>
    <HomeGrid>
      <template #title>
        {{ profile.nickname + "的" || 你的专属 }}雷达歌单
      </template>
      <template #content>
        <PLBlock
          v-for="pl in radarList"
          :key="pl.id"
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
        ></PLBlock>
      </template>
    </HomeGrid>
  </div>
</template>

<script>
import HomeGrid from "./HomeGrid.vue";
import PLBlock from "../PLBlock.vue";
import { loadUserPlayListAPI } from "../../service/playlist";
import { mapState } from "vuex";
export default {
  data() {
    return {
      radarList: [],
    };
  },
  components: {
    HomeGrid,
    PLBlock,
  },
  created() {
    loadUserPlayListAPI(1287293193).then((res) => {
      // console.log(res.result);
      this.radarList = res.playlist
        .slice(2)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
    });
  },
  computed: {
    ...mapState("user", ["profile"]),
  },
};
</script>

<style></style>
