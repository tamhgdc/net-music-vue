<template>
  <div class="user-cell">
    <div class="avatar">
      <img :src="user.img1v1Url || user.avatarUrl" alt="" />
      <span
        v-if="user.identityIconUrl || user.avatarDetail"
        :style="{
          backgroundImage: `url(${
            user.identityIconUrl || user.avatarDetail.identityIconUrl
          })`,
        }"
      ></span>
    </div>
    <div class="info">
      <div class="name">
        {{ user.name || user.nickname }}
        <span v-if="user.alia"> ({{ user.alia.join("") }})</span>
      </div>
      <div class="desc">{{ user.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
};
</script>

<style lang="less" scoped>
.user-cell {
  display: flex;
  align-items: center;
  padding: 2vw 5vw;
  background: white;
  .avatar {
    position: relative;
    height: 15vw;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 15vw;
      height: 15vw;
      border-radius: 15vw;
    }
    span {
      position: absolute;
      right: -0.4vw;
      bottom: -0.4vw;
      height: 5vw;
      width: 5vw;
      z-index: 10;
      background-size: contain;
    }
    padding-left: 15vw;
  }
  .info {
    padding-left: 5vw;
    flex: 1;
    height: 15vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-bottom: 1px solid #cecece80;
    .name {
      color: #4e7dae;
    }
    span {
      color: #aeaeae;
    }
  }
}
</style>
