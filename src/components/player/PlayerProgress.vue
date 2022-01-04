<template>
  <div @click="clickHandle" class="progress-wrap">
    <div class="progress-bar"></div>
    <div ref="progress" class="progress"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    clickHandle(e) {
      this.$refs.progress.style.width = e.offsetX + "px";
      // console.log(e.offsetX / this.$el.offsetWidth);
      this.setPosition(e.offsetX / this.$el.offsetWidth);
    },
    ...mapMutations("player", ["setPosition"]),
  },
  mounted() {},
  computed: {
    ...mapState("player", ["percent"]),
  },
  watch: {
    percent(v) {
      this.$refs.progress.style.width = v + "%";
    },
  },
};
</script>

<style lang="less" scoped>
@progressHeight: 1vw;
.progress-wrap {
  width: 100%;
  height: 5vw;
  position: relative;
  > div {
    position: absolute;
    top: 50%;
    margin-top: -@progressHeight / 2;
    left: 0;
    height: @progressHeight;
    border-radius: @progressHeight;
  }
  .progress-bar {
    width: 100%;

    background-color: #f1f1f120;
  }
  .progress {
    width: 60%;
    background-color: white;
    &::after {
      content: "";
      width: @progressHeight * 2;
      height: @progressHeight * 2;
      border-radius: 100%;
      background-color: white;
      position: absolute;
      top: 50%;
      right: -@progressHeight;
      margin-top: -@progressHeight;
    }
  }
}
</style>
