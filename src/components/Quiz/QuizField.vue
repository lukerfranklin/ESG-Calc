<script setup>
import QuizQuestion from './QuizQuestion.vue';
import Questions from '@/assets/ESGquestions.json';
import { ref, defineEmits, onMounted, computed } from 'vue';

const categories = Questions.categories;
const emit = defineEmits([ 'score-updated' ]);

const totalScore = ref(0);
const categoryScores = ref({ Environment: 0, Social: 0, Governance: 0 });
const categoryMaxScores = ref({});
const previousAnswers = ref({});

const userAnswers = ref({
    Environment: {},
    Social: {},
    Governance: {},
});
const tabs = computed(() => Object.keys(categories));
const currentTab = ref(Object.keys(categories)[0]);


const assignIncrement = (impact) => {
    // assign score increment based upon weighting of question
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

const storeAnswers = (
    // store 'no' answers in order to return personalised advice
    selectedAnswer,
    questionId,
    category,
    subcategory,
    questionData
) => {
    if (!selectedAnswer) {
        if (!userAnswers.value[category][subcategory]) {
            userAnswers.value[category][subcategory] = {};
        }
        userAnswers.value[category][subcategory][questionId] = {
            question: questionData.question,
            advice: questionData.advice,
            impact: questionData.impact,
            link: questionData.link,
        };
    } else {
        if (userAnswers.value[category][subcategory]) {
            delete userAnswers.value[category][subcategory][questionId];
        }
    }
    emit('user-answers-update', userAnswers.value);
    getAdviceArray();
};

const getAdviceArray = () => {
    // build an array of advice based upon user's answers
    const adviceArray = [];

    for (const category in userAnswers.value) {
        for (const subcategory in userAnswers.value[category]) {
            for (const questionId in userAnswers.value[category][subcategory]) {
                const answerData = userAnswers.value[category][subcategory][questionId];
                if (answerData.advice) {
                    adviceArray.push(answerData.advice);
                }
            }
        }
    }
    emit('advice-updated', adviceArray);
    return adviceArray;
};

const updateScore = (impact, selectedAnswer, questionId, category) => {
    const increment = assignIncrement(impact);

    if (!selectedAnswer && previousAnswers.value[questionId]) {
        // decrease score if answer is changed from 'yes' to 'no'
        totalScore.value -= increment;
        categoryScores.value[category] -= increment;
    }

    if (selectedAnswer) {
        // increase score if answer is 'yes'
        totalScore.value += increment;
        categoryScores.value[category] += increment;
    }

    previousAnswers.value[questionId] = selectedAnswer;

    emit('score-updated', totalScore.value);
    emit('category-scores-update', categoryScores.value);
    emit('advice-updated', getAdviceArray());
};

const handleAnswerChange = (
    impact,
    selectedAnswer,
    questionId,
    category,
    subcategory
) => {
    const questionData = categories[category][subcategory][questionId];
    storeAnswers(selectedAnswer, questionId, category, subcategory, questionData);
    updateScore(impact, selectedAnswer, questionId, category);
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
    <b-tabs pills justified>
        <b-tab v-for="tab in tabs" :key="tab" :title="tab" :active="currentTab === tab" @click="currentTab = tab">
            <div
                v-for="(subcategory, subcategoryName) in categories[tab]"
                :key="subcategoryName"
            >
                <h3 class="subcategory-title">{{ subcategoryName }}</h3>
            </div>
        </b-tab>
    </b-tabs>

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

                <b-row class="g-3">
                    <b-col cols="12" v-for="(question, questionId) in subcategory" :key="`${categoryName}-${subcategoryName}-${questionId}`">
                        <QuizQuestion
                            :question="question.question"
                            :impact="question.impact"
                            :questionId="`${categoryName}-${subcategoryName}-${questionId}`"
                            :category="categoryName"
                            :subcategory="subcategoryName"
                            @answer-selected="handleAnswerChange(
                            question.impact,
                            selectedAnswer,
                            questionId,
                            categoryName,
                            subcategoryName
                        )"
                        />
                    </b-col>
                </b-row>
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
    margin: 40px auto 0;
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
