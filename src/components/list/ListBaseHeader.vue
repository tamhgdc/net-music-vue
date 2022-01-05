<template>
  <div class="base-header">
    <div v-if="detail.creator != undefined" class="bg">
      <img :src="detail.coverImgUrl + '?param=400y400'" alt="" />
      <div class="overlay"></div>
    </div>
    <div v-if="detail.creator != undefined" class="header-main">
      <div class="img-wrap">
        <img :src="detail.coverImgUrl + '?param=200y200'" alt="" />
      </div>
      <div class="info">
        <div class="pl-name van-multi-ellipsis--l2">
          {{ detail.name }}
        </div>
        <div class="pl-creator">
          <img :src="detail.creator.avatarUrl + '?param=100y100'" alt="" />
          <span v-text="detail.creator.nickname"> </span>
        </div>
        <div class="pl-desc">
          {{ detail.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["detail"],
};
</script>

<style lang="less" scoped>
.base-header {
  width: 100vw;
  height: 48vw;
  padding-top: 24vw;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 78vw;
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
      background: #ffffff30;
      backdrop-filter: blur(2vw);
      -webkit-backdrop-filter: blur(2vw);
    }
    img {
      width: 100%;
    }
  }
  .header-main {
    position: relative;
    height: 30vw;
    display: flex;
    justify-content: space-around;

    .img-wrap {
      img {
        height: 30vw;
        width: 30vw;
        border-radius: 2vw;
      }
    }
    .info {
      width: 60vw;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .pl-name {
        color: white;
        font-size: 5vw;
      }
      .pl-creator {
        display: flex;
        align-items: center;

        img {
          height: 7vw;
          width: 7vw;
          border-radius: 6vw;
        }
        span {
          margin-left: 2vw;
          color: #bfbbba;
        }
      }
      .pl-desc {
        width: 50vw;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #bfbbba;
      }
    }
  }
}
</style>
