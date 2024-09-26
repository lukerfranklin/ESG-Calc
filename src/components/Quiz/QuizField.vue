<script setup>
import QuizQuestion from './QuizQuestion.vue';
import Questions from '@/assets/ESGquestions.json';
import { ref, defineEmits } from 'vue';

const categories = Questions.categories;
const emit = defineEmits(['score-updated']);

const totalScore = ref(0);

const updateScore = (impact, selectedAnswer) => {
	if (!selectedAnswer) {
		return;
	}
	switch (impact) {
		case 'high':
			totalScore.value += 7 / 3;
			break;
		case 'medium':
			totalScore.value += 4 / 3;
			break;
		case 'low':
			totalScore.value++;
			break;
	}
	console.log('updated score: ', totalScore.value);
	emit('score-updated', totalScore.value);
};

// const handleAnswerSelected = (impact, selectedAnswer) => {
// 	updateScore(impact, selectedAnswer)
// }
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
