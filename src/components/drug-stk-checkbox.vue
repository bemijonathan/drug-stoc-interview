<template>
	<div class="mt-3 text-xs">
		<input
			type="checkbox"
			name="label"
			:id="label"
			v-model="model"
			@change="change"
			:value="itemValue"
			class="drug-stk-check-box"
		/>
		<label :for="label" class="ml-4"> {{ label }}</label>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
	props: ["label", "itemValue"],
	setup(props, context) {
		const model = ref("");

		const change = () => {
			context.emit("selectItem", props.itemValue);
		};

		return {
			model,
			change,
		};
	},

	methods: {},
};
</script>

<style scoped>
.drug-stk-check-box {
	appearance: none;
	color-adjust: exact;
	display: inline-block;
	vertical-align: middle;
	background-origin: border-box;
	user-select: none;
	flex-shrink: 0;
	height: 22px;
	width: 22px;
	color: #2563eb;
	background-color: #fff;
	border-color: #d1d5db;
	border-width: 1px;
	border-radius: 0.25rem;
}
.drug-stk-check-box:checked {
	border-color: transparent;
	background-color: currentColor;
	background-size: 100% 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
	
}
</style>
