<script>
import VueApexCharts from 'vue-apexcharts';

export default {
	name: 'ScoreRadar',
	components: {
		apexchart: VueApexCharts,
	},
	data() {
		return {
			series: [
				{
					name: 'Series 1',
					data: [80, 50, 30, 40, 100, 20],
				},
			],
			chartOptions: {
				chart: {
					height: 350,
					type: 'radar',
				},
				title: {
					text: 'Basic Radar Chart',
				},
				yaxis: {
					stepSize: 20,
				},
				xaxis: {
					categories: ['January', 'February', 'March', 'April', 'May', 'June'],
				},
			},
		};
	},
};
</script>

<template>
	<apexchart
		type="radar"
		height="350"
		:options="chartOptions"
		:series="series"
	></apexchart>
</template>
