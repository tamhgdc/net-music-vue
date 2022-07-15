<script setup lang="ts">
import { onBeforeMount } from "@vue/runtime-core";
import { homeService } from "@/service";
onBeforeMount(async () => {
	console.log(await homeService.loadHomePage());
});
</script>

<template>
	<h2>home</h2>
</template>

<style></style>
