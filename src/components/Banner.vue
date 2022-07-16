<script setup lang="ts">
import { defineProps } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
interface Props {
	banners: API.Banner[];
}
const props = defineProps<Props>();
</script>

<template>
	<swiper
		v-if="props.banners.length > 0"
		:slides-per-view="1"
		:space-between="48"
		:modules="[Pagination, Autoplay]"
		:pagination="{
			el: '.swiper-pagination',
			bulletClass: 'normal',
			bulletActiveClass: 'active',
		}"
		autoplay
		loop
	>
		<swiper-slide
			class="img"
			v-for="{ url, imageUrl, pic, typeTitle, titleColor } in props.banners"
			:key="url"
			><div
				class="img"
				:style="{
					backgroundImage: `url(${imageUrl || pic})`,
				}"
			></div>
			<div
				class="title"
				:style="{
					backgroundColor: titleColor === 'red' ? '#ff0000cc' : '#3298dfcc',
				}"
			>
				{{ typeTitle }}
			</div>
		</swiper-slide>
		<div class="swiper-pagination"></div>
	</swiper>
</template>

<style lang="less">
.swiper {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	.swiper-slide {
		position: relative;

		.img {
			width: 100%;
			height: 280px;

			background-size: cover;
			background-repeat: no-repeat;
			border-radius: 32px;
		}

		.title {
			font-size: 28px;
			color: white;
			position: absolute;
			right: 0;
			bottom: 0;
			padding: 10px 20px;
			border-radius: 32px 0 32px 0;
		}
	}

	.swiper-pagination {
		position: absolute;
		bottom: 6px;
		z-index: 99;

		.normal {
			display: inline-block;
			width: 22px;
			height: 5px;
			border-radius: 8px;
			margin: 0 4px;
			background-color: #cecece70;
		}

		.active {
			background-color: #ffffffee;
		}
	}
}
</style>
