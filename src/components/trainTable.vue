<template>
<div id="trainTable">
    <div>
        <audio :autoplay="'autoplay'" :src="Common.getBGM('BGM_36')" :loop="'loop'" />
        <!--aplayer ref="player" :preload="'none'"
            :music="Common.getBGMObject(bgmid)" :repeat="Common.rpmode" /-->
    </div>
    <h2>关卡详细信息</h2>
    <div class="clearfixbox">
        <div class="clearfix">
            <button v-on:click="prevQuest">上一关prev</button>
        </div>
        <train-detail-table :questid="questid" :quest-data="questDic[questid]"/>
        <div class="clearfix">
            <button v-on:click="nextQuest">下一关next</button>
        </div>
    </div>
    <quest-wave-table :wavegroup="waveGroup" :wave-dic="waveDic" />
    <quest-drop-table :wavegroup="waveGroup" :wave-dic="waveDic" />
</div>
</template>

<script>
import TrainDetailTable from './trainDetailTable.vue';
import QuestWaveTable from './questWaveTable.vue';
import QuestDropTable from  './questDropTable.vue';

export default {
    name: 'TrainTable',
    data(){
        return {
            bgmid: 0,
            areaName: '',
            questDic: {},
            waveGroup: [],
            waveDic: {},
            areaid: 0,
            questid: 0,
        }
    },
    created(){
        console.log("created!");
        this.questid = parseInt(this.$route.params.id);
        this.areaid = parseInt(this.$route.params.id/1000);
        this.loadData();
    },
    beforeRouteUpdate (to, from, next) {
        console.log('route change to : ', to.params.id);
        this.questid = parseInt(to.params.id);
        this.areaid = parseInt(to.params.id/1000);
        this.loadData();
        next();
    },
    watch:{
        areaid: function() {
            console.log("watch changed");
        }
    },
    computed:{

    },
    methods: {
        loadData: function(){
            var result = this.Common.db.prepare("SELECT * FROM training_quest_data WHERE area_id = " + this.areaid);
            this.setQuestDic(result);

            //获取波次资料
            var dd = [];
            for(var i=1;i<=3;i++){
                let waveid = this.questDic[this.questid]['wave_group_id_'+i];
                dd.push(waveid);
            }
            this.waveGroup = dd;
            var result = this.Common.db.prepare("SELECT * FROM wave_group_data WHERE wave_group_id IN (" + this.waveGroup +")");
            this.setWaveDic(result);

            result.free();
        },
        setQuestDic: function(result){
            var dd = {};
            while(result.step()){
                var ele = result.getAsObject();
                let id = ele.quest_id;
                dd[id] = ele;
            }
            this.questDic = dd;
            result.free();
        },
        setWaveDic: function(result){
            var dd = {};
            while(result.step()){
                var ele = result.getAsObject();
                let index = ele.wave_group_id;
                dd[index] = ele;
            }
            this.waveDic = dd;
            result.free();
        },
        prevQuest: function(){
            let tt = parseInt(this.questid % 100);
            if(tt > 1){
                let routerid = this.questid- 1;
                this.$router.push('/train/'+routerid);
            }
        },
        nextQuest: function(){
            let tt = parseInt(this.questid % 100);
            if(tt < 5){
                let routerid = this.questid+1;
                this.$router.push('/train/'+routerid);
            }
        },
    },
    components: {
        TrainDetailTable,
        QuestWaveTable,
        QuestDropTable,
    }
}
</script>

<style lang="scss">
#questTable {

    .floatnum {
        position: absolute;
        bottom: 5px;
        right: 10px;
        font-size: 16px;
        color: #000;
        text-shadow: #fff -1px 0 0,#fff 0 -1px 0,#fff 1px 0 0,#fff 0 1px 0;
    }
}
</style>
