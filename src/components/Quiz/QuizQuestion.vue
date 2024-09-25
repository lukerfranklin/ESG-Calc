<script>
export default {
	name: 'QuizQuestion',
	props: {
		question: String,
		questionId: String,
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
			/>
			<label :for="`${questionId}-yes`">Yes</label>

			<input
				type="radio"
				:id="`${questionId}-no`"
				:name="questionId"
				:value="false"
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
	margin-right: 5px;
}
</style>
