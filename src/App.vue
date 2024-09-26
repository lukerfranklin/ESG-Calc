<script>
import QuizField from './components/Quiz/QuizField.vue';
import TheNZGLogo from './components/TheNZGLogo.vue';
import TheHeader from './components/TheHeader.vue';
import TheScoreDisplay from './components/TheScoreDisplay.vue';
import { ref } from 'vue';

export default {
	name: 'App',
	components: {
		TheNZGLogo,
		QuizField,
		TheHeader,
		TheScoreDisplay,
	},
	setup() {
		const totalScore = ref(0);

		const updateTotalScore = (newScore) => (totalScore.value = newScore);

		return {
			totalScore,
			updateTotalScore,
		};
	},
};
</script>

<template>
	<TheNZGLogo />
	<TheHeader />
	<TheScoreDisplay :totalScore="totalScore" />
	<QuizField @score-updated="updateTotalScore" />
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
