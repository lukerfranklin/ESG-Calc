<script>
import QuizField from './components/Quiz/QuizField.vue';
import TheNZGLogo from './components/TheNZGLogo.vue';
import TheHeader from './components/TheHeader.vue';
import TheScoreDisplay from './components/Score/TheScoreDisplay.vue';
import ScoreGraph from './components/Score/ScoreGraph.vue';
import { ref } from 'vue';
import TheSideNavigation from './components/TheSideNavigation.vue';
import Questions from '@/assets/ESGquestions.json';

export default {
	name: 'App',
	components: {
		TheNZGLogo,
		QuizField,
		TheHeader,
		TheScoreDisplay,
		ScoreGraph,
		TheSideNavigation,
	},
	setup() {
		const categories = Object.keys(Questions.categories);
		const subcategories = ref([]);

		const totalScore = ref(0);
		const categoryScores = ref({
			Environment: 0,
			Social: 0,
			Governance: 0,
		});
		const categoryMaxScores = ref({});

		const currentCategory = ref(categories[0]);
		const currentSubcategory = ref(null);

		const updateTotalScore = (newScore) => (totalScore.value = newScore);
		const updateCategoryScores = (newCategoryScores) => {
			categoryScores.value = { ...newCategoryScores };
		};
		const updateCategoryMaxScores = (newMaxScores) => {
			categoryMaxScores.value = { ...newMaxScores };
		};
		const updateSubcategories = (category) => {
			currentCategory.value = category;
			subcategories.value = Object.keys(Questions.categories[category]);
			currentSubcategory.value = subcategories.value[0];
		};

		return {
			totalScore,
			categories,
			subcategories,
			categoryScores,
			categoryMaxScores,
			currentCategory,
			currentSubcategory,
			updateTotalScore,
			updateCategoryScores,
			updateCategoryMaxScores,
			updateSubcategories,
		};
	},
};
</script>

<template>
	<div id="app-container">
		<TheSideNavigation
			:categories="categories"
			:subcategories="subcategories"
			@category-selected="updateSubcategories"
			@subcategory-selected="selectedSubcategory = $event"
		/>
		<div id="app-content">
			<TheNZGLogo />
			<TheHeader />
			<ScoreGraph
				:categoryScores="categoryScores"
				:categoryMaxScores="categoryMaxScores"
			/>
			<TheScoreDisplay
				:totalScore="totalScore"
				:categoryScores="categoryScores"
				:categoryMaxScores="categoryMaxScores"
			/>
			<QuizField
				:currentCategory="currentCategory"
				:currentSubcategory="currentSubcategory"
				@score-updated="updateTotalScore"
				@category-scores-update="updateCategoryScores"
				@max-scores-calculated="updateCategoryMaxScores"
			/>
		</div>
	</div>
</template>

<style>
#app {
	font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #232b59;
	margin-top: 60px;
}

#app-container {
	display: flex;
}

#app-content {
	flex: 1;
	padding: 20px;
	margin-left: 220px;
}
</style>
