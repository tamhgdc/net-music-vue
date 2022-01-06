<template>
  <div class="playlist">
    <div class="list-item" v-for="list in playlist" :key="list.id">
      <router-link
        :to="{
          name: 'List',
          params: {
            id: list.id,
            type: 'ListBaseHeader',
          },
        }"
      >
        <div class="item-list-wrap">
          <img :src="list.coverImgUrl + '?params=100y100'" alt="" />
        </div>
        <div>
          <p class="van-ellipsis list-name">{{ list.name }}</p>
          <p class="list-song-count">{{ list.trackCount }}首</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["playlist"],
};
</script>

<style lang="less" scoped>
.playlist {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  .list-item {
    margin: 2vw;
    > a {
      display: flex;

      img {
        width: 15vw;
        height: 15vw;
        border-radius: 3vw;
      }
      > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 2vw;
        .list-name {
          width: 60vw;
          font-size: 5vw;
          color: black;
        }
        .list-song-count {
          color: @gray-7;
        }
      }
    }
  }
}
</style>
