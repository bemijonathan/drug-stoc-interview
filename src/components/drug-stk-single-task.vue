<template>
	<div class="bg-white flex items-center py-4 px-8 justify-between mt-3">
		<!-- {{ item }} -->
		<div class="">
			<i class="ri-book-2-line text-xl" style="color:#9A9A9A"></i>
		</div>
		<div class="w-1/4">
			<h3 class="text-sm leading-6 mb-2 font-medium" style=" color:#3E3E3E">
				{{ item.title }}
			</h3>

			<span
				class="custom cursor-pointer text-xs px-3 py-1  rounded-full"
				style="color:#707070"
			>
				{{ item.tag.name }}
			</span>
		</div>
		<div>
			<p class="text-sm" style="color:#3E3E3E">
				<b> N {{ item.price }} </b>
			</p>
			<p class="text-xs" style="color:#707070">Task price</p>
			<p class="text-xs mt-2" style="color:#707070">
				<b> Delivery: </b> within 3 days
			</p>
		</div>
		<div class="flex space-x-4 items-center">
			<div>
				<img
					alt="DrugStoc image"
					class="h-10 w-10 rounded-full"
					src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
				/>
			</div>
			<div>
				<p class="text-sm" style="color:#3E3E3E">
					<b> {{ item.assignee.name || "Adamu Musa" }} </b>
				</p>
				<p class="text-xs" style="color:#929292">Assigned to</p>
			</div>
		</div>
		<div>
			<button
				aria-label="button"
				class="verify flex  items-center py-2 px-4 space-x-3"
				style="width:160px"
			>
				<div class="h-2 w-2 bg-yellow-400 rounded-full"></div>
				<span class="font-bold text-xs" style="color:#3E3E3E">{{
					item.status.split("_").join(" ")
				}}</span>
			</button>
		</div>
		<div>
			<i class="ri-message-2-fill" style="color:#3E3E3E"></i>
		</div>
		<div class="">
			<div class="relative">
				<button
					aria-label="button"
					@click="dropdownOpen = !dropdownOpen"
					class="relative z-10 block rounded-md bg-white p-2 focus:outline-none"
				>
					<i class="ri-more-fill" style="color:#3E3E3E"></i>
				</button>
				<div
					v-if="dropdownOpen"
					class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20"
				>
					<div
						@click="
							$emit('setEditItem', item);
							dropdownOpen = false;
						"
						class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
					>
						Update
					</div>
					<div
						@click="
							$emit('setDeleteItem', item);
							dropdownOpen = false;
						"
						class="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
					>
						Delete
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["item"],
	data() {
		return {
			dropdownOpen: false,
		};
	},
};
</script>

<style>
.custom {
	color: #707070;
	background: #e2e2e2;
}

.marketing {
	color: #e24b4b;
	background: #ffcccc;
}

.integrations {
	color: #00a7ff;
	background: #c4ebff;
}
.verify {
	border: 1px solid #929292;
	border-radius: 0px 24px 24px 24px;
}
</style>
