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
