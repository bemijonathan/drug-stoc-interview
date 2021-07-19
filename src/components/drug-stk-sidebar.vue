<template>
	<div class="bg-white py-8 px-6" sidebar>
		<h3 class="text-xl mb-6">Tags</h3>

		<div>
			<drug-stk-checkbox-vue
				v-for="(tags, i) in tags"
				:key="i + 'sdfdf'"
				@selectItem="setTags"
				:label="tags.name"
				:itemValue="tags.slug"
			/>
		</div>

		<h3 class="text-xl mt-11 mb-6">Task Price Range</h3>
		<div>
			<drug-stk-checkbox-vue
				v-for="(prices, i) in priceRange"
				:key="i + 'sdfsfgfd'"
				@selectItem="setPriceRange"
				:label="
					prices.higherRange !== Infinity
						? `N${prices.lowerRange} - N${prices.higherRange}`
						: `Above N${prices.lowerRange}`
				"
				:itemValue="i"
			/>
		</div>
	</div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import drugStkCheckboxVue from "./drug-stk-checkbox.vue";
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
	components: {
		drugStkCheckboxVue,
	},
	setup() {
		const data = reactive({
			selectedTags: [],
			selectedPrice: [],
			tags: [],
			priceRange: [
				{
					lowerRange: 0,
					higherRange: 100,
				},
				{
					lowerRange: 100,
					higherRange: 300,
				},
				{
					lowerRange: 301,
					higherRange: 900,
				},
				{
					lowerRange: 900,
					higherRange: Infinity,
				},
			],
		});

		const store = useStore();

		// onMounted(async () => {
		// 	await store.dispatch("getTags");
		// });

		const tags = computed(() => store.state.Tags);

		const setTags = (value) => {
			console.log(value);
			if (data.selectedTags.includes(value)) {
				data.selectedTags = data.selectedTags.filter((e) => e !== value);
			} else {
				data.selectedTags.push(value);
			}
			store.commit("selectTag", data.selectedTags);
		};

		const setPriceRange = (value) => {
			console.log(value);
			if (data.selectedPrice.includes(value)) {
				data.selectedPrice = data.selectedPrice.filter((e) => e !== value);
			} else {
				data.selectedPrice.push(value);
			}
			store.commit("selectPrice", data.selectedPrice);
		};

		return {
			...data,
			setTags,
			setPriceRange,
			tags,
		};
	},
	watch: {
		"data.selectedPrice"() {
			this.store.commit("selectPrice", this.selectedPrice);
		},
		selectedTags: {
			deep: true,
			handler() {
				console.log("changing");
				this.$store.commit("selectTag", this.selectedTags);
			},
		},
	},
};
</script>

<style>
[sidebar] {
	max-height: 100vh;
	overflow-y: scroll;
}
::-webkit-scrollbar {
	width: 10px;
}
::-webkit-scrollbar-track {
	background: #f0f0f1;
}
::-webkit-scrollbar-thumb {
	background: #f0f0f1;
}
</style>
