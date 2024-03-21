<template>
    <view class="tank-background">
        <!-- <page-tabs :current="1"></page-tabs> -->
        <page-card title="灌注线选择">
            <view style="margin-top: 20rpx;">
                <page-tags :list="list1"  @clickTags="getValue()"></page-tags>
            </view>
        </page-card>
        <page-card title="缓冲罐">
            <view style="margin-top: 20rpx; font-size: 25rpx; color: #888888;padding:10rpx 30rpx;">
                <span>液位： {{ position.toFixed(2) }}m</span> <span style="margin-left: 35%;">压力：
                    {{ pressure.toFixed(2) }}Mpa</span>
            </view>
        </page-card>
        <page-card title="可燃气体浓度/LEL">
            <view
                style="display: flex; flex-wrap: wrap;flex-direction: row;font-size: 25rpx; color: #888888;padding: 10rpx 0rpx;">
                <view v-for="item in list2" style="margin:10rpx 40rpx;"><span>{{ item.name }}</span> <span
                        style="margin-left: 5rpx;">{{ item.value.toFixed(1) }}</span></view>
            </view>
        </page-card>
        <page-card title="可燃气浓度实时数据曲线">
            <u-row customStyle="margin-bottom: 10rpx;margin-top: 0rpx">
                <u-col span="12">
                    <view class="charts-box">
                        <qiun-data-charts type="demotype" :chartData="chartData" background="none" />
                    </view>
                </u-col>
            </u-row>
        </page-card>
    </view>
</template>

<script>
    export default {
        name: 'r32tank',
        data() {
            return {
                list1: [{
                    id: 1,
                    name: '1# 线',
                    status: true
                }, {
                    id: 2,
                    name: '2# 线',
                    status: false
                }, {
                    id: 3,
                    name: '3# 线',
                    status: false
                }, {
                    id: 4,
                    name: '4# 线',
                    status: false
                }],
                chartData: {
                    categories: [],
                    series: [],
                },
                list2: [{
                    id: 1,
                    name: '1#',
                    value: 0.0
                }, {
                    id: 2,
                    name: '2#',
                    value: 0.0
                }, {
                    id: 3,
                    name: '3#',
                    value: 0.0
                }, {
                    id: 4,
                    name: '4#',
                    value: 0.0

                }, {
                    id: 5,
                    name: '5#',
                    value: 0.0
                }, {
                    id: 6,
                    name: '6#',
                    value: 0.0
                }, {
                    id: 7,
                    name: '7#',
                    value: 0.0
                }],
                position: 0.66,
                pressure: 1.49
            }
        },
        created() {
            this.click(1)
        },
        methods: {
            click(item) {
                this.chartData = {
                    "categories": ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"],
                    "series": [{
                            "name": "成交量A",
                            "data": [50, 58, 57, 50, 57, 58, 55, 56, 58, 59, 57, 56],
                        },
                        {
                            "name": "成交量B",
                            "data": [67, 65, 69, 60, 67, 68, 65, 66, 68, 69, 67, 66]
                        },
                        {
                            "name": "成交量C",
                            "data": [77, 75, 79, 70, 77, 78, 75, 76, 78, 79, 77, 76]
                        },
                        {
                            "name": "成交量D",
                            "data": [77, 75, 79, 70, 77, 78, 75, 76, 78, 79, 77, 76]
                        },
                        {
                            "name": "成交量E",
                            "data": [77, 75, 79, 70, 77, 78, 75, 76, 78, 79, 77, 76]
                        },
                        {
                            "name": "成交量F",
                            "data": [77, 75, 79, 70, 77, 78, 75, 76, 78, 79, 77, 76]
                        }
                    ]
                }
            },
            getValue(item) {
                this.list1.forEach(e => {
                	e.status = e.name == item.name ?  true :  false
                })
            }
        }
    }
</script>

<style>
    .title {
        font-weight: 700;
        margin-top: 5rpx;
    }

    .tank-background {
        /* background-color: #EFEFEF; */
        padding: 0 10rpx;
        /* height: 100vh; */
        overflow: hidden;
    }

    .charts-box {
        width: 100%;
        height: 370rpx;
        font-size: 5rpx;
    }
    .tags {
      padding: 10rpx 10rpx;
      text-align: center;
      margin: 0 10rpx;
    }
    
    .tag-par {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .page_tasg{
    	display: inline-block;
    	text-align: center;
    	font-size: 6rpx !important;
    	padding: 0 6rpx 10rpx 6rpx !important;
    	margin-top: 0 8rpx !important;
    }
</style>
