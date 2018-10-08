<template>
<div id="questDataList">
    <h2>请选择关卡</h2>
    <div id="tablist">
        <button v-on:click="mode=0">Normal</button>
        <button v-on:click="mode=1">Hard</button>
        <button v-on:click="mode=7">Cooperation</button>
    </div>
    <div class="clearfixbox" v-if="mode<2">
        <div class="clearfix" v-for="(ele,key) in tabDic" v-bind:key="key">
            <div :class="['questlist', mode==0 ? 'normalQuest' : 'hardQuest']" @click="areaid=key">
                {{ key%100 }}
            </div>
        </div>
    </div>
    <table id="questDropTable">
        <tr>
            <th class="col160">名称</th>
            <th>开放等级</th>
            <th>消费体力</th>
            <th>最低消耗体力</th>
            <th>玩家经验</th>
            <th>角色经验</th>
            <th>绊奖励</th>
            <th>时间限制</th>
            <th>每日次数</th>
        </tr>
        <template v-for="(quest,key) in questDic">
            <tr>
                <td class="col160" rowspan="2">{{ quest.quest_name }}</td>
                <td>{{ quest.limit_team_level }}</td>
                <td>{{ quest.stamina }}</td>
                <td>{{ quest.stamina_start }}</td>
                <td>{{ quest.team_exp }}</td>
                <td>{{ quest.unit_exp }}</td>
                <td>{{ quest.love }}</td>
                <td>{{ quest.limit_time }}</td>
                <td>{{ quest.daily_limit }}</td>
            </tr>
            <tr>
                <td colspan="10">
                    <div class="clearfixbox">
                        <div v-for="(ele,skey) in getWaveDrop(key)" :key="skey" class="small_icon64 relative clearfix">
                            <img :src="Common.getRewardImg(ele.reward_type, ele.reward_id)" />
                            <div class="floatnum">{{ ele.odds }}%</div>
                        </div>
                    </div>
                </td>
            </tr>
        </template>
    </table>
    
</div>
</template>

