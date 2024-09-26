<script>
import { ref } from 'vue';

export default {
	name: 'TheScoreDisplay',
	props: {
		score: {
			type: Number,
			required: true,
		},
	},
};

const totalScore = ref(0);

const updateScore = (impact, selectedAnswer) => {
	if (!selectedAnswer) {
		return totalScore.value;
	}
	switch (impact) {
		case 'high':
			totalScore.value += 7 / 3;
			break;
		case 'medium':
			totalScore.value += 4 / 3;
			break;
		case 'low':
			totalScore.value++;
			break;
	}
	return totalScore.value;
};
</script>

<template>
	<div class="score-display">
		<p>Your current score: {{ score }}</p>
	</div>
</template>

<style scoped>
.score-display {
	margin-bottom: 20px;
	font-size: 1.5rem;
	font-weight: bold;
}
</style>
