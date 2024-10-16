<script>
/*
Simple display to showcase user's scores
*/
export default {
	name: 'TheScoreDisplay',

	props: {
		// user's score accross all categories
		totalScore: {
			type: Number,
			required: true,
		},
		// user's score in each category
		categoryScores: {
			type: Object,
			required: true,
		},
		// maxmimum available scores in each category
		categoryMaxScores: {
			type: Object,
			required: true,
		},
	},
};
</script>

<template>
	<div class="score-display">
		<p>
			Your current total score: {{ Math.round(totalScore) }} /
			{{
				Math.round(
					categoryMaxScores.Environment +
						categoryMaxScores.Social +
						categoryMaxScores.Governance
				)
			}}
		</p>
		<p>
			Environment: {{ Math.round(categoryScores.Environment) }} /
			{{ Math.round(categoryMaxScores.Environment) }}
		</p>
		<p>
			Social: {{ Math.round(categoryScores.Social) }} /
			{{ Math.round(categoryMaxScores.Social) }}
		</p>
		<p>
			Governance: {{ Math.round(categoryScores.Governance) }} /
			{{ Math.round(categoryMaxScores.Governance) }}
		</p>
	</div>
</template>

<style scoped>
.score-display {
	margin-bottom: 20px;
	font-size: 1.5rem;
	font-weight: bold;
}
</style>
