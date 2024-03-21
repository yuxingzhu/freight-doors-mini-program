<template>
	<view>
		<view class="page_tasg" v-for="(item,index) in list">
			<u-tag :text="item.name" shape="circle" class="utag" :bgColor="item.status?'#009AFE':'#E5E5E5'"
				:borderColor="item.status?'#009AFE':'#E5E5E5'" :color="item.status?'#ffffff':'#141414'"
				@click='chooseTags(item)'></u-tag>
		</view>
	</view>
</template>

<script>
	export default {
		name: "page-card",
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		methods: {
			chooseTags(item) {
				this.$emit('clickTags', item)
			}
		}
	}
</script>

<style>
	.page_tasg{
		display: inline-block;
		text-align: center;
		font-size: 6rpx !important;
		padding: 0 6rpx 10rpx 6rpx !important;
		margin-top: 0 8rpx !important;
	}
</style>
