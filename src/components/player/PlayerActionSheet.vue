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
            :title="item.detail.name"
            v-for="(item, i) in playlist"
            :key="item.id"
          >
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-icon name="close" />
            </template>
          </van-cell>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
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
  watch: {},
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
    .item {
      &.curr {
        color: #ff0000;
      }
    }
  }
}
</style>
