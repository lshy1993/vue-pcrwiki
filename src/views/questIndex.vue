<template>
<div class="inset-container">
    <div class="section whitebox">
        <button v-for="(tab,key) in tabs" v-bind:key="key"
            v-bind:class="['tab-button', { active: currentTab === tab.conponame }]"
            v-on:click="currentTab = tab.conponame">
            {{ tab.cn }}
        </button>
        <keep-alive>
            <component v-bind:is="currentTabComponent" class="tab"></component>
        </keep-alive>
    </div>
</div>
</template>

<script>
import QuestSelect from './quest/questSelect.vue';
import QuestDataList from './quest/questDataList.vue';

export default {
    name: 'QuestIndex',
    data(){
        return{
            currentTab: 'quest-select',
            tabs: [
                {
                    cn: '选关详细模式',
                    conponame: 'quest-select'
                },
                {
                    cn: '掉落一览模式',
                    conponame: 'quest-data-list'
                }
            ],
            questAreaDic : {}
        }
    },
    computed: {
        currentTabComponent: function () {
            return this.currentTab;
        }
    },
    methods:{

    },
    components: {
        QuestSelect,
        QuestDataList
    }
}    
</script>

<style lang="scss">

</style>
