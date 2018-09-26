<template>
<div id="questMainList">
    <button v-for="(tab,key) in tabs" v-bind:key="key"
        v-bind:class="['tab-button', { active: currentTab === tab.conponame }]"
        v-on:click="currentTab = tab.conponame">
        {{ tab.cn }}
    </button>
    <keep-alive>
        <component v-bind:is="currentTabComponent" class="tab"></component>
    </keep-alive>
</div>
</template>

<script>
import QuestSelect from './questSelect.vue';
import QuestDataList from './questDataList.vue';

export default {
    name: 'QuestMainList',
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
#questMainList {
    div.small_icon {
		width: 64px;
		height: 64px;
	}
}
</style>
