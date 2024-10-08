<script setup>
import { ref, defineProps } from 'vue';

defineProps({
	categories: {
		type: Object,
		required: true,
	},
});

const currentCategory = ref(null);

const selectCategory = (category) => {
	currentCategory.value = currentCategory.value === category ? null : category;
};
</script>

<template>
	<nav id="side-nav">
		<ul>
			<li
				v-for="(category, categoryTitle) in categories"
				:key="category"
			>
				<button @click="selectCategory(category)">
					{{ categoryTitle }}
				</button>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
#side-nav {
	width: 200px;
	background-color: #f3f4f6;
	padding: 20px;
	border-right: 1px solid #2c3e50;
	height: 100vh;
	overflow-y: auto;
	position: fixed;
}

#side-nav ul {
	list-style-type: none;
	padding: 0;
	margin-top: 150px;
}

#side-nav li {
	margin: 10px 0;
}

#side-nav button {
	width: 100%;
	padding: 10px;
	background-color: #232b59;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;
}

#side-nav button:hover {
	background-color: #0056b3;
}
</style>
