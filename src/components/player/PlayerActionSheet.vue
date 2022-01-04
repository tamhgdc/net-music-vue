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
        <div class="list">
          <van-cell
            :class="i == currIndex ? 'item curr' : 'item'"
            v-for="(item, i) in playlist"
            :key="item.id"
          >
            <template #title>
              <span @click="clickHandle(item.id)">{{ item.detail.name }}</span>
            </template>
            <template #right-icon>
              <van-icon name="close" @click="removeById(item.id)" />
            </template>
          </van-cell>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
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
    ...mapGetters("player", ['"currId"']),
  },
  methods: {
    clickHandle(id) {
      this.playById(id);
    },
    ...mapActions("player", ["playById", "removeById"]),
  },
  watch: {},
};
</script>
<style lang="less">
.content {
  .van-cell__title {
    span {
      display: inline-block;
      width: 60%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
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
    .item {
      &.curr {
        color: #ff0000;
      }
    }
  }
}
</style>
