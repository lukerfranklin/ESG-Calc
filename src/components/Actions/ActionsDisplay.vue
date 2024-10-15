<script>
import Questions from '@/assets/ESGquestions.json';

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
		adviceArray: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			questionsToImprove: [],
		};
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
			const category = weakestCategory.category;

			this.questionsToImprove = [];

			const subcategories = this.userAnswers[category];

			for (const [subcategory, questions] of Object.entries(subcategories)) {
				for (const [questionId, questionData] of Object.entries(questions)) {
					if (questionData.answer === 'no') {
						this.questionsToImprove.push({
							subcategory: subcategory,
							id: questionId,
							question: questionData.question,
							impact: questionData.impact,
						});
					}
				}
			}

			this.questionsToImprove.sort((a, b) => {
				const impactOrder = { high: 3, medium: 2, low: 1 };
				return impactOrder[b.impact] - impactOrder[a.impact];
			});
		},

		getAdvice() {
			const adviceList = [];
			const categories = Questions.categories;

			for (const question of this.questionsToImprove) {
				const { subcategory, id } = question;

				const adviceData = categories[question.category][subcategory][id];

				if (adviceData) {
					adviceList.push({
						question: adviceData.question,
						impact: adviceData.impact,
						advice: adviceData.advice,
						link: adviceData.link,
					});
				}
			}

			return adviceList;
		},
	},

	computed: {
		weakestCategory() {
			return this.findWeakestCategory();
		},
	},

	mounted() {
		this.filterNegativeAnswers();
	},
};
</script>

<template>
	<div v-if="weakestCategory">
		<h2>Your Weakest Category: {{ weakestCategory.category }}</h2>

		<h2>Advice Based on Your Answers:</h2>
		<ul>
			<li
				v-for="(advice, index) in adviceArray"
				:key="index"
			>
				{{ advice }}
			</li>
		</ul>
	</div>
</template>
