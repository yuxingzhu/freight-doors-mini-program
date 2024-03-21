<template>
	<view>
		<u-tabs :list="list" :scrollable="false" sticky :current="current" @click="click"></u-tabs>
	</view>
</template>

<script>
	export default {
		name: "page-tabs",
		props: {
			current: String
		},
		data() {
			return {
				list: [{
					name: 'R32储罐',
					url: '/pages/r32tank/R32tank'
				}, {
					name: 'R32缓冲罐',
					url: '/pages/r32tank/R32tank'
				}, {
					name: '灌注线',
					url: '/pages/perfusion/index'
				}]
			}
		},
		methods: {
			click(item) {
				uni.redirectTo({
					url: item.url
				})
			}
		}
	}
</script>
