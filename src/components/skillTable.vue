<template>
    <div id="SkillTable">
        <h2>技能</h2>
        <h3>主动技能</h3>
        <skill-detail-table :skill-data="skillDic[1]" :skill-action="skillAction[1]" :skill-cost="skillCost" />
        <table>
            <th>技能动画</th>
            <tr>aaa</tr>
        </table>
        <h3>技能</h3>
        <skill-detail-table :skillData="skillDic[2]" :skillAction="skillAction[2]" :skill-cost="skillCost" />
        <skill-detail-table :skillData="skillDic[3]" :skillAction="skillAction[3]" :skill-cost="skillCost" />
        <h3>EX技能</h3>
        <skill-detail-table :skillData="skillDic[501]" :skillAction="skillAction[501]" :skill-cost="skillCost" />
        <div class="warning">角色达到5星后，EX技能会升级，增加属性值or获得新的效果</div>
        <skill-detail-table :skillData="skillDic[511]" :skillAction="skillAction[511]" :skill-cost="skillCost" />
    </div>
</template>

<script>
import SkillDetailTable from './skillDetailTable.vue';

export default {
    name: 'SkillTable',
    props: ['unitid'],
    data() {
        return {
            skillDic: {},
            skillAction: {},
            skillCost: []
        }
    },
    created(){
        this.loadData();
    },
    watch: {
		unitid: function(){
			this.loadData();
	    }
    },
    methods:{
        loadData: function(){
            var chara_id = "'" + parseInt(this.unitid/100) + "___'";

            this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'skill_data', condition:"skill_id LIKE "+ chara_id}}).then((response)=>{
                this.setSkillDic(response.data);
            });

            // var result = this.Common.db.prepare("SELECT * FROM skill_data WHERE );
            // this.setSkillDic(result);

            this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'skill_cost'}}).then((response)=>{
                this.setCostTable(response.data);
            });

            // result =  this.Common.db.prepare("SELECT * FROM skill_cost");
            // this.setCostTable(result);
            // //释放
			// result.free();
        },
        setSkillDic: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
				var index = ele['skill_id']%1000;
                dd[index] = ele;
                this.skillAction[index] = this.getAction(ele);
            }
            this.skillDic = dd;
        },
        setCostTable: function(result){
            var dd = [];
            for(var id in result){
                var ele = result[id];
				var index = ele.target_level;
                dd[index] = ele.cost;
            }
            this.skillCost = dd;
        },
        getAction: function(skdata){
            var dd = [];
            for(var i=1;i<=7;i++){
                let prop = 'action_'+i;
                if(prop!=0) dd[i-1] = skdata[prop];
            }
            var str = "";
            this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'skill_action', condition:"action_id IN ("+ dd + ")"}}).then((response)=>{
                var result = response.data;
                for(var id in result){
                    var ele = result[id];
                    if(ele['description']!="") {
                        str += ele['description']+"\n";
                    }
                }
            });

            // var result = this.Common.db.prepare("SELECT * FROM skill_action WHERE action_id IN ("+ dd + ")");
            // var str = "";
            // while(result.step()){
            //     var ele = result.getAsObject();
            //     if(ele['description']!="")str+=ele['description']+"\n";
            // }
            return str;
        },
        geturl: function(skillid){
            return '/static/img/skill/icon_skill_' + skillid +'.png';
        }
    },
    components: {
        SkillDetailTable
    }
}
</script>

<style lang="scss">
#SkillTable {
    width: 1000px;
    margin: 10px;
    h3 {
        font-size: 15px;
        font-weight: bold;
        height: 30px;
        line-height: 28px;
        background: #C6E0FF;
        padding-left: 15px;
        color: #363636;
        border-radius: 16px;
        border: 1px solid #969696;
        //margin-top: 5px;
    }
    .warning{
        color: #a94442;
        background-color: #f2dede;
        border: 1px solid #ebccd1;
        padding: 5px;
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 4px;
    }

	
}
</style>