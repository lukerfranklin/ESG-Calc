<script>
import QuizQuestion from './QuizQuestion.vue';
import Questions from '@/assets/ESGquestions.json';
import { ref, watch } from 'vue';
// import TheSideNavigation from '../TheSideNavigation.vue';

export default {
	name: 'QuizField',
	components: {
		QuizQuestion,
	},
	props: {
		currentCategory: {
			type: String,
			required: true,
		},
		currentSubcategory: {
			type: String,
			required: true,
		},
	},
	setup(props, { emit }) {
		const questions = ref([]);
		const score = ref(0);

		watch(
			[() => props.currentCategory, () => props.currentSubcategory],
			([newCategory, newSubcategory]) => {
				const categoryQuestions =
					Questions.categries[newCategory]?.[newSubcategory];
				questions.value = Object.values(categoryQuestions);
			},
			{ imediate: true }
		);
		const updateScore = (newScore) => {
			score.value += newScore;
			emit('score-updated', score.value);
		};

		console.log('questions', Questions);

		return { questions, score, updateScore };
	},
};
</script>

<template>
	<div id="survey">
		<div v-if="currentCategory && currentSubcategory">
			<h2>Quiz: {{ currentCategory }} : {{ currentSubcategory }}</h2>
			<QuizQuestion
				v-for="(question, index) in questions"
				:key="index"
				:question="question"
				@answer-selected="updateScore"
			/>
		</div>
	</div>
</template>

<!-- <template>
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
</template> -->

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
