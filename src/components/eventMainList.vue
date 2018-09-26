<template>
<div id="eventMainList">
    <div>
        <audio :autoplay="'autoplay'" controls="controls" :src="Common.getBGM(bgmid)" :loop="'loop'" />
    </div>
    <div>
        <h2>BOSS详情</h2>
        <div id="bossinfo" class="clearfixbox">
            <div id="bossselect" class="clearfix">
                <table>
                    <tr>
                        <th>图标</th>
                        <th>关卡名</th>
                        <th>BOSS券</th>
                    </tr>
                    <tr :class="[bossid==key ? 'hover' : 'normal']" v-on:mouseover="bossid=key" v-for="(ele,key) in eventBossDic" v-bind:key="key">
                        <div class="small_icon64">
                            <img :src="Common.getMapIcon(ele.icon_id)" />
                        </div>
                        <th>{{ ele.quest_name }}</th>
                        <td>{{ ele.use_ticket_num }}</td>
                    </tr>
                </table>
            </div>
            <div id="bossdrop" class="clearfix clearfixbox">
                <div class="dropgroup clearfix" v-for="(ele,key) in eventBossTreasure[trid]" :key="key">
                    <table>
                        <tr>
                            <th>Group {{ key+1 }} 组概率:{{ ele.odds }}%</th>
                        </tr>
                        <tr>
                            <div class="dropcontent">
                                <table>
                                <tr>
                                    <td v-for="(sele,skey) in treasureContentDic[ele.content] " v-bind:key="skey">
                                        <div class="small_icon64 relative" v-if="sele.id!=0">
                                            <img :src="Common.getRewardImg(sele.type, sele.id)" />
                                            <div class="floatnum">{{ sele.num }}</div>
                                        </div>
                                        <div class="clearfixbox" v-if="sele.file!=0">
                                            <div class="small_icon64 relative clearfix">
                                                <img :src="Common.getRewardImg(2, Common.odds_file_icon[sele.file])" />
                                                <div class="floatnum">{{ sele.num }}</div>
                                            </div>
                                            <div class="filefont clearfix">{{ Common.odds_file_name[sele.file] }}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td v-for="(sele,skey) in treasureContentDic[ele.content] " v-bind:key="skey">
                                        <div>{{ sele.odds }}%</div>
                                    </td>
                                </tr>
                                </table>
                            </div>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h2>关卡详情</h2>
        <div id="tablist">
            <button v-on:click="mode=0">Normal</button>
            <button v-on:click="mode=1">Hard</button>
        </div>
        <div class="clearfixbox">
            <div v-on:click="questid=key" class="clearfix" v-for="(ele,key) in tabDic" v-bind:key="key">
                <div style="cursor:pointer" class="small_icon64">
                    <img :src="Common.getMapIcon(ele.icon_id)" />
                </div>
            </div>
        </div>
        <event-detail-table :questid="questid" :quest-data="tabDic[questid]"/>
    </div>
</div>
</template>

<script>
import EventDetailTable from './eventDetailTable.vue';

