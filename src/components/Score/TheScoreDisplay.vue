<script>
import ScoreGraph from './ScoreGraph.vue';

export default {
	name: 'TheScoreDisplay',
	props: {
		totalScore: {
			type: Number,
			required: true,
		},
	},
};
</script>

<template>
	<div class="score-display">
		<ScoreGraph
			:score="totalScore"
			:categoryScores="categoryScores"
			:maxScores="categoryMaxScores"
		/>
		<p>Your current score: {{ totalScore }}</p>
	</div>
</template>

<style scoped>
.score-display {
	margin-bottom: 20px;
	font-size: 1.5rem;
	font-weight: bold;
}
</style>
