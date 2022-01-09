<template>
  <div class="follow">
    <Top @setCurr="setCurr" :mode="false" :option="['动态', '云圈']" />
    <FollowTrend />
  </div>
</template>

<script>
import Top from "../components/Top.vue";
import FollowTrend from "../components/follow/FollowTrend.vue";
export default {
  data() {
    return {
      curr: "",
    };
  },
  methods: {
    setCurr(v) {
      console.log(v);
    },
  },
  components: {
    Top,
    FollowTrend,
  },
};
</script>

<style lang="less" scoped>
.follow {
  display: flex;
  flex-direction: column;
  width: 100vw;
  .follow-trend {
    padding-top: 10vh;
    padding-bottom: 10vh;
  }
}
</style>
