<script setup>
import QuizQuestion from './QuizQuestion.vue';
import Questions from '@/assets/ESGquestions.json';
import { ref, defineEmits, onMounted } from 'vue';
// import TheSideNavigation from '../TheSideNavigation.vue';

const categories = Questions.categories;
const emit = defineEmits(['score-updated']);

const totalScore = ref(0);
const categoryScores = ref({ Environment: 0, Social: 0, Governance: 0 });
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

const initialiseScores = () => {
	for (const category in categories) {
		categoryScores.value[category] = 0;
	}
};

const updateScore = (impact, selectedAnswer, questionId, category) => {
	const increment = assignIncrement(impact);

	if (!selectedAnswer && previousAnswers.value[questionId]) {
		totalScore.value -= increment;
		categoryScores.value[category] -= increment;
	}

	if (selectedAnswer) {
		totalScore.value += increment;
		categoryScores.value[category] += increment;
	}

	previousAnswers.value[questionId] = selectedAnswer;

	emit('score-updated', totalScore.value);
	emit('category-scores-update', categoryScores.value);
};

const calculateMaxScores = () => {
	const maxScores = {};

	for (const category in categories) {
		maxScores[category] = 0;
		for (const subcategory in categories[category]) {
			const questions = categories[category][subcategory];
			for (const questionKey in questions) {
				const question = questions[questionKey];
				maxScores[category] += assignIncrement(question.impact);
			}
		}
	}
	categoryMaxScores.value = maxScores;
	emit('max-scores-calculated', categoryMaxScores.value);
};

onMounted(() => {
	initialiseScores();
	calculateMaxScores();
});
</script>

<template>
	<!-- <TheSideNavigation :categories="categories" /> -->
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
						:category="categoryName"
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
	border-bottom: 2px solid #232b59;
	padding-bottom: 10px;
}

.subcategory {
	background-color: #9ecfdc;
	padding: 15px;
	border-radius: 10px;
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
