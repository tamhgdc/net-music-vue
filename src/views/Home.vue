<script setup lang="ts">
import { ref, onMounted } from "vue";
import { homeController } from "@/service";
import Banner from "@/components/Banner.vue";

const banners = ref([]);

onMounted(async () => {
	const res = await homeController.banners();
	banners.value = res.data.banners || [];
	// console.log(home.value);
});
</script>

<template>
	<h2 class="title">home</h2>
	<banner :banners="banners" />
</template>

<style scoped>
.title {
	font-size: 56px;
}
</style>
