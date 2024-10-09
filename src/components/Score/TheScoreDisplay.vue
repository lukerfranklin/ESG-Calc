<script>
// import ScoreGraph from './oldgraph.vue';

export default {
	name: 'TheScoreDisplay',
	// components: {
	// 	ScoreGraph,
	// },
	props: {
		totalScore: {
			type: Number,
			required: true,
		},
		categoryScores: {
			type: Object,
			required: true,
		},
		categoryMaxScores: {
			type: Object,
			required: true,
		},
	},
};
</script>

<template>
	<div class="score-display">
		<!-- <ScoreGraph
			:key="JSON.stringify(categoryScores)"
			:categoryScores="categoryScores"
			:maxScores="categoryMaxScores"
		/> -->
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
