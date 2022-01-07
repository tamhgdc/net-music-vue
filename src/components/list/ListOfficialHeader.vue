<template>
  <div class="base-header">
    <div v-if="detail.creator != undefined" class="bg">
      <img :src="url" alt="" />
      <div class="overlay"></div>
    </div>
    <div v-if="detail.creator != undefined" class="info-wrap">
      <div class="info-title">{{ name }}</div>
      <div class="info-up">{{ detail.updateFrequency }}</div>
      <div class="info-desc">{{ detail.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["detail"],
  computed: {
    name() {
      // console.log(/\|/g.test(this.detail.name));
      return /\|/g.test(this.detail.name)
        ? this.detail.name.split("|")[1]
        : this.detail.name;
    },
    url() {
      return (
        (this.detail.backgroundCoverUrl || this.detail.tracks[0].al.picUrl) +
        "?param=400y400"
      );
    },
  },
};
</script>

<style lang="less" scoped>
.base-header {
  width: 100vw;
  height: 80vw;
  padding-top: 24vw;
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 112vw;
    overflow: hidden;
    background-image: linear-gradient(180deg, #00000000 0%, #000000 100%);
    border-bottom-left-radius: 60% 8%;
    border-bottom-right-radius: 60% 8%;
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #00000080;
    }
    img {
      height: 100%;
    }
  }
  .info-wrap {
    width: 100%;
    position: absolute;
    bottom: 1vw;
    text-align: center;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div {
      padding: 1vw 0;
    }
    .info-title {
      font-size: 8vw;
      font-weight: 900;
    }
    .info-desc {
      font-size: 4vw;
      transform: scale(0.8);
      white-space: nowrap;
      color: #ffffff90;
    }
  }
}
</style>
