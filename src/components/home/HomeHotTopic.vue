<template>
  <div class="home-hot-topic">
    <HomeGrid :showButton="false">
      <template #title> 热门话题 </template>
      <template #content>
        <div class="wrap">
          <HotTopicCell
            v-for="topic in topics"
            :key="topic.actId"
            :opt="{ topic, showCount: true }"
          />
        </div>
      </template>
    </HomeGrid>
  </div>
</template>

<script>
import HomeGrid from "./HomeGrid.vue";
import HotTopicCell from "../HotTopicCell.vue";
import { loadHotTopicAPI } from "../../service/topic";
export default {
  data() {
    return {
      topics: [],
    };
  },
  created() {
    loadHotTopicAPI().then((res) => {
      console.log(res);
      this.topics = res.hot
        .sort((a, b) => b.participateCount - a.participateCount)
        .slice(0, 3);
      this.topics[0]["isHot"] = true;
    });
  },
  components: {
    HomeGrid,
    HotTopicCell,
  },
};
</script>

<style lang="less" scoped>
.home-hot-topic {
}
</style>
