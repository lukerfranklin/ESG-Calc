<script>
import d3 from 'd3';
import { ref, watch } from 'vue';

export default {
	name: 'scoreGraph',
	props: {
		score: {
			type: Number,
			required: true,
		},
		catagoryScores: {
			type: Array,
			required: true,
		},
		maxScores: {
			type: Object,
			required: true,
		},
	},
	setup(props) {
		drawBarChart(props);
		watch(() => props.categoryScores, drawBarChart, { immediate: true });
	},
};

const drawBarChart = (props) => {
	const barSvg = ref(null);
	const svg = d3.select(barSvg.value);
	svg.selectAll('*').remove();

	const width = 500;
	const height = 300;
	const margin = { top: 20, right: 40, bottom: 40, left: 40 };

	svg.attr('width', width).attr('height', height);

	const xScale = d3
		.scaleBand()
		.domain(props.catagoryScores.map((d) => d.catagory))
		.range([margin.left, width - margin.right])
		.padding(0.1);

	const yScale = d3
		.scaleLinear()
		.domain([0, 100])
		.range([height - margin.bottom, margin.top]);

	svg
		.append('g')
		.attr('transform', `translate(${margin.left}, 0)`)
		.call(
			d3
				.axisLeft(yScale)
				.ticks(5)
				.tickFormat((d) => `${Math.round(d * 100)}%`)
		);

	svg
		.selectAll('.bar')
		.data(props.catagoryScores)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', (d) => xScale(d.catagory))
		.attr('y', (d) => yScale(d.score / props.maxScore))
		.attr('width', xScale.bandwidth())
		.attr('height', (d) => yScale(0) - yScale(d.score / props.maxScore))
		.attr('fill', 'steelblue');

	return barSvg;
};
</script>

<template>
	<div
		ref="chart"
		class="score-chart"
	></div>
</template>
