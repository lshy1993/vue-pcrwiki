<template>
<div>
    <button v-for="(tab,key) in tabs" v-bind:key="key"
        v-bind:class="['tab-button', { active: currentTab === tab.conponame }]"
        v-on:click="currentTab = tab.conponame">
        {{ tab.cn }}
    </button>
    <audio :autoplay="'autoplay'" :src="Common.getBGM('bgm_M06')" :loop="'loop'" controls="controls"/>
    <keep-alive>
        <component v-bind:is="currentTabComponent" class="tab"></component>
    </keep-alive>
</div>
</template>

<script>
import ArenaIndex from './arenaIndex.vue';
import ClanReward from './clanReward.vue';
import DailyMissionBonus from './dailyMissionBonus.vue';
import StationaryMissionBonus from './stationaryMissionBonus.vue';

export default {
    name: 'Mission',
    data(){
        return{
            currentTab: 'arena-index',
            tabs: [
                {
                    cn: '竞技场',
                    conponame: 'arena-index'
                },
                {
                    cn: '工会战奖励',
                    conponame: 'clan-reward'
                },
                {
                    cn: '每日任务',
                    conponame: 'daily-mission-bonus'
                },
                {
                    cn: '成就任务',
                    conponame: 'stationary-mission-bonus'
                }
            ],
        }
    },
    computed: {
        currentTabComponent: function () {
            return this.currentTab;
        }
    },
    components: {
        ArenaIndex,
        ClanReward,
        DailyMissionBonus,
        StationaryMissionBonus
    }
}
</script>

<style>

</style>
