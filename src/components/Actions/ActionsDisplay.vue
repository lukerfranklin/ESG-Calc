<script>
export default {
	name: 'ActionsDisplay',

	props: {
		categoryScores: {
			type: Object,
			required: true,
		},
		categoryMaxScores: {
			type: Object,
			required: true,
		},
		userAnswers: {
			type: Object,
			required: true,
		},
	},

	methods: {
		findWeakestCategory() {
			const categoriesWithScores = Object.entries(this.categoryScores).map(
				([category, score]) => {
					const maxScore = this.categoryMaxScores[category];
					const percentage = score / maxScore;
					return { category, score, percentage };
				}
			);

			categoriesWithScores.sort((a, b) => a.percentage - b.percentage);
			return categoriesWithScores[0];
		},

		filterNegativeAnswers() {
			const weakestCategory = this.findWeakestCategory();
			return this.userAnswers[weakestCategory.category];
		},
	},
};
</script>

<template>
	<div v-if="findWeakestCategory()">
		<h2>Your Weakest Category: {{ findWeakestCategory().category }}</h2>
		<p>Areas to improve:</p>
		<ul>
			<li
				v-for="questionId in filterNegativeAnswers()"
				:key="questionId"
			>
				{{ questionId }}
			</li>
		</ul>
	</div>
</template>
