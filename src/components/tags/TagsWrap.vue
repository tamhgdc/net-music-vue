<template>
  <div v-if="data != undefined" class="tags-wrap">
    <div v-show="data.title" class="tag-title">{{ data.title }}</div>

    <div class="tags">
      <div
        v-for="tag in data.tags"
        :key="tag.name"
        :class="{
          tag: true,
          small: tag.name.length > 6,
          hide: tag.activity,
        }"
        @click="clickHandle(tag.name)"
      >
        <van-icon v-show="tag.hot" name="fire-o" color="#ee0a24" />
        <span> {{ tag.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "mode"],
  methods: {
    clickHandle(v) {
      if (this.mode) {
        this.$emit("setCat", v);
      } else {
        this.$router.push({
          name: "TagsList",
          params: {
            cat: v,
          },
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.tags-wrap {
  width: 90vw;
  padding: 5vw;
  .tags {
    display: grid;
    grid-template-columns: repeat(4, 25%);
    padding: 5vw 0 0;
    gap: 3vw 0;
    .tag {
      height: 10vw;
      width: 20vw;
      border: 10vw;
      background-color: #f3f3f3;
      line-height: 10vw;
      text-align: center;
      border-radius: 10vw;
      font-size: 4vw;
      &.small {
        font-size: 3vw;
      }
      &.hide {
        opacity: 0.5;
      }
    }
  }
}
</style>
