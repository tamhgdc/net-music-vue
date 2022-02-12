<template>
  <div>
    <van-icon
      class="iconfont"
      slot="icon"
      class-prefix="icon"
      name="24gf-playlist"
      @click="show = true"
      :style="{ fontSize: size }"
    />
    <van-action-sheet v-model="show">
      <div class="content">
        <div class="header">
          <p>
            当前播放<span>({{ playlist.length }})</span>
          </p>
        </div>
        <div ref="list" class="list">
          <div
            :class="i == currIndex ? 'item curr' : 'item'"
            v-for="(item, i) in playlist"
            :key="item.id"
          >
            <div>
              <img
                class="playing"
                v-show="i == currIndex"
                src="../../assets/playing.gif"
                alt=""
              />
              <span @click="clickHandle(item.id)">{{ item.name }}</span>
            </div>
            <van-icon name="close" @click="removeById(item.id)" />
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["size"],
  data() {
    return {
      show: false,
      curr: "item",
    };
  },
  computed: {
    ...mapState("player", ["playlist", "currIndex"]),
  },
  updated() {
    // console.log(this.$refs.list.children[this.currIndex].scrollHeight);
    // console.log(this.$refs.list.scrollTop);
    /* 更新滚动条位置 */
    this.$nextTick(() => {
      if (this.$refs.list) {
        // console.log(
        //   this.currIndex,
        //   this.$refs.list.children[this.currIndex].offsetTop
        // );
        this.$refs.list.scrollTop =
          this.$refs.list.children[this.currIndex].offsetTop -
          this.$refs.list.children[this.currIndex].offsetHeight * 1.5;
      }
    });
  },
  methods: {
    clickHandle(id) {
      this.playById(id);
    },
    ...mapActions("player", ["playById", "removeById"]),
  },
};
</script>
<style lang="less" scoped>
.content {
  min-height: 50vw;
  max-height: 80vw;
  padding: 6vw 6vw 0;
  display: flex;
  flex-direction: column;
  .header {
    height: 10vw;
    font-size: 6vw;
    span {
      font-size: 4vw;
      color: #999999;
      margin-left: 1vw;
    }
  }
  .list {
    flex: 1;
    overflow: auto;
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-content: center;
      overflow: hidden;
      > div {
        flex: 1;
        height: 10vw;
        display: flex;
        align-items: center;
        span > {
          width: 70vw;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        img {
          margin-right: 2vw;
        }
      }
      &.curr {
        color: #d44037;
      }
      .playing {
        width: 5vw;
        height: 5vw;
      }
    }
  }
}
</style>
