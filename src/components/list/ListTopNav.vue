<template>
  <div class="list-top-nav">
    <van-sticky z-index="1" @change="change" offset-top="0"> </van-sticky>
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
  methods: {
    change() {
      this.$nextTick(() => {
        // this.$refs.bar.$el.style.background = v ? "#00000090" : "#00000000";
        this.$refs.bar.$el.classList.toggle("o");
      });
    },
  },
};
</script>

<style lang="less">
.list-top-nav {
  .van-nav-bar {
    height: 14vw;
  }
  .van-hairline--bottom::after {
    border: 0;
  }
  .van-icon {
    font-size: 6vw !important;
  }
  .van-nav-bar__right {
    .van-icon-search {
      margin-right: 3vw;
    }
  }
  .o {
    background-color: white;
    z-index: 10;
    .van-icon,
    .van-nav-bar__text {
      color: black;
    }
  }
}
</style>
