<template>
  <div>
    <HomeGrid>
      <template #title> 专属场景歌单 </template>
      <template #content>
        <PLBlock
          v-for="pl in scenesList"
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
      scenesList: [],
    };
  },
  components: {
    HomeGrid,
    PLBlock,
  },
  created() {
    loadUserPlayListAPI(1463586082).then((res) => {
      // console.log(res.result);
      this.scenesList = res.playlist
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
