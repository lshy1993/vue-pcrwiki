<template>
<div>
    <button v-for="(tab,key) in tabs" v-bind:key="key"
        v-bind:class="['tab-button', { active: currentTab === tab.conponame }]"
        v-on:click="currentTab = tab.conponame">
        {{ tab.cn }}
    </button>
    <audio :autoplay="'none'" :src="Common.getBGM('bgm_M06')" :loop="'loop'" controls="controls"/>
    <keep-alive>
        <component v-bind:is="currentTabComponent" class="tab"></component>
    </keep-alive>
</div>
</template>

<script>
import ClanReward from './clan/clanReward.vue';
export default {
    name: 'ClanIndex',
    data(){
        return {
            currentTab: 'clan-boss',
            tabs: [
                {
                    cn: 'BOSS信息',
                    conponame: 'clan-boss'
                },
                {
                    cn: '工会战奖励',
                    conponame: 'clan-reward'
                },
                {
                    cn: '历届公会战',
                    conponame: 'clan-history'
                }
            ],
        }
    },
    computed: {
        currentTabComponent: function () {
            return this.currentTab;
        }
    },
    components:{
        ClanReward
    }
}
</script>

<style>

</style>
