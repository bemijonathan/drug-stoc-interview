<template>
	<!-- confirm delete -->
	<drug-stk-modal-vue v-if="openDelete" style="height:100px">
		<template v-slot:header>
			<div class="text-2xl text-center">
				Confirm Delete
			</div>
			<div class="text-center">
				Do you really want to delete this task
			</div>
		</template>
		<template v-slot:body>
			<div class=" text-center mt-20">
				<i
					class="ri-error-warning-fill text-red-600 "
					style="font-size:120px"
				></i>
			</div>
		</template>
		<template v-slot:footer>
			<button
				class="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				@click="deleteTask"
			>
				Delete
			</button>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
				@click="openDelete = false"
			>
				Cancel
			</button>
		</template>
	</drug-stk-modal-vue>

	<update-tasks-vue
		:task="editItem"
		v-if="openEdit"
		@closeModal="openEdit = false"
	>
	</update-tasks-vue>
	<section class="mx-8" container>
		<div v-if="allItems.length" class="text-center">
			-- No Next Task Found --
		</div>
		<div>
			<div class="mt-9 mb-1 flex items-center" v-if="getCurrentItem.length">
				<p class="text-sm uppercase" style="color:#9A9A9A">
					<b> current </b>
				</p>
				<p
					class="bg-gray-400 h-3 w-3 rounded-full flex items-center justify-center text-white p-1 ml-1"
					style="background:#9A9A9A; font-size:7px height:12px; width:12px"
				>
					i
				</p>
			</div>
			<div class="current" v-if="getCurrentItem.length">
				<drug-stk-single-task-vue
					v-for="(item, i) in getCurrentItem"
					:key="i"
					:item="item"
					@setDeleteItem="setDeleteItem"
					@setEditItem="setEditItem"
				/>
			</div>
		</div>

		<div v-if="getNextItems.length">
			<div class="mt-9 mb-1" style="color:#9A9A9A">
				<p class="text-sm"><b> NEXT </b></p>
			</div>
			<div class="next" v-if="getNextItems.length">
				<drug-stk-single-task-vue
					v-for="(item, i) in getNextItems"
					:key="i"
					:item="item"
				/>
			</div>
		</div>
	</section>
</template>

<script>
import drugStkModalVue from "./drug-stk-modal.vue";
import drugStkSingleTaskVue from "./drug-stk-single-task.vue";
import request from "../utils/request";
import updateTasksVue from "./update-tasks.vue";
export default {
	setup() {},
	data() {
		return {
			openDelete: false,
			toDeleteTask: {},
			openEdit: false,
			editItem: {},
		};
	},
	components: {
		drugStkSingleTaskVue,
		drugStkModalVue,
		updateTasksVue,
	},
	computed: {
		getCurrentItem() {
			return this.$store.getters.getCurrentTask;
		},
		getNextItems() {
			return this.$store.getters.getOtherTask;
		},
		allItems() {
			return this.$store.state.Tasks;
		},
	},
	methods: {
		setDeleteItem(task) {
			this.openDelete = true;
			this.toDeleteTask = task;
		},
		async deleteTask() {
			await request.delete("/api/tasks/" + this.toDeleteTask.id);
			await this.$store.dispatch("getTasks");
			await this.$store.dispatch("getAnalytics");
			this.openDelete = false;
		},
		setEditItem(task) {
			this.openEdit = true;
			this.editItem = task;
		},
	},
};
</script>

<style scoped>
[container] {
	height: calc(100vh - 190px);
}
</style>
