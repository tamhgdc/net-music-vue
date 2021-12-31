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
    border-radius: 1rem;

    display: flex;
    justify-content: center;
    align-content: center;

    .item {
      width: 90vw;
      border-radius: 1rem;
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
        padding: 0.2rem 0.5rem;
        border-radius: 0.6rem 0 0 0;
      }
    }
  }
  .swiper-pagination {
    bottom: 0.2rem !important;
    .sp-customs {
      width: 0.8rem;
      height: 0.2rem;
      margin: 0 0.1rem;
      border-radius: 0.2rem;
      background-color: #cecece70;
      display: inline-block;
    }
    .sp-customs-active {
      background-color: #ffffff;
    }
  }
}
</style>
