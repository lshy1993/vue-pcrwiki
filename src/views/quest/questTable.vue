<template>
<div class="inset-container">
    <div class="section whitebox">
        <div class="questHeader">
            <div class="floatbtn">
                <button @click="prevQuestArea"> 上一章 </button>
            </div>
            <h2 class="questName">{{ areaName }}</h2>
            <div class="floatbtn">
                <button @click="nextQuestArea"> 下一章 </button>
            </div>
        </div>
        <div>
            <audio :autoplay="'autoplay'" :src="Common.getBGM(bgmid)" :loop="'loop'" />
            <!--aplayer ref="player" :preload="'none'"
                :music="Common.getBGMObject(bgmid)" :repeat="Common.rpmode" /-->
        </div>
        <div class="clearfixbox">
            <h3>选择关卡</h3>
            <div>
                <div class="clearfix" v-for="(ele,key) in questDic" :key="key">
                    <router-link :to="getrouter(key)">
                    <div class="small_icon64">
                        <img :src="Common.getMapIcon(ele.icon_id)" />
                    </div>
                    </router-link>
                </div>
            </div>
        </div>
        <h3>关卡详细信息</h3>
        <div class="questBox">
            <div class="floatbtn" @click="prevQuest">
                <span>上一关prev</span>
            </div>
            <quest-detail-table
                :quest-data = questDic[questid]
                :rankRewardData = rankRewardData
                :clearRewardData = clearRewardData
                :mainRewardData = mainRewardData
                :enemyImg = enemyImg
                :enemyDic = enemyDic
            />
            <div class="floatbtn" @click="nextQuest">
                <span>下一关next</span>
            </div>
        </div>
        <h3>敌人详情</h3>
        <quest-wave-table :wavegroup="waveGroup" :wave-dic="waveDic" :enemyDic="enemyDic"/>
        <h3>掉落详情</h3>
        <quest-drop-table :dropGroup="dropGroup" :dropDic="dropDic" />
    </div>
</div>
</template>

<script>
import QuestDetailTable from './questDetailTable.vue';
import QuestWaveTable from './questWaveTable.vue';
import QuestDropTable from  './questDropTable.vue';

