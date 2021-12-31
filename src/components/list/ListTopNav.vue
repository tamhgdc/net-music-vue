<template>
  <div class="list-top-nav">
    <van-nav-bar
      fixed
      left-text="歌单®️"
      left-arrow
      @click-left="$router.go(-1)"
      ref="bar"
    >
      <template #right>
        <van-icon name="search" size="18" />
        <van-popover
          v-model="showPopover"
          trigger="click"
          placement="bottom-end"
          :actions="actions"
        >
          <template #reference>
            <van-icon name="setting-o" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopover: false,
      actions: [
        { text: "添加歌曲", icon: "more-o" },
        { text: "编辑歌单信息", icon: "add-o" },
        { text: "删除歌单", icon: "music-o" },
      ],
    };
  },
  mounted() {},
};
</script>

<style lang="less">
@fc: #e0001b;
.list-top-nav {
  .van-nav-bar {
    height: 14vw;
    // background-color: #fff;
  }
  .van-hairline--bottom::after {
    border: 0;
  }
  .van-icon {
    color: @fc;
    font-size: 6vw !important;
  }
  .van-nav-bar__right {
    .van-icon-search {
      margin-right: 3vw;
    }
  }
}
</style>
