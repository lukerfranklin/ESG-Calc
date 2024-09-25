<script>
import QuizField from './components/Quiz/QuizField.vue';
import TheNZGLogo from './components/TheNZGLogo.vue';
import TheHeader from './components/TheHeader.vue';

export default {
	name: 'App',
	components: {
		TheNZGLogo,
		QuizField,
		TheHeader,
	},
};
</script>

<template>
	<TheNZGLogo />
	<TheHeader />
	<QuizField />
</template>

<style>
#app {
	font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
