<template>
<div style="margin-top: 10px;">
    <table id="questWaveTable">
        <tr v-for="i in 3" :key="i">
            <th>第{{i}}/3波<th/>
            <td v-for="j in 5" :key="j">
                <div class="cursor clearfix small_icon64" v-on:click="setEnemyId(i,j)">
                    <img style="width:100%" :src="getEnemyImg(i,j)" />
                </div>
            </td>
        </tr>
    </table>
    <table id="enemyDetailTable">
        <tr>
            <td colspan="2">{{ enemyData.name }}</td>
            <th>等级</th>
            <td>{{ enemyData.level }}</td>
            <th>命中率</th>
            <td>{{ enemyData.accuracy }}</td>
            <th>Rank</th>
            <td>{{ enemyData.promotion_level }}</td>
        </tr>
        <tr>
            <th>HP</th>
            <td>{{ enemyData.hp }}</td>
            <th>HP回复量</th>
            <td>{{ enemyData.hp_recovery_rate }}</td>
            <th>物攻</th>
            <td>{{ enemyData.atk }}</td>
            <th>魔攻</th>
            <td>{{ enemyData.magic_str }}</td>
        </tr>
        <tr>
            <th>吸血</th>
            <td>{{ enemyData.life_steal }}</td>
            <th>闪避</th>
            <td>{{ enemyData.dodge }}</td>
            <th>物防</th>
            <td>{{ enemyData.def }}</td>
            <th>魔防</th>
            <td>{{ enemyData.magic_def }}</td>
        </tr>
        <tr>
            <th>TP回复量</th>
            <td>{{ enemyData.energy_recovery_rate }}</td>
            <th>TP消耗减少</th>
            <td>{{ enemyData.energy_reduce_rate }}</td>
            <th>物理暴击</th>
            <td>{{ enemyData.physical_critical }}</td>
            <th>法术暴击</th>
            <td>{{ enemyData.magic_critical }}</td>
        </tr>
        <tr>
            <th>HP每回合回复</th>
            <td>{{ enemyData.wave_hp_recovery }}</td>
            <th>TP每回合回复</th>
            <td>{{ enemyData.wave_energy_recovery }}</td>
            <th>物理穿透</th>
            <td>{{ enemyData.physical_penetrate }}</td>
            <th>法术穿透</th>
            <td>{{ enemyData.magic_penetrate }}</td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    name: 'QuestWaveTable',
    props: ['wavegroup','waveDic','enemyDic'],
    data(){
        return {
            currentEnemy: 0,
            enemyData: {},
            // enemyDic: {},
            // dropData: {}
        }
    },
    watch:{
        wavegroup:function(){
            this.loadData();
        },
        currentEnemy: function(){
            if(this.currentEnemy != 0){
                //this.loadEnemyData();
                this.enemyData = this.enemyDic[this.currentEnemy];
            }
        }
    },
    created(){
        this.loadData();
    },
    methods:{
        loadData: function(){
            //获取所有出现的敌人资料
            var enemy_group = [];
            for(var id in this.waveDic){
                var ele = this.waveDic[id];
                for(var i=1; i<=5; i++){
                    let enemyid = ele['enemy_id_'+i];
                    if(enemyid != 0){
                        enemy_group.push(enemyid);
                    };
                }
            }
            this.currentEnemy = enemy_group[0];
            this.enemyData = this.enemyDic[this.currentEnemy];

            // this.$http.get("http://api.liantui.xyz/pcr/quest/"+this.questid+"/wave").then((response)=>{
            //     //console.log(response.data);
            //     this.setEnemyDic(response.data);
            //     this.enemyData = this.enemyDic[this.currentEnemy];
            // });
            // var result = this.Common.db.prepare("SELECT * FROM enemy_parameter WHERE enemy_id IN (" + enemy_group +")");
            // this.setEnemyDic(result);
        },
        // setEnemyDic: function(result){
        //     var dd = {};
        //     for(var id in result){
        //         var ele = result[id];
        //         let index = ele.enemy_id;
        //         dd[index] = ele;
        //     }
        //     this.enemyDic = dd;
        // },
        setEnemyId: function(i,j){
            let waveid = this.wavegroup[i-1];
            if(this.waveDic[waveid] == undefined){
                //this.currentEnemy = 0;
                return;
            }
            this.currentEnemy = this.waveDic[waveid]['enemy_id_'+j];
        },
        getEnemyImg: function(i,j){
            // dic.drop_gold = ele['drop_gold_'+j];
            // dic.drop_reward_id = ele['drop_reward_id_'+j];
            // dic.enemy_id = ele['enemy_id_'+j];
            let waveid = this.wavegroup[i-1];

            if(this.waveDic[waveid] == undefined){
                return this.Common.getEnemyImg("000000");
            }

            let enemyid = this.waveDic[waveid]['enemy_id_'+j];
            if(this.enemyDic[enemyid] == undefined){
                return this.Common.getEnemyImg("000000");
            }
            let unit_id = this.enemyDic[enemyid].unit_id;
            
            return this.Common.getEnemyImg(unit_id);
        },
        getEnemyName: function(i,j){
            let waveid = this.wavegroup[i-1];
            if(this.waveDic[waveid] == undefined){
                return '';
            }
            let enemyid = this.waveDic[waveid]['enemy_id_'+j];
            if(this.enemyDic[enemyid] == undefined){
                return '';
            }
            return this.enemyDic[enemyid].name+"(Lv."+this.enemyDic[enemyid].level+")";
        }
    }
}
</script>

<style lang="scss">
#questWaveTable{
    
    text-align: center;
    margin: 0 auto;
}    
.cursor{
    cursor: pointer;
}
#enemyDetailTable {
    text-align: center;
    margin: 0 auto;
    border: solid #000 1px;
    border-radius: 10px;
    //font-size: 14px;
    th {
        text-align: left;
        color: white;
        background: #212529;
        padding: 5px;
    }
    td{
        width: 50px;
        text-align: right;
        padding: 5px;
    }
}

</style>
