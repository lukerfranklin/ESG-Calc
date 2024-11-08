<script setup>
import { ref, watch, defineProps } from 'vue';


const props = defineProps({
    // Score for each individual category
    categoryScores: {
        type: Object,
        default: () => ({
            Environment: 0,
            Social: 0,
            Governance: 0,
        }),
    },
    // Maximum available score for each category
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
        labels: {
            formatter: (val) => {
                return Math.round(val) + '%';
            },
        },
    },
    tooltip: {
        y: {
            formatter: (val) => {
                return Math.round(val) + '%';
            },
        },
    },
});

const chartSeries = ref([
    {
        name: 'Score',
        data: [],
    },
]);

watch(
    () => [ props.categoryScores, props.categoryMaxScores ],
    ([ newScores, newMaxScores ]) => {
        if (newScores && newMaxScores) {
            const percentages = Object.entries(newScores).map(([ category, score ]) => {
                const maxScore = newMaxScores[category] || 1;
                return maxScore ? (score / maxScore) * 100 : 0;
            });
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
    max-width: 675px;
    margin: auto;
}
</style>
