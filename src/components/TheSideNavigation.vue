<script>
// import { select } from 'd3';
// import { ref, defineProps } from 'vue';

export default {
	name: 'TheSideNavigation',
	props: {
		categories: {
			type: Array,
			rewuired: true,
		},
		subcategories: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			currentCategory: null,
		};
	},
	methods: {
		selectCategory(category) {
			this.currentCategory = category;
			this.$emit('category-selected', category);
		},
		selectSubcategory(subcategory) {
			this.$emit('subcategory-selected', subcategory);
		},
	},
};

// defineProps({
// 	categories: {
// 		type: Array,
// 		required: true,
// 	},
// 	subcategories: {
// 		type: Array
// 	}
// });

// const currentCategory = ref(null);

// const selectCategory = (category) => {
// 	currentCategory.value = currentCategory.value === category ? null : category;
// };
</script>

<template>
	<nav id="side-nav">
		<ul>
			<li
				v-for="category in categories"
				:key="category"
				@click="selectCategory(category)"
			>
				{{ category }}
				<ul v-if="category === currentCategory">
					<li
						v-for="subcategory in subcategories"
						:key="subcategory"
						@click="selectSubcategory(subcategory)"
					>
						{{ subcategory }}
					</li>
				</ul>
				<!-- <button @click="selectCategory(category)">
					{{ category }}
				</button> -->
			</li>
		</ul>
	</nav>
</template>

<style scoped>
#side-nav {
	width: 200px;
	background-color: #6284a5;
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
	transition: background-color 0.3s, transform 0.2s;
}

#side-nav button:hover {
	background-color: #0056b3;
	transform: scale(1.05);
}
</style>