export default {
    name: 'EventMainList',
    data(){
        return {
            mode: 0,
            bgmid: '',
            eventid: 0,
            eventAreaList: [],
            eventQuestDic: [],
            eventBossDic: {},
            eventBossTreasure: {},
            treasureContentSet: [],
            treasureContentDic: {},
            questid: 0,
            bossid: 0,
        }
    },
    computed:{
        tabDic: function(){
            return this.eventQuestDic[this.mode];
        },
        trid: function(){
            let bossData = this.eventBossDic[this.bossid]
            if(bossData == undefined) return 0;
            return bossData.event_boss_treasure_box_id_1;
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        loadData: function(){
            var result = this.Common.db.prepare("SELECT * FROM hatsune_map");
            this.setCurrentHatsune(result);
            result = this.Common.db.prepare("SELECT * FROM hatsune_boss WHERE event_id =" + this.eventid);
            this.setHatsuneBossDic(result);

            var clearRG = [];
            var treasure = [];
            var waveG = [];
            for(var i in this.eventBossDic){
                let ele = this.eventBossDic[i];
                clearRG.push(ele.clear_reward_group);
                treasure.push(ele.event_boss_treasure_box_id_1);
                waveG.push(ele.wave_group_id_1)
            }

            result = this.Common.db.prepare("SELECT * FROM event_boss_treasure_box WHERE event_boss_treasure_box_id IN ("+treasure+")");
            this.setBossTreasure(result);
            result = this.Common.db.prepare("SELECT * FROM event_boss_treasure_content WHERE event_boss_treasure_content_id IN ("+this.treasureContentSet+")");
            this.setTreasureContentDic(result);

            

            result = this.Common.db.prepare("SELECT * FROM hatsune_quest_area WHERE event_id =" + this.eventid);
            this.setHatsuneAreaList(result);
            result = this.Common.db.prepare("SELECT * FROM hatsune_quest WHERE area_id IN (" + this.eventAreaList + ")");
            this.setHatsuneQuestDic(result);
            this.questid = this.eventAreaList[this.mode];
            
        },
        setCurrentHatsune: function(result){
            var dic;
            while(result.step()){
                dic = result.getAsObject();
            }
            this.bgmid = dic.que_id;
            this.eventid = dic.event_id;
            result.free();
        },
        setHatsuneAreaList: function(result){
            var list = [];
            while(result.step()){
                var ele = result.getAsObject();
                let uid = ele.area_id;
                list.push(uid);
            }
            this.eventAreaList = list;
            result.free();
        },
        setHatsuneQuestDic: function(result){
            var dic1 = {};
            var dic2 = {};
            while(result.step()){
                var ele = result.getAsObject();
                let uid = ele.quest_id;
                if(ele.area_id == this.eventAreaList[0]){
                    dic1[uid] = ele;
                }else{
                    dic2[uid] = ele;
                }
            }
            this.eventQuestDic.push(dic1);
            this.eventQuestDic.push(dic2);
            result.free();
        },
        setHatsuneBossDic: function(result){
            var dic = {};
            while(result.step()){
                var ele = result.getAsObject();
                let uid = ele.boss_id;
                dic[uid] = ele;
            }
            this.eventBossDic = dic;
            result.free();
        },
        setBossTreasure: function(result){
            var dic = {};
            var sets = [];
            while(result.step()){
                let ele = result.getAsObject();
                let uid = ele.event_boss_treasure_box_id;
                var dd = [];
                for(var j=1;j<=10;j++){
                    let treasure = {};
                    treasure['type'] = ele['treasure_type_'+j];
                    treasure['content'] = ele['event_boss_treasure_content_id_'+j];
                    treasure['odds'] = ele['each_odds_'+j];
                    if(ele['treasure_type_'+j] != 0){
                        dd.push(treasure);
                        sets.push(ele['event_boss_treasure_content_id_'+j]);
                    }
                }
                dic[uid] = dd;
            }
            this.treasureContentSet = [...new Set(sets)];
            this.eventBossTreasure = dic;
            result.free();
        },
        setTreasureContentDic: function(result){
            var dic = {};
            while(result.step()){
                var ele = result.getAsObject();
                let uid = ele.event_boss_treasure_content_id;
                var dd = [];
                for(var j=1;j<=5;j++){
                    let reward = {};
                    reward['type'] = ele['reward_type_'+j];
                    reward['id'] = ele['reward_id_'+j];
                    reward['file'] = ele['odds_file_'+j];
                    reward['num'] = ele['reward_num_'+j];
                    reward['odds'] = ele['odds_'+j];
                    if(reward['id']!=0 || reward['file']!=0){
                        dd.push(reward);
                    }
                }
                dic[uid] = dd;
            }
            this.treasureContentDic = dic;
            result.free();
        },
        setWaveDic: function(result){
            var dd = {};
            while(result.step()){
                var ele = result.getAsObject();
                let index = ele.event_boss_treasure_content_id;
                dd[index] = ele;
            }
            this.waveDic = dd;
            result.free();
        },
    },
    components:{
        EventDetailTable,
    }
}
</script>

<style lang="scss">
#eventMainList{
    #bossinfo{
        height: 600px;
        overflow: hidden;
        background: white;
    }
    #bossselect {
        min-width: 200px;
        width: 20%;
        table{
            width: 100%;
            border-collapse: collapse;
            tr.hover {
                cursor: pointer;
                background: grey;
            }
            tr.normal {
                cursor: pointer;
                background: none;
            }
        }
        
        
    }
    #bossdrop {
        min-width: 600px;
        width: 80%;
        height: 600px;
    }

    .filefont{
        width: 150px;
        padding: 5px;
    }

    div.dropgroup{
        margin: 5px;

        table {
            border: 1px solid black;
            border-collapse: collapse;
            //border-spacing: 0;
            //padding: 5px;

            th{
                text-align: center;
                color: white;
                background: #212529;
            }

            .dropcontent{
                
                table {
                    width: 250px;
                    border: none;
                    td {
                        padding: 5px;
                        border:1px solid gray;
                    }
                }
            }
        }
    }
}

</style>
