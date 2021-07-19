<template>
	<div>
		<drug-stk-modal-vue :title="'Hello'">
			<!-- {{ task }} -->
			<template v-slot:header>
				<div>
					<h3 class="text-center pt-3">
						Update Tasks
					</h3>
				</div>
			</template>

			<template v-slot:footer>
				<button
					aria-label="button"
					class="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					@click="$emit('closeModal')"
				>
					Close
				</button>
				<button
					aria-label="button"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
					@click="updateTask"
				>
					Submit
				</button>
				<!-- {{ task.id }} -->
			</template>

			<template v-slot:body>
				<form>
					<div class="w-full">
						<form
							class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-between w-full"
						>
							<!-- {{ t.task.tag }} -->
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
										v-model="t.task.title"
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
										v-model.number="t.task.price"
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
										:itemValue="t.task.current_task"
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
										v-model="t.task.tag.id"
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
										v-model="t.task.status"
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
										v-model="t.task.assignee.id"
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
	</div>
</template>

<script>
import drugStkCheckboxVue from "./drug-stk-checkbox.vue";
import drugStkModalVue from "./drug-stk-modal.vue";
import request from "../utils/request";
import useVuelidate from "@vuelidate/core";
import { ref } from "@vue/reactivity";
import { required } from "@vuelidate/validators";

export default {
	props: ["task"],
	setup(props) {
		const t = ref(props);

		return {
			t,
			v$: useVuelidate(),
		};
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
		};
	},
	validations() {
		return {
			t: {
				task: {
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
				},
			},
		};
	},
	methods: {
		setPriority(value) {
			this.priority = value;
		},
		async updateTask() {
			debugger;
			console.log(this.v$);
			// if (this.v$.t.task.$silentErrors.length) {
			// 	this.v$.$silentErrors.forEach((e) => {
			// 		this.$toast.error(e.$property + " " + e.$message);
			// 	});
			// 	return;
			// }
			try {
				const data = {
					...this.t.task,
					tag: this.t.task.tag.id || this.t.task.tag,
					assignee: this.t.task.assignee.id || this.t.task.assignee,
					// status: this.t.task.status_id,
				};
				await request.patch("/api/tasks/" + this.task.id, data);
				await this.$store.dispatch("getTasks");
				await this.$store.dispatch("getAnalytics");
				this.$emit("closeModal");
				this.$toast.success("succesfully updated a Task");
			} catch (error) {
				this.$toast.error("An error occured");
				console.log(error);
			}
		},
	},
	computed: {
		tags() {
			return this.$store.state.Tags;
		},
	},
};
</script>
