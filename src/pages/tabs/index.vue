<template>
    <view class="app-container">
        <u-sticky>
            <view class="tabs">
                <u-tabs :list="list" :scrollable="false" :current="current" @click="click"></u-tabs>
            </view>
        </u-sticky>
        <!-- <component :is="tabValue" /> -->
        <r32store v-if="tabValue == 'r32store'"></r32store>
        <r32tank v-if="tabValue == 'r32tank'"></r32tank>
        <perfusion v-if="tabValue == 'perfusion'"></perfusion>
    </view>
</template>

<script>
    import { r32store } from "@/pages/r32store/index"
    import { r32tank } from "@/pages/r32tank/index"
    import { perfusion } from "@/pages/perfusion/index"
    export default {
        name: 'tabs',
        components: {
            r32tank,
            perfusion,
            r32store
        },
        data() {
            return {
                current: 0,
                list: [{
                	name: 'R32储罐',
                	value: 'r32store'
                }, {
                	name: 'R32缓冲罐',
                	value: 'r32tank'
                }, {
                	name: '灌注线',
                	value: 'perfusion'
                }],
                tabValue: 'r32store'
            }
        },
        methods: {
            click(item) {
                this.tabValue = item.value
            }
        }
    }
</script>

<style>
.tabs{
    /* background-color: #3c9cff; */
    background-color: #ffffff;
}
</style>
