<template>
    <view class="tank-background">
        <page-card title="储罐选择">
            <view style="margin-top: 20rpx;">
                <page-tags :list="list1"  @clickTags="getValue()"></page-tags>
            </view>
        </page-card>
        <page-card title="储罐状态">
            <view style="margin-top: 20rpx; font-size: 25rpx; color: #888888;padding:10rpx 30rpx;">
                <u-row>
                    <u-col span="6">
                        <u-row>
                            <u-col span="6">
                                <span>切断阀状态： </span>
                            </u-col>
                            <u-col span="2">
                                <u-icon name="checkmark-circle-fill" color="#00d600"></u-icon>
                            </u-col>
                            <u-col span="4">
                                <span>运行</span>
                            </u-col>
                        </u-row>
                    </u-col>
                    <u-col span="6">
                        <span>实时流量：
                           {{ volume.toFixed(2) }}</span>
                    </u-col>
                </u-row>
            </view>
        </page-card>
        <page-card title="储罐参数">
            <view style="margin-top: 20rpx; font-size: 25rpx; color: #888888;padding:10rpx 30rpx;">
                <u-row>
                    <u-col span="6">
                        <span>液位： {{ position.toFixed(2) }}m</span>
                    </u-col>
                    <u-col span="6">
                        <span>体积：
                           {{ volume.toFixed(2) }}m³</span>
                    </u-col>
                </u-row>
            </view>
            <view style="margin-top: 00rpx; font-size: 25rpx; color: #888888;padding:10rpx 30rpx;">
                <u-row style="margin-top: 20rpx;">
                    <u-col span="6">
                        <span>温度： {{ temp.toFixed(2) }}℃</span>
                    </u-col>
                    <u-col span="6">
                        <span>压力：
                           {{ pressure.toFixed(2) }}Mpa</span>
                    </u-col>
                </u-row>
            </view>
        </page-card>
        <page-card title="可燃气检测">
            <view style="margin-top: 00rpx; font-size: 25rpx; color: #888888;padding:10rpx 30rpx;">
                <u-row style="margin-top: 20rpx;">
                    <u-col span="6">
                        <span>浓度1： {{ position.toFixed(2) }}</span>
                    </u-col>
                    <u-col span="6">
                        <span>浓度2：
                           {{ volume.toFixed(2) }}</span>
                    </u-col>
                </u-row>
            </view>
        </page-card>
        <page-card title="R32储量折线图">
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
                    name: '30m³储罐',
                    status: true
                }, {
                    id: 2,
                    name: '50m³储罐',
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
                pressure: 1.49,
                temp: 18.7,
                volume: 1.33
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
                            "name": "",
                            "data": [4.2, 5.8, 5.7, 5.0, 5.7, 5.8, 5.5, 5.6, 5.8, 5.9, 5.7, 5.6],
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
