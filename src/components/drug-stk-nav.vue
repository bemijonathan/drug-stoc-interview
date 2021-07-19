<template>
	<drug-stk-modal-vue :title="'Hello'" v-if="open">
		<template v-slot:header>
			<div>
				<h3 class="text-center pt-3">
					Add a new Task
				</h3>
			</div>
		</template>

		<template v-slot:footer>
			<button
				aria-label="button"
				class="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				@click="open = false"
				:disabled="loading"
			>
				Close
			</button>
			<button
				aria-label="button"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
				@click="save"
				:disabled="loading"
			>
				Submit
			</button>
		</template>

		<template v-slot:body>
			<form>
				<div class="w-full">
					<form
						class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between w-full"
					>
						<div class="w-2/5">
							<div class="mb-4">
								<label
									class="block text-gray-700 text-sm font-bold mb-2"
									for="title"
								>
									title
								</label>
								<input
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="title"
									type="text"
									placeholder="Title"
									v-model="title"
								/>
							</div>
							<div class="mb-4">
								<label
									class="block text-gray-700 text-sm font-bold mb-2"
									for="price"
								>
									Price
								</label>
								<input
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
									id="price"
									type="price"
									placeholder="50.00"
									v-model.number="price"
								/>
							</div>
							<div class="mb-4">
								<label
									class="block text-gray-700 text-sm font-bold mb-2"
									for="priority"
								>
									Priority
								</label>

								<drug-stk-checkbox-vue
									:label="'High'"
									:itemValue="false"
									@selectItem="setPriority"
								/>
							</div>
						</div>
						<div class="w-2/5">
							<div class="mb-4">
								<label
									class="block text-gray-700 text-sm font-bold mb-2"
									for="tag"
								>
									Tag
								</label>
								<select
									name="tag"
									id="tag"
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									v-model="tag"
								>
									<option value="" disabled selected> Choose a tag </option>
									<option :value="opt.id" v-for="opt in tags" :key="opt.id">
										{{ opt.name }}</option
									>
								</select>
							</div>

							<div class="mb-4">
								<label
									class="block text-gray-700 text-sm font-bold mb-2"
									for="status"
								>
									Status
								</label>
								<select
									name="status"
									id="status"
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									v-model="status_id"
								>
									<option value="" disabled selected>
										Choose Task Status
									</option>
									<option
										:value="opt.value"
										v-for="opt in status"
										:key="opt.id"
									>
										{{ opt.label }}</option
									>
								</select>
							</div>

							<div class="mb-4">
								<label
									class="block text-gray-700 text-sm font-bold mb-2"
									for="assignee"
								>
									Assign Task To
								</label>
								<select
									name="assignee"
									id=""
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									v-model="assignee"
								>
									<option value="" disabled selected> Assign Task To </option>
									<option
										:value="opt.id"
										v-for="opt in $store.state.assignees"
										:key="opt.id"
									>
										{{ opt.name }}</option
									>
								</select>
							</div>
						</div>
					</form>
				</div>
			</form>
		</template>
	</drug-stk-modal-vue>
	<div class="logo flex items-center w-full justify-between  py-5">
		<img
			src="https://mlunljhpcxk5.i.optimole.com/tEejJp0.3RiX~22d0/w:auto/h:auto/q:auto/https://www.drugstoc.com/wp-content/uploads/2019/06/logo-new.png"
			width="200"
			class="-my-5"
		/>
		<div class="">
			<button
				aria-label="button"
				class="bg-blue-500 flex justify-between space-x-2 items-center  py-1 px-6 rounded-bl-full rounded-tr-full focus:outline-none rounded-br-full rounded-tl-none font-bold"
				@click="open = true"
			>
				<span class="text-sm text-white">Add New Task</span>
				<span>
					<i class="ri-add-line text-white text-lg"></i>
				</span>
			</button>
		</div>
	</div>
</template>

<script>
import drugStkCheckboxVue from "./drug-stk-checkbox.vue";
import drugStkModalVue from "./drug-stk-modal.vue";
import request from "../utils/request";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
	setup() {
		return { v$: useVuelidate() };
	},
	components: {
		drugStkModalVue,
		drugStkCheckboxVue,
	},
	data() {
		return {
			open: false,
			priority: false,
			status: [
				{
					label: "Waiting Approval",
					value: "waiting_approval",
				},
				{
					label: "In Progress",
					value: "in_progress",
				},
				{
					label: "In Review",
					value: "in_review",
				},
				{
					label: "Verify",
					value: "verify",
				},
				{
					label: "Archived",
					value: "archived",
				},
				{
					label: "Closed",
					value: "closed",
				},
			],
			title: "",
			price: "",
			tag: "",
			assignee: "",
			status_id: "",
			loading: false,
		};
	},
	validations() {
		return {
			tag: {
				required,
			},
			assignee: {
				required,
			},
			status: {
				required,
			},

			title: {
				required,
			},
			price: {
				required,
				min: 0,
			},
		};
	},
	methods: {
		setPriority(value) {
			this.priority = value;
		},
		async save() {
			console.log(this.v$);
			debugger;

			if (this.v$.$silentErrors.length) {
				this.v$.$silentErrors.forEach((e) => {
					this.$toast.error(e.$property + " " + e.$message);
				});
				return;
			}
			try {
				this.loading = true;
				const data = {
					title: this.title,
					price: this.price,
					tag: this.tag,
					assignee: this.assignee,
					current_task: true,
					status: this.status_id,
				};
				await request.post("/api/tasks", data);
				await this.$store.dispatch("getTasks");
				await this.$store.dispatch("getAnalytics"), (this.open = false);
				this.loading = false;
				this.$toast.success("succesfully created a Task");
			} catch (error) {
				console.log(error);
				this.$toast.error("An error occured");
				this.loading = false;
			}
		},
	},
	computed: {
		tags() {
			return this.$store.state.Tags;
		},
		methods: {
			setPriority(value) {
				this.priority = value;
			},
		},
		computed: {
			tags() {
				return this.$store.state.Tags;
			},
		},
	},
};
</script>

<style scoped></style>
