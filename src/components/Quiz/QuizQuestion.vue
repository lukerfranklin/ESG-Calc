<script>
export default {
	name: 'QuizQuestion',
	props: {
		question: String,
		impact: String,
		questionId: String,
		category: String,
	},
	emits: ['answer-selected'],
	methods: {
		handleAnswerChange(e) {
			const selectedAnswer = e.target.value === 'true';
			this.$emit(
				'answer-selected',
				this.impact,
				selectedAnswer,
				this.questionId,
				this.category
			);
		},
	},
};
</script>

<template>
	<div class="survey-question">
		<p>{{ question }}</p>

		<div class="options">
			<input
				type="radio"
				:id="`${questionId}-yes`"
				:name="questionId"
				:value="true"
				@change="handleAnswerChange"
			/>
			<label :for="`${questionId}-yes`">Yes</label>

			<input
				type="radio"
				:id="`${questionId}-no`"
				:name="questionId"
				:value="false"
				@change="handleAnswerChange"
			/>
			<label :for="`${questionId}-no`">No</label>
		</div>
	</div>
</template>

<style scoped>
.survey-question {
	background-color: #ffffff;
	border: 1px solid #ddd;
	border-radius: 15px;
	padding: 15px;
	margin-bottom: 10px;
}

.survey-question p {
	font-size: 16px;
	color: #333;
}

.options {
	margin-top: 10px;
}

input[type='radio'] {
	margin: 10px;
	vertical-align: middle;
}
</style>
