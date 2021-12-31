<template>
  <div class="playlist-wrap">
    <van-image :src="list.coverImgUrl" class="list-header" ref="header">
      <template v-slot:loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
    <ListTopNav></ListTopNav>
    <van-sticky offset-top="14vw">
      <div>
        <van-icon class="play" name="play-circle" />
        <span class="title">播放全部</span>
        <span class="count">({{ count }})</span>
      </div>
      <div>
        <van-icon name="down" />
        <van-icon name="passed" />
      </div>
    </van-sticky>
    <component
      @listInfo="listInfo"
      :id="this.$route.params.id"
      :is="currId"
    ></component>
  </div>
</template>

<script>
import ListTopNav from "../components/list/ListTopNav";
import BaseList from "../components/list/BaseList";
export default {
  data() {
    return {
      currId: "BaseList",
      list: {},
      count: 0,
      loaded: true,
    };
  },
  created() {
    this.currId = this.$route.params.type;
  },
  components: {
    ListTopNav,
    BaseList,
  },
  methods: {
    listInfo(v) {
      this.list = v;
      this.count = this.list.tracks.length;
      this.loaded = false;
    },
  },
};
</script>

<style lang="less">
.list-header {
  height: 80vw;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(2vw);
}
.van-sticky {
  height: 12vw;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 7vw;
  color: #333333;
  div:nth-of-type(1) {
    .van-icon {
      padding: 0 4vw;
    }
    .title {
      font-size: 6vw;
    }
    .count {
      padding-left: 1vw;
      font-size: 4vw;
      color: #999;
    }
    .play {
      color: #fe3c30;
    }
  }
  div:nth-of-type(2) {
    .van-icon {
      padding: 0 2vw;
    }
  }
}
</style>