<script>
export default {
    name: 'QuestDataList',
    data(){
        return{
            mode: 0,
            questAreaDic: {},
            questDic: {},
            //waveDic: {},
            waveGroup: [],
            dropGroup: [],
            dropDic: {},
            areaid: 11001
        }
    },
    created: function(){
        console.log("questlist");
        this.loadStaticData();
        this.loadData();
    },
    watch: {
        areaid: function(){
            this.loadData();
        }
    },
    computed:{
        tabDic: function(){
            var dd = {};
            //mode 0 则11000-11999 mode1 则 12000-12999
            var idmin = 11000+1000*this.mode
            var idmax = 12000+1000*this.mode;
            for(var id in this.questAreaDic){
                if(id > idmin && id < idmax) dd[id] = this.questAreaDic[id];
            };
            return dd;
        }
    },
    methods:{
        loadStaticData: function(){
            this.$http.get("http://api.liantui.xyz/pcr/quest").then((response)=>{
                this.setQuestAreaDic(response.data.questAreaDic);
            });
            // var result = this.Common.db.prepare("SELECT * FROM quest_area_data");
            // this.setQuestAreaDic(result);
        },
        loadData: function(){
            //根据选择不同每次重新获取
            this.$http.get("http://api.liantui.xyz/pcr/questlist/"+this.areaid).then((response)=>{
                //this.setQuestDic(response.data.QuestDic);
                this.questDic = response.data.QuestDic;
                this.waveGroup = response.data.WaveGroup;
                //this.setWaveDic(response.data.WaveDic);
                this.dropGroup = response.data.DropGroup;
                this.setDropDic(response.data.DropDic);
            });



            // this.$http.get("http://api.liantui.xyz/pcr/questarea/"+this.areaid).then((response)=>{
            //     this.setQuestDic(response.data.QuestDatas);
            //     //对每个地图获取3波次资料
            //     var dp = {};
            //     var waveGroup = [];
            //     for(var id in this.questDic){
            //         var ele = this.questDic[id];
            //         var tt = [];
            //         for(var i=1;i<=3;i++){
            //             let waveid = ele['wave_group_id_'+i];
            //             waveGroup.push(waveid);
            //             tt.push(waveid);
            //         }
            //         dp[id] = tt;
            //     }
            //     this.waveGroup = dp;
            //     this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'wave_group_data',condition: "wave_group_id IN (" + waveGroup +")" }}).then((response)=>{
            //         this.setWaveDic(response.data);
            //         //所有可能的掉落资料分组与查询
            //         var drop_group = {};
            //         var sql_group = [];
            //         //根据wavegroup获取3组的掉落波次
            //         for(var id in this.waveGroup){
            //             //id是地图编号
            //             var dd = [];
            //             var group = this.waveGroup[id];
            //             for(var j in group){
            //                 //key是波次id
            //                 var key = group[j];
            //                 var ele = this.waveDic[key];
            //                 for(var i=1; i<=5; i++){
            //                     let rewardid = ele['drop_reward_id_'+i];
            //                     if(rewardid != 0){
            //                         dd.push(rewardid);
            //                         sql_group.push(rewardid);
            //                     }
            //                 }
            //             }
            //             drop_group[id] = dd;
            //         }
            //         this.dropGroup = drop_group;
            //         this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'enemy_reward_data', condition: "drop_reward_id IN (" + sql_group +")" }}).then((response)=>{
            //             this.setDropDic(response.data);
            //         });
            //     });
            // });
            // var result = this.Common.db.prepare("SELECT * FROM quest_data WHERE area_id = "+this.areaid);
            // this.setQuestDic(result);
            
            
            // result = this.Common.db.prepare("SELECT * FROM wave_group_data WHERE wave_group_id IN (" + waveGroup +")");
            // this.setWaveDic(result);

            
            // result = this.Common.db.prepare("SELECT * FROM enemy_reward_data WHERE drop_reward_id IN (" + sql_group +")");
            // this.setDropDic(result);

        },
        setQuestAreaDic: function(result) {
            var dic = {};
            for(var id in result){
                var ele = result[id];
                let uid = ele.area_id;
                dic[uid] = ele;
            }
            this.questAreaDic = dic;
        },
        setQuestDic: function(result) {
            var dic = {};
            for(var id in result){
                var ele = result[id];
                let uid = ele.quest_id;
                dic[uid] = ele;
            }
            this.questDic = dic;
        },
        // setWaveDic: function(result){
        //     var dd = {};
        //     for(var id in result){
        //         var ele = result[id];
        //         let index = ele.wave_group_id;
        //         dd[index] = ele;
        //     }
        //     this.waveDic = dd;
        // },
        setDropDic: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
                let index = ele.drop_reward_id;
                dd[index] = ele;
            }
            this.dropDic = dd;
        },
        getWaveDrop: function(key){
            var result = {};
            //根据地图的key获取掉落组
            var group = this.dropGroup[key];
            for(var ele in group){
                //获取对应掉落id
                let did = group[ele];
                let ts = this.dropDic[did];
                //根据掉落编号获取详细数据
                for(var j=1; j<=5; j++){
                    var dic = {};
                    let type = 'reward_type_'+j;
                    let id = 'reward_id_'+j;
                    let num = 'reward_num_'+j;
                    let odd = 'odds_'+j;
                    if(ts[type] != 0){
                        dic['reward_type'] = ts[type];
                        dic['reward_id'] = ts[id];
                        dic['reward_num'] = ts[num];
                        dic['odds'] = ts[odd];
                        result[ts[id]] = dic;
                    }
                }
            }
            return result;
        },
        getrouter: function(key){
            return '/quest/' +key;
        }
	}
}    
</script>

<style lang="scss">
#questDataList {

    .questlist {
        width: 40px;
        //height: 30px;
        color: white;
        align-content: center;
        border-radius: 5px;
        padding: 5px;
        margin: 5px;
        cursor: pointer;
    }
        .normalQuest {
            background: green;
        }
        .hardQuest {
            background: red;
        }
    #questDropTable {
        border: solid grey 1px;
        border-spacing: 1px;

        tr {
            border: solid grey 1px;
            background: #dee2e6;
            padding: 5px;
        }
        th {
            min-width: 100px;
            padding: 5px;
        }
        td {
            background: white;
            padding: 10px 5px;
        }

    }
}
</style>
