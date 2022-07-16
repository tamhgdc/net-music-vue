<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
<template>
	<router-view></router-view>
	<nav></nav>
</template>

<style scoped lang="less">
* {
	margin: 0;
	padding: 0;
}
body,
html {
	width: 100vw;
	height: 100vh;
	font-size: 4vw;
	color: #505050;
	cursor: pointer;
}
li {
	list-style: none;
}
input {
	outline: 0;
	border: 0;
}
a {
	color: #505050;
	text-decoration: none;
}
:root {
	--spacing: 24px;
}
#app {
	width: 100vw;
	height: 100vh;
}
</style>
