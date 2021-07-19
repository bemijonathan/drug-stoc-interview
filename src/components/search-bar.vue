<template>
	<div class=" flex justify-between bg-white px-4 py-5">
		<div class="relative w-2/3">
			<input
				type="text"
				placeholder="Search Keyword"
				class="border-none focus:outline-none w-full text-base pl-8"
				style="color:#6F7070"
				v-model="term"
			/>
			<div class="absolute top-0">
				<i class="ri-search-line" style="color:#CBCBCB"></i>
			</div>
		</div>
		<div
			class="flex items-center justify-center border-l border-1 relative"
			style="border-color:#6F7070"
		>
			<div
				class="ml-8 text-sm cursor-pointer"
				style="color:#6F7070"
				@click="showSort = !showSort"
			>
				Sort by
			</div>
			<div class="sort-bars ml-4 cursor-pointer" @click="showSort = !showSort">
				<div v-for="i in 3" :key="i + '3%$%'" class="mt-1"></div>
			</div>

			<div
				class="bg-white rounded-md absolute z-10 top-10 px-4 py-2 w-full"
				v-if="showSort"
			>
				<div
					class="cursor-pointer"
					@click="
						showSort = false;
						$store.commit('sortTasks', { title: true });
					"
				>
					Title
				</div>
				<div
					class="cursor-pointer"
					@click="
						showSort = false;
						$store.commit('sortTasks', { price: true });
					"
				>
					Price
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			term: "",
			showSort: false,
		};
	},
	watch: {
		term() {
			this.$store.commit("searchTask", this.term);
		},
	},
};
</script>

<style scoped>
.sort-bars div {
	height: 2px;
	background: #6f7070;
}

.sort-bars div:first-of-type {
	width: 26px;
}
.sort-bars div:nth-of-type(2) {
	width: 18px;
}
.sort-bars div:nth-of-type(3) {
	width: 11px;
}
</style>
