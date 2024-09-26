<script>
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
