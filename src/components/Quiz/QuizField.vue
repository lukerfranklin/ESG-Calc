<script setup>
import QuizQuestion from './QuizQuestion.vue';
import Questions from '@/assets/ESGquestions.json';
import { ref, defineEmits, onMounted } from 'vue';

const categories = Questions.categories;
const emit = defineEmits(['score-updated']);

const totalScore = ref(0);
const categoryMaxScores = ref({});
const previousAnswers = ref({});

const assignIncrement = (impact) => {
	let increment = 0;
	switch (impact) {
		case 'high':
			increment += 7 / 3;
			break;
		case 'medium':
			increment += 4 / 3;
			break;
		case 'low':
			increment = 1;
			break;
	}
	return increment;
};

const updateScore = (impact, selectedAnswer, questionId) => {
	if (!selectedAnswer && previousAnswers.value[questionId]) {
		totalScore.value -= assignIncrement(impact);
	}
	if (selectedAnswer) {
		totalScore.value += assignIncrement(impact);
	}

	previousAnswers.value[questionId] = selectedAnswer;
	emit('score-updated', totalScore.value);
};

const calculateMaxScores = () => {
	const maxScores = {};

	for (const category in categories) {
		maxScores[category] = 0;
		for (const subcategory in categories[category]) {
			for (const question in categories[categories][subcategory]) {
				maxScores[category] += assignIncrement(question.impact);
			}
		}
	}
	categoryMaxScores.value = maxScores;
};

onMounted(() => calculateMaxScores);
</script>

<template>
	<div id="survey">
		<div
			v-for="(category, categoryName) in categories"
			:key="categoryName"
			class="category"
		>
			<h2 class="category-title">{{ categoryName }}</h2>

			<div
				v-for="(subcategory, subcategoryName) in category"
				:key="subcategoryName"
				class="subcategory"
			>
				<h3 class="subcategory-title">{{ subcategoryName }}</h3>

				<div
					v-for="(question, questionId) in subcategory"
					:key="`${categoryName}-${subcategoryName}-${questionId}`"
				>
					<QuizQuestion
						:question="question.question"
						:impact="question.impact"
						:questionId="`${categoryName}-${subcategoryName}-${questionId}`"
						@answer-selected="updateScore"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
#survey {
	padding: 20px;
	background-color: aliceblue;
	border-radius: 5px;
	max-width: 800px;
	margin: 0 auto;
	margin-top: 40px;
}

.category {
	margin-bottom: 20px;
}

.category-title {
	font-size: 24px;
	color: #2c3e50;
	border-bottom: 2px solid #2c3e50;
	padding-bottom: 10px;
}

.subcategory {
	margin-left: 20px;
	margin-bottom: 15px;
}

.subcategory-title {
	font-size: 20px;
	color: #34495e;
}

.subcategory-title + div {
	margin-top: 10px;
}
</style>
