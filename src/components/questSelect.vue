<template>
<div id="questSelect">
    <h2>请选择关卡</h2>
    <div id="tablist">
        <button v-on:click="mode=0">Normal</button>
        <button v-on:click="mode=1">Hard</button>
        <button v-on:click="mode=8">Training</button>
        <button v-on:click="mode=9">Dungeon</button>
        <button v-on:click="mode=7">Cooperation</button>
    </div>
    <div class="clearfixbox" v-if="mode<2">
        <div class="clearfix" v-for="(ele,key) in tabDic" v-bind:key="key">
            <router-link :to="getrouter(1,ele)">
                <div :class="['questlist',mode==0 ? 'normalQuest' : 'hardQuest']">{{ ele.area_name }}</div>
            </router-link>
        </div>
    </div>
    <div class="clearfixbox" v-if="mode==8">
        <div class="clearfix">
            <router-link v-for="(ele,key) in trainingExpDic" v-bind:key="key" :to="getrouter(2,ele)">
                <div class="traininglist clearfixbox">
                    <div class="thumb128 clearfix">
                        <img :src="Common.getQuestIcon(ele.quest_id)" />
                    </div>
                    <div class="clearfix">{{ ele.quest_name }}</div>
                </div>
            </router-link>
        </div>
        <div class="clearfix">
            <router-link v-for="(ele,key) in trainingGoldDic" v-bind:key="key" :to="getrouter(2,ele)">
                <div class="traininglist clearfixbox">
                    <div class="thumb128 clearfix">
                        <img :src="Common.getQuestIcon(ele.quest_id)" />
                    </div>
                    <div class="clearfixbox">{{ ele.quest_name }}</div>
                </div>
            </router-link>
        </div>
    </div>
    <div class="clearfixbox" v-if="mode==9">
        <div class="clearfix" v-for="(ele,key) in dungeonAreaDic" v-bind:key="key">
            <router-link :to="getrouter(3,ele)">
                <div class="dungeonlist relative">
                    <img :src="Common.getDungeonThumb(key)" />
                    <div class="dungeontitle">{{ ele.dungeon_name }}</div>
                    <div class="dungeonsub">{{ ele.description }}</div>
                </div>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'QuestSelect',
    data(){
        return {
            mode: 0,
            questAreaDic: {},
            trainingExpDic: [],
            trainingGoldDic: [],
            dungeonAreaDic: {},
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
    created: function(){
        console.log("loading quest list");
        this.loadData();
    },
    methods: {
        loadData: function(){

            this.$http.get("http://api.liantui.xyz/pcr/quest").then((response)=>{
                this.setQuestAreaDic(response.data.questAreaDic);
                this.setTrainingQuest(response.data.setTrainingQuest);
                this.setDungeonAreaDic(response.data.dungeonAreaDic);
            });

            // var result = this.Common.db.prepare("SELECT * FROM quest_area_data");
            // this.setQuestAreaDic(result);
            // var result = this.Common.db.prepare("SELECT * FROM training_quest_data");
            // this.setTrainingQuest(result);
            // var result = this.Common.db.prepare("SELECT * FROM dungeon_area_data");
            // this.setDungeonAreaDic(result);
            
            // result.free();
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
        setDungeonAreaDic: function(result){
            var dic = {};
            for(var id in result){
                var ele = result[id];
                let uid = ele.dungeon_area_id;
                dic[uid] = ele;
            }
            this.dungeonAreaDic = dic;
        },
        setTrainingQuest: function(result) {
            var exp = [];
            var gold = [];
            for(var id in result){
                var ele = result[id];
                let uid = ele.quest_id;
                if(uid>21002000){
                    exp.push(ele);
                }
                else{
                    gold.push(ele);
                }
            }
            this.trainingExpDic = exp.reverse();
            this.trainingGoldDic = gold.reverse();
        },
        getrouter: function(type,element){
            
            if(type == 1){
                let rt = element.area_id+"001";
                return '/quest/' + rt;
            }
            if(type == 2){
                let rt = element.area_id+"001";
                return '/train/' + rt;
            }
            if(type == 3){
                let rt = element.dungeon_area_id;
                return '/dungeon/' + rt;
            }
           
        },

    }
}
</script>

<style lang="scss">
#questSelect{

    #tablist {
        margin: 10px;
    }
    .questlist {
        width: 300px;
        height: 30px;
        color: white;
        align-content: center;
        border-radius: 5px;
        padding: 0 5px 0 5px;
        margin: 5px;
    }
    .normalQuest {
            background: green;
        }
        .hardQuest {
            background: red;
        }
    
    .traininglist {
        width: 300px;
        border-radius: 10px;
        overflow: hidden;
        margin: 10px;
        background: white;
    }

    .dungeonlist {
        margin: 10px;
        width: 278px;
        height: 440px;
    }
    .dungeontitle{
        position: absolute;
        font-size: 30px;
        font-weight: bold;
        text-align: center;
        width: 100%;
        bottom: 100px;
    }
    .dungeonsub{
        position: absolute;
        font-size: 18px;
        text-align: center;
        color: white;
        text-shadow: 0 1px black, 1px 0 black, -1px 0 black, 0 -1px black;
        width: 100%;
        bottom: 70px;
    }
}

</style>