export default {
    name: 'QuestTable',
    data(){
        return {
            bgmid: 0,
            areaName: '',
            questDic: {},
            waveGroup: [],
            waveDic: {},
            areaid: 0,
            questid: 0,

            mainRewardData: [],
            rankRewardData: [],
            clearRewardData: [],
            enemyImg: [],
            //enemyGroup: [],
            enemyDic: {},

            dropGroup: [],
            dropDic: {},

            //enemyData: {},
            //enemyDic: {},
        }
    },
    created(){
        console.log("created!");
        this.questid = parseInt(this.$route.params.id);
        this.areaid = parseInt(this.$route.params.id/1000);
        //this.loadData();
    },
    beforeRouteUpdate (to, from, next) {
        console.log('route change to : ', to.params.id);
        this.questid = parseInt(to.params.id);
        this.areaid = parseInt(to.params.id/1000);
        //this.loadData();
        next();
    },
    watch:{
        areaid: function() {
            console.log("areaid changed");
            this.loadAreaData();
        },
        questid: function(){
            console.log("quest changed");
            this.loadData();
        }
    },
    computed:{

    },
    methods: {
        loadAreaData: function(){
            var url = this.Common.GetApi("pcr/questarea/"+this.areaid);
            this.$http.get(url).then((response)=>{
                this.setQuestAreaDic(response.data.AreaData);
                this.setQuestDic(response.data.QuestDatas);
            });
        },
        loadData: function(){
            var url = this.Common.GetApi("pcr/quest/"+this.questid);
            this.$http.get(url).then((response)=>{
                this.waveGroup = response.data.WaveGroup;
                this.setWaveDic(response.data.WaveDic);
                this.mainRewardData = response.data.MainRewardData;
                //this.enemyGroup = response.data.EnemyGroup;
                this.enemyImg = response.data.EnemyImg;
                //this.setEnemyData(response.data.EnemyData);
                this.setClearReward(response.data.ClearReward);
                this.setRankReward(response.data.RankReward);

                this.setEnemyDic(response.data.EnemyDic);

                this.dropGroup = response.data.DropGroup;
                this.setDropDic(response.data.DropDic)
            });

            // var result = this.Common.db.prepare("SELECT * FROM quest_area_data WHERE area_id = " + this.areaid);
            // this.setQuestAreaDic(result);

            // result = this.Common.db.prepare("SELECT * FROM quest_data WHERE area_id = " + this.areaid);
            // this.setQuestData(result);
                
            //获取波次资料
            // var result = this.Common.db.prepare("SELECT * FROM wave_group_data WHERE wave_group_id IN (" + this.waveGroup +")");
            // this.setWaveDic(result);
        },
        setQuestAreaDic: function(result){
            let ele = result[0];
            this.areaName = ele.area_name;
            this.bgmid = ele.que_id;
        },
        setQuestDic: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
                let index = ele.quest_id;
                dd[index] = ele;
            }
            this.questDic = dd;
            // console.log('endquest');
        },
        setWaveDic: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
                let index = ele.wave_group_id;
                dd[index] = ele;
            }
            this.waveDic = dd;
        },
        setEnemyData: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
                let index = ele.enemy_id;
                dd[index] = ele;
            }
            this.enemyDic = dd;
        },
        setDropDic: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
                let index = ele.drop_reward_id;
                dd[index] = ele;
            }
            this.dropDic = dd;
        },
        setRankReward: function(result){
            var ele = result[0];
            var dd = [];
            for(var i=1;i<=5;i++){
                let dic = {};
                dic['reward_type'] = ele['reward_type_'+i];
                dic['reward_id'] = ele['reward_id_'+i];
                dic['reward_num'] = ele['reward_num_'+i];
                if(ele['reward_type_'+i]>0) dd.push(dic);
            }
            this.rankRewardData = dd;
        },
        setClearReward: function(result){
            var ele = result[0];
            var dd = [];
            for(var i=1;i<=5;i++){
                let dic = {};
                dic['reward_type'] = ele['reward_type_'+i];
                dic['reward_id'] = ele['reward_id_'+i];
                dic['reward_num'] = ele['reward_num_'+i];
                if(ele['reward_type_'+i]>0) dd.push(dic);
            }
            this.clearRewardData = dd;
        },
        setEnemyDic: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
                let index = ele.enemy_id;
                dd[index] = ele;
            }
            this.enemyDic = dd;
        },
        getrouter: function(key){
            return '/quest/' +key;
        },
        prevQuest: function(){
            let tt = parseInt(this.$route.params.id % 100);
            if(tt > 1){
                let routerid = parseInt(this.$route.params.id)-1;
                this.$router.push('/quest/'+routerid);
            }
        },
        nextQuest: function(){
            let tt = parseInt(this.$route.params.id % 100);
            if(tt < Object.keys(this.questDic).length){
                let routerid = parseInt(this.$route.params.id)+1;
                this.$router.push('/quest/'+routerid);
            }
        },
        prevQuestArea: function(){
            let aid = parseInt(this.$route.params.id/1000);
            let routerid = (aid-1)+'001';
            this.$router.push('/quest/'+routerid);
        },
        nextQuestArea: function(){
            let aid = parseInt(this.$route.params.id/1000);
            let routerid = (aid+1)+'001';
            this.$router.push('/quest/'+routerid);
        }
    },
    components: {
        QuestDetailTable,
        QuestWaveTable,
        QuestDropTable,
    }
}
</script>

<style lang="scss">
.questHeader {
    text-align: center;
    line-height: 50px;

    .questName{
        display: inline-block;
    }

    .floatbtn{
        display: inline-block;

        button {
            width: 100px;
        }
        
    }
}

.questBox{
    display: block;
    text-align: center;
    margin: 10px 0;

    .floatbtn{
        display: inline-block;
        vertical-align: top;
        background: grey;
        width: 100px;
        line-height: 400px;

        span {
            display: inline-block;
        }
    }
}
</style>
