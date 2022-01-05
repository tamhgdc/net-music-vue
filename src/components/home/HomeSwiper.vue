<template>
  <div v-swiper:mySwiper="swiperOption" class="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="banner.id" v-for="banner in banners">
        <div class="item">
          <img :src="banner.pic" alt="" />
          <div
            class="item-title"
            :style="{
              background:
                banner.titleColor == 'red' ? '#ff0000cc' : '#3298dfcc',
            }"
          >
            {{ banner.typeTitle }}
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
export default {
  props: ["banners", "delay"],
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: this.delay,
        },
        loop: true,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          bulletClass: "sp-customs",
          bulletActiveClass: "sp-customs-active",
        },
      },
    };
  },
};
</script>

<style lang="less">
.mySwiper {
  width: 100vw;
  .swiper-slide {
    width: 90vw;
    border-radius: 5vw;

    display: flex;
    justify-content: center;
    align-content: center;

    .item {
      width: 90vw;
      border-radius: 5vw;
      overflow: hidden;
      position: relative;
      img {
        display: block;
        width: 90vw;
      }
      .item-title {
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
        color: white;
        padding: 1vw 2vw;
        border-radius: 2vw 0 0 0;
      }
    }
  }
  .swiper-pagination {
    bottom: 1vw !important;
    .sp-customs {
      width: 5vw;
      height: 0.8vw;
      margin: 0 0.5vw;
      border-radius: 0.8vw;
      background-color: #cecece70;
      display: inline-block;
    }
    .sp-customs-active {
      background-color: #ffffff;
    }
  }
}
</style>
