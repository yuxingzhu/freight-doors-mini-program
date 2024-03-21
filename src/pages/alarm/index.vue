<template>

	<view>
		<!-- <u-navbar title="告警" :bgColor="bgColor" height="70">
			
		</u-navbar> -->
		<view class="tank-background">
			<page-card title="场景选择">
				<u-row customStyle="margin-bottom: 10rpx;margin-top: 0px">
					<u-col span="12">
						<u--form labelPosition="left" :model="model1" ref="form1">

							<u-form-item labelWidth="0" prop="userInfo.sex" borderBottom
								@click="showSex = true; hideKeyboard()" ref="item1">
								<u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff"
									placeholder="全部" border="none"></u--input>
								<u-icon slot="right" name="arrow-right"></u-icon>
							</u-form-item>
						</u--form>
						<u-action-sheet :show="showSex" :actions="actions" title="请选择场景" @close="showSex = false"
							@select="sexSelect">
						</u-action-sheet>

					</u-col>

				</u-row>
			</page-card>
			<page-card title="时间选择">
				<u-row customStyle="margin-bottom: 10px;margin-top: 0px">
					<u-col span="12">
						<u--form labelPosition="left" :model="model" ref="form">
							<u-form-item label=" " prop="hotel" labelWidth="0" borderBottom
								@click="showCalendar = true; hideKeyboard()">
								<u--input v-model="model.hotel" disabled disabledColor="#ffffff" placeholder="请选择时间"
									border="none"></u--input>
								<u-icon slot="right" name="arrow-right"></u-icon>
							</u-form-item>

						</u--form>
						<u-calendar :show="showCalendar" mode="range" @confirm="calendarConfirm" @close="calendarClose"
							startText="开始时间" endText="结束时间" confirmDisabledText="请选择结束日期" 
							:maxDate="maxDate" :minDate="minDate">
						</u-calendar>
					</u-col>

				</u-row>
			</page-card>
			<page-card title=" ">
				<view v-for="(item, index) in list" :key="index">
					<u-row customStyle="margin-bottom: 0px;margin-top: 0px">

						<view>
							<u-tag :text="item.name"></u-tag>
						</view>
					</u-row>
					<u-row customStyle="margin-bottom: 10px;margin-top: 0px">
						<u-col span="12">
							<view>
								<u-cell :title="item.desc" value="" :label="item.time"></u-cell>
							</view>
						</u-col>
					</u-row>
				</view>
			</page-card>
		</view>
	</view>
</template>

<script>
	const d = new Date()
	const year = d.getFullYear()
	let month = d.getMonth() + 1
	month = month < 10 ? `0${month}` : month
	const date = d.getDate()
	export default {
		data() {
			return {
				bgColor: {
					backgroundColor: '#3c9cff'

				},
				disabled1: false,
				showCalendar: false,
				model1: {
					userInfo: {
						sex: '全部'
					}
				},
				model: {
					userInfo: {
						hotel: ''
					}
				},
				showSex: false,
				maxDate: `${year}-${month}-${date }`,
				minDate: `2021-01-01`,
				birthday: Number(new Date()),
				actions: [{
						name: '全部',
					}, {
						name: '场景1',
					},
					{
						name: '场景2',
					},
					{
						name: '场景3',
					},
				],
				list: [{
						name: '储罐',
						desc: '利剑出鞘,一统江湖',
						time: '2021-11-3 12:18:23'
					},
					{
						name: '灌注线',
						desc: '利剑出鞘,一统江湖',
						time: '2021-11-3 12:18:23'
					},
					{
						name: '储罐',
						desc: '利剑出鞘,一统江湖',
						time: '2021-11-3 12:18:23'
					},
				],
			}
		},
		onLoad() {
		},
		methods: {
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			formatter(day) {
				const d = new Date()
				let month = d.getMonth() + 1
				const date = d.getDate()

				return day
			},
			calendarClose() {
				this.showCalendar = false
				this.$refs.form.validateField('hotel')
			},
			calendarConfirm(e) {
				this.showCalendar = false
				this.model.hotel = `${e[0]} / ${e[e.length - 1]}`
				this.$refs.form.validateField('hotel')
			},
		}
	}
</script>

<style>
	.title {
		font-weight: 700;
		margin-top: 5rpx;
		/* font-family: STFangsong; */
	}

	.tank-background {
		padding: 0 10rpx;
		/* height: 100vh; */
		overflow: hidden;
		
	}

	
	.charts-box {
		width: 100%;
		font-size: 5px;
	}
</style>
