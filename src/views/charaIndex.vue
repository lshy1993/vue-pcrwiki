<template>
<div class="inset-container">
    <div class="section whitebox">
    <button v-for="(tab,key) in tabs" v-bind:key="key"
        v-bind:class="['tab-button', { active: currentTab === tab.conponame }]"
        v-on:click="currentTab = tab.conponame">
        {{ tab.cn }}
    </button>
    <keep-alive>
        <component v-bind:is="currentTabComponent" v-bind:charaDic="charaDic" class="tab"></component>
    </keep-alive>
    </div>
</div>
</template>

<script>
import CharaDataList from './chara/charaDataList.vue';
import CharaAlbum from './chara/charaAlbum.vue';

export default {
    name: 'CharaIndex',
    data(){
        return{
            currentTab: 'chara-album',
            tabs: [
                {
                    cn: '图鉴模式',
                    conponame: 'chara-album'
                },
                {
                    cn: '数据列表模式',
                    conponame: 'chara-data-list'
                }
            ],
            charaDic : {}
        }
    },
    computed: {
        currentTabComponent: function () {
            return this.currentTab;
        }
    },
    created: function(){
        this.loadData();
    },
    methods: {
        loadData: function(){
            console.log("loading chara list");
            this.$http.get("http://api.liantui.xyz/pcr/chara").then((response)=>{
                this.setCharaPlate(response.data);
            });
            //var result = this.Common.db.prepare("SELECT * FROM unit_data WHERE unit_id < 200000");
            //this.setCharaPlate(result);
            //释放
			//result.free();
        },
        setCharaPlate: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
                var id = ele['unit_id'];
                dd[id] = ele;
            }
            this.charaDic = dd;
        }
    },
    components: {
        CharaAlbum,
        CharaDataList
    }

}    
</script>

<style lang="scss">

</style>
