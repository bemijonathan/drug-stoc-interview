<template>
	<div class=" flex justify-between w-full">
		<ul class=" flex items-start">
			<!-- {{headers}} -->
			<li
				v-for="(h, i) in headers"
				:key="i + '22d2'"
				class="ml-8 pb-1 font-bold text-sm cursor-pointer"
				:class="
					activeTab === h.payload ? 'active__header' : 'non_active__header'
				"
				@click="selectCategory(h)"
			>
				{{ h.title }} ({{ h.count }})
			</li>
		</ul>

		<div>
			<button
				aria-label="button"
				@click="paginate('next')"
				:disabled="disabled"
				class="text-sm"
				style="color:#656565"
			>
				Next
			</button>
			|
			<button
				aria-label="button"
				@click="paginate('prev')"
				:disabled="disabled"
				class="text-sm"
				style="color:#656565"
			>
				Prev
			</button>
		</div>
	</div>
</template>

<script>
	import { ref } from "@vue/reactivity";
	import { useStore } from "vuex";
	import { useRoute, useRouter } from "vue-router";
	export default {
		setup() {
			// const headers = ref();
			const store = useStore();
			const router = useRouter();
			const route = useRoute();
			const activeTab = ref("ACTIVE_TASK");
			const disabled = ref(false);
			const selectCategory = async (payload) => {
				activeTab.value = payload.payload;
				// await store.dispatch("selectCategory", payload.tag);

				router.push("/?active=" + activeTab.value + "&page=1");
			};
			const paginate = async (type) => {
				disabled.value = true;

				debugger;
				if (
					type === "next" &&
					store.state.Tasks.meta.page_count > (+route.query.page || 1)
				) {
					router.push(
						"/?active=" +
							activeTab.value +
							"&page=" +
							((+route.query.page || 1) + 1)
					);
				} else if (type === "prev" && +route.query.page > 1) {
					router.push(
						"/?active=" +
							activeTab.value +
							"&page=" +
							((+route.query.page || 1) - 1)
					);
				}

				disabled.value = false;
			};

			return {
				activeTab,
				selectCategory,
				paginate,
			};
		},
		computed: {
			headers() {
				return this.$store.state.Headers;
			},
		},
		watch: {
			"$route.query": {
				deep: true,
				handler() {
					this.$store.dispatch("paginateTask", {
						page: this.$route.query.page,
						tag: this.$store.state.Headers.find(
							(e) => e.payload === this.activeTab
						).tag,
					});
				},
			},
		},
	};
</script>

<style scoped>
	.active__header {
		border-bottom: 4px solid #4b70d6;
		color: #3e3e3e;
	}
	.non_active__header {
		color: #9a9a9a;
	}

	button:disabled {
		background: slategrey;
		cursor: not-allowed;
	}
</style>
