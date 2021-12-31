<template>
  <div class="grid">
    <div class="grid-header">
      <h3>
        <slot name="grid-left-title">推荐歌单</slot>
      </h3>
      <router-link to="/">
        <slot name="grid-right-title" class="grid-link">更多</slot
        ><van-icon name="arrow" />
      </router-link>
    </div>
    <div class="grid-content-wrap">
      <slot name="grid-content" class="grid-content"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.grid {
  width: 100vw;
  margin: 5vw 0;
  box-sizing: border-box;
  border-radius: 5vw;
  background-color: white;
  padding-bottom: 5vw;
  .grid-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2vw;
    padding: 5vw;
    a {
      height: 6vw;
      border-radius: 6vw;
      padding: 0 2vw;
      border: 1px solid #cecece;
    }
  }
  .grid-content-wrap {
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;

    > div {
      display: flex;
      > div {
        flex-shrink: 0;
        margin-left: 5vw;
      }
    }
  }
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
