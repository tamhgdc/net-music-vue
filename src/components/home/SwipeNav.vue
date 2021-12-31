<template>
  <div>
    <div class="swipe-nav">
      <nav>
        <div v-for="(item, key) in icons" :key="key" class="item">
          <div class="icon-wrap" v-html="item"></div>
          <span>{{ key }}</span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: {
        每日推荐:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="rgba(239, 102, 102, 1)"><path d="M0 0h48v48H0z" fill="none"></path><path d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM8 24h8v4H8v-4zm20 12H8v-4h20v4zm12 0h-8v-4h8v4zm0-8H20v-4h20v4z"></path></svg>',
        私人FM:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="rgba(239, 102, 102, 1)"><path d="M0 0h48v48H0z" fill="none"></path><path d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM15.51 32.49l-2.83 2.83C9.57 32.19 8 28.1 8 24c0-4.1 1.57-8.19 4.69-11.31l2.83 2.83C13.18 17.85 12 20.93 12 24c0 3.07 1.17 6.15 3.51 8.49zM24 32c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm11.31 3.31l-2.83-2.83C34.83 30.15 36 27.07 36 24c0-3.07-1.18-6.15-3.51-8.49l2.83-2.83C38.43 15.81 40 19.9 40 24c0 4.1-1.57 8.19-4.69 11.31zM24 20c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path></svg>',
        歌单: '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" fill="rgba(239, 102, 102, 1)"><path d="M0 0h48v48H0z" fill="none"></path><path d="M30 12H6v4h24v-4zm0 8H6v4h24v-4zM6 32h16v-4H6v4zm28-20v16.37c-.63-.23-1.29-.37-2-.37-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6V16h6v-4H34z"></path></svg>',
        排行榜:
          '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" fill="rgba(239, 102, 102, 1)"><path d="M0 0h48v48H0z" fill="none"></path><path d="M20 40h8V8h-8v32zM8 40h8V24H8v16zm24-22v22h8V18h-8z"></path></svg>',
        直播: '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" fill="rgba(239, 102, 102, 1)"><path d="M0 0h48v48H0z" fill="none"></path><path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 29c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm0-11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></pat</svg>',
        数字专辑:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="rgba(239, 102, 102, 1)"><path fill="none" d="M0 0h48v48H0V0z"></path><path d="M46 10c0-2.21-1.79-4-4-4H6c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h36c2.21 0 4-1.79 4-4V10zm-4 28H6V10h36v28zm-26-8c0-3.31 2.69-6 6-6 .71 0 1 .14 2 .37V12h10v4h-6l-.01 14.05C27.96 33.34 25.3 36 22 36c-3.31 0-6-2.69-6-6z"></path></svg>',
      },
    };
  },
};
</script>
<style lang="less">
.icon-wrap svg {
  width: 8vw;
  height: 8vw;
}
</style>
<style lang="less" scoped>
.swipe-nav {
  margin-top: 3vw;
  width: 100vw;
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  nav {
    display: flex;
  }
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 0 4vw;
  align-items: center;
  font-size: 3vw;
  .icon-wrap {
    width: 15vw;
    height: 15vw;
    background-color: #f7dfdf;
    border-radius: 15vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
