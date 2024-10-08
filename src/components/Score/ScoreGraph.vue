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
	categoryMaxScores: {
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
	yaxis: {
		show: true,
		min: 0,
		max: 100,
	},
});

const chartSeries = ref([
	{
		name: 'Score',
		data: [],
	},
]);

watch(
	() => [props.categoryScores, props.categoryMaxScores],
	([newScores, newMaxScores]) => {
		if (newScores && newMaxScores) {
			const percentages = Object.entries(newScores).map(([category, score]) => {
				const maxScore = newMaxScores[category] || 1;
				const percentage = maxScore ? (score / maxScore) * 100 : 0;
				return percentage;
			});
			console.log(percentages);
			chartSeries.value = [
				{
					name: 'Score',
					data: percentages,
				},
			];

			chartOptions.value.xaxis.categories = Object.keys(newScores);
		}
	},
	{ immediate: true } // Ensure it runs initially
);

console.log('CHART DATA', chartSeries);
console.log('CHART ATTEMPT', chartSeries.value[0].data);
</script>

<template>
	<p>{{}}</p>
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
