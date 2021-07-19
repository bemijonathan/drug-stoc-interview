<template>
	<drug-stk-loader-vue v-if="loading" />
	<section v-else>
		<drug-stk-nav-vue />
		<search-bar-vue />
		<div class="flex mt-8">
			<section holder>
				<aside>
					<drug-stk-sidebar-vue />
				</aside>
			</section>

			<section class="w-full" holder>
				<drug-stk-sub-nav-vue />
				<drug-stk-task-container-vue />
			</section>
		</div>
	</section>
</template>

<script>
	import drugStkLoaderVue from "../components/drug-stk-loader.vue";
	import drugStkNavVue from "../components/drug-stk-nav.vue";
	import drugStkSidebarVue from "../components/drug-stk-sidebar.vue";
	import drugStkSubNavVue from "../components/drug-stk-sub-nav.vue";
	import drugStkTaskContainerVue from "../components/drug-stk-task-container.vue";
	import searchBarVue from "../components/search-bar.vue";

	export default {
		components: {
			drugStkSidebarVue,
			drugStkNavVue,
			drugStkSubNavVue,
			searchBarVue,
			drugStkTaskContainerVue,
			drugStkLoaderVue,
		},
		data() {
			return {
				loading: true,
			};
		},
		async mounted() {
			try {
				console.log(this);
				await Promise.all([
					await this.$store.dispatch("getTasks"),
					await this.$store.dispatch("getAnalytics"),
					await this.$store.dispatch("getTags"),
					await this.$store.dispatch("getAssignees"),
				]);
				this.loading = false;
			} catch (error) {
				await this.$store.error;
			}
		},
	};
</script>

<style>
	body {
		background: #f0f0f1;
	}

	[holder]:first-of-type {
		width: 25%;
	}

	[holder]:nth-of-type(2) {
		width: 75%;
		height: calc(100vh - 190px);
		overflow-y: scroll;
	}
</style>
