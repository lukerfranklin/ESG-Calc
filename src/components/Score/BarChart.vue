<script>
import * as d3 from 'd3';
import { ref, watch, onMounted } from 'vue';

export default {
	name: 'ScoreGraph',
	props: {
		score: {
			type: Number,
			required: true,
		},
		categoryScores: {
			type: Array,
			required: true,
		},
		maxScores: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		const barSvg = ref(null); // Reference for the chart container

		// Function to draw the bar chart
		const drawBarChart = () => {
			if (!barSvg.value) return;

			const svg = d3.select(barSvg.value).select('svg'); // Select the existing SVG or create one if it doesn't exist

			if (svg.empty()) {
				// Create SVG element only if it doesn't exist
				svg.append('svg').attr('width', 500).attr('height', 300);
			}

			const width = 500;
			const height = 300;
			const margin = { top: 20, right: 40, bottom: 40, left: 40 };

			// Clear previous content
			svg.selectAll('*').remove();

			const xScale = d3
				.scaleBand()
				.domain(props.categoryScores.map((d) => d.category))
				.range([margin.left, width - margin.right])
				.padding(0.1);

			const yScale = d3
				.scaleLinear()
				.domain([0, d3.max(props.categoryScores, (d) => d.score)]) // Adjust max based on actual data
				.range([height - margin.bottom, margin.top]);

			svg
				.append('g')
				.attr('transform', `translate(0, ${height - margin.bottom})`)
				.call(d3.axisBottom(xScale)); // Add X-axis

			svg
				.append('g')
				.attr('transform', `translate(${margin.left}, 0)`)
				.call(d3.axisLeft(yScale)); // Add Y-axis

			svg
				.selectAll('.bar')
				.data(props.categoryScores)
				.enter()
				.append('rect')
				.attr('class', 'bar')
				.attr('x', (d) => xScale(d.category))
				.attr('y', (d) => yScale(d.score))
				.attr('width', xScale.bandwidth())
				.attr('height', (d) => height - margin.bottom - yScale(d.score))
				.attr('fill', 'steelblue');
		};

		// Watch for changes in categoryScores
		watch(() => props.categoryScores, drawBarChart, { immediate: true });

		// Initial call to draw the chart
		onMounted(drawBarChart);

		return {
			barSvg, // Return the ref to bind it in the template
		};
	},
};
</script>

<template>
	<div
		ref="barSvg"
		class="score-chart"
	></div>
</template>
