<template>
	<teleport to="body">
		<section class="fixed bg-gray-600 bg-opacity-50 h-screen w-screen left-0 right-0 m-0 top-0 flex items-center justify-center ">
			<div
				class="modal w-1/3 mx-auto bg-white relative py-16"
			>
				<div></div>
				<div class="absolute top-0 p-2 w-full">
					<slot name="header">
						{{ title }}
					</slot>
				</div>

				<div
					class="text-sm px-2 relative"
					style="overflow-x:scroll overflowY:hidden"
				>
					<slot name="body"> 

					</slot>
				</div>
				<div class=" absolute bottom-0 p-3 w-full">
					<slot name="footer"> </slot>
				</div>

				<div></div>
			</div>
		</section>
	</teleport>
</template>

<script>
export default {
	props: ["title"],
};
</script>

<style></style>
