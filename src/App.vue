<script>
import QuizField from './components/Quiz/QuizField.vue';
import TheNZGLogo from './components/TheNZGLogo.vue';
import TheHeader from './components/TheHeader.vue';
import { ref } from 'vue';
import TheScoreDisplay from './components/Score/TheScoreDisplay.vue';
import ScoreGraph from './components/Score/ScoreGraph.vue';

export default {
	name: 'App',
	components: {
		TheNZGLogo,
		QuizField,
		TheHeader,
		TheScoreDisplay,
		ScoreGraph,
	},
	setup() {
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
	<p>{{ categoryMaxScores }}</p>
	<QuizField
		@score-updated="updateTotalScore"
		@category-scores-update="updateCategoryScores"
		@max-scores-calculated="updateCategoryMaxScores"
	/>
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
</style>
