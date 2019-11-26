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
            var url = this.Common.GetApi("pcr/quest");
            this.$http.get(url).then((response)=>{
                this.setQuestAreaDic(response.data.questAreaDic);
            });
            // var result = this.Common.db.prepare("SELECT * FROM quest_area_data");
            // this.setQuestAreaDic(result);
        },
        loadData: function(){
            //根据选择不同每次重新获取
            var url = this.Common.GetApi("pcr/questlist/"+this.areaid);
            this.$http.get(url).then((response)=>{
                //this.setQuestDic(response.data.QuestDic);
                this.questDic = response.data.QuestDic;
                this.waveGroup = response.data.WaveGroup;
                //this.setWaveDic(response.data.WaveDic);
                this.dropGroup = response.data.DropGroup;
                this.setDropDic(response.data.DropDic);
            });
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
