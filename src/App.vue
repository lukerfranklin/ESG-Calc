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
		const categories = Questions.categories;
		const totalScore = ref(0);
		const categoryScores = ref({
			Environment: 0,
			Social: 0,
			Governance: 0,
		});
		const categoryMaxScores = ref({});
		const updateTotalScore = (newScore) => (totalScore.value = newScore);
		const updateCategoryScores = (newCategoryScores) => {
			categoryScores.value = { ...newCategoryScores };
		};
		const updateCategoryMaxScores = (newMaxScores) => {
			categoryMaxScores.value = { ...newMaxScores };
		};

		return {
			totalScore,
			categories,
			updateTotalScore,
			categoryScores,
			categoryMaxScores,
			updateCategoryScores,
			updateCategoryMaxScores,
		};
	},
};
</script>

<template>
	<div id="app-container">
		<TheSideNavigation :categories="categories" />
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
	color: #2c3e50;
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
