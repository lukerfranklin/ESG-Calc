<script setup>
import { ref, watch, defineProps } from 'vue';

const props = defineProps({
	categoryScores: {
		type: Object,
		default: () => ({
			Environment: 0,
			Social: 0,
			Governance: 0,
		}),
	},
	maxScores: {
		type: Object,
		default: () => ({
			Environment: 100,
			Social: 100,
			Governance: 100,
		}),
	},
});

const chartOptions = ref({
	chart: {
		type: 'radar',
	},
	title: {
		text: 'Category Scores',
	},
	xaxis: {
		categories: Object.keys(props.categoryScores),
	},
});

const chartSeries = ref([
	{
		name: 'Score',
		data: [],
	},
]);

watch(
	() => props.categoryScores,
	(newScores) => {
		if (newScores) {
			const percentages = Object.entries(newScores).map(([category, score]) => {
				const maxScore = props.maxScores[category];
				return maxScore ? (score / maxScore) * 100 : 0;
			});
			chartSeries.value[0].data = percentages;
		}
	},
	{ immediate: true } // Ensure it runs initially
);
</script>

<template>
	<div class="score-graph">
		<apexchart
			type="radar"
			:options="chartOptions"
			:series="chartSeries"
		/>
	</div>
</template>

<style scoped>
.score-graph {
	max-width: 600px;
	margin: auto;
}
</style>
