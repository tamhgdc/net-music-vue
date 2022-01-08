<template>
  <div class="topic">
    <BaseTopNav :title="'话题'" />
    <div class="header">
      <van-image fit="contain" :src="act.coverMobileUrl" />
      <div class="overlay"></div>
      <div class="desc">
        <span>#{{ act.title }}#</span>
        <span>{{ act.participateCount }}人参与</span>
      </div>
    </div>

    <div class="content">
      <p v-for="txt in act.text" :key="txt" class="txt">{{ txt }}</p>
      <TopicEventCard v-for="e in events" :key="e.id" :e="e" />
    </div>
  </div>
</template>

<script>
import BaseTopNav from "../components/BaseTopNav.vue";
import TopicEventCard from "../components/topic/TopicEventCard.vue";
import {
  loadTopicDetailAPI,
  loadTopicDetailHotEventAPI,
} from "../service/topic";
export default {
  data() {
    return {
      act: {},
      events: [],
    };
  },
  created() {
    // const test = 116409105;
    loadTopicDetailAPI(this.$route.params.id)
      .then((res) => {
        // console.log(res);
        this.act = res.act;
        // console.log(res);
        return loadTopicDetailHotEventAPI(this.$route.params.id);
      })
      .then((res) => {
        this.events = res.events;
        this.events.forEach((e) => {
          e.content = JSON.parse(e.json);
        });
        console.log(res);
      });
  },
  components: {
    BaseTopNav,
    TopicEventCard,
  },
};
</script>

<style lang="less" scoped>
.topic {
  background-color: white;
  .header {
    position: relative;
    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: #00000040;
    }
    .desc {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 7vw;
      color: white;
    }
  }
  .content {
    width: 92vw;
    padding: 0 3vw;
    .txt {
      position: relative;
      line-height: 5vw;
      font-size: 3vw;
      text-indent: 5vw;
      &::before {
        content: "";
        height: 2vw;
        width: 2vw;
        border-radius: 2vw;
        background-color: #fe363e;
        position: absolute;
        left: 2vw;
        top: 1vw;
      }
    }
  }
}
</style>
