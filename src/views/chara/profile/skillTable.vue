<template>
    <div id="SkillTable">
        <h2>技能</h2>
        <h3>主动技能</h3>
        <skill-detail-table :skill-data="skillDic[1]" :skill-action="getAction(skillDic[1])" :skill-cost="skillCost" />
        <table>
            <th>技能动画</th>
            <tr>aaa</tr>
        </table>
        <h3>技能</h3>
        <skill-detail-table :skillData="skillDic[2]" :skillAction="getAction(skillDic[2])" :skill-cost="skillCost" />
        <skill-detail-table :skillData="skillDic[3]" :skillAction="getAction(skillDic[3])" :skill-cost="skillCost" />
        <h3>EX技能</h3>
        <skill-detail-table :skillData="skillDic[501]" :skillAction="getAction(skillDic[501])" :skill-cost="skillCost" />
        <div class="warning">角色达到5星后，EX技能会升级，增加属性值or获得新的效果</div>
        <skill-detail-table :skillData="skillDic[511]" :skillAction="getAction(skillDic[511])" :skill-cost="skillCost" />
    </div>
</template>

<script>
import SkillDetailTable from '@/components/skillDetailTable.vue';

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
            var unitid = parseInt(this.unitid/100);
            var url = this.Common.GetApi("pcr/skillcost");
            this.$http.get(url).then((response)=>{
                this.setCostTable(response.data);
            });
            var url2 = this.Common.GetApi("pcr/skilldata/"+unitid);
            this.$http.get(url2).then((response)=>{
                // this.skillAction = ;
                this.setSkillDic(response.data.skilldata);
                this.setSkillAction(response.data.skillaction);
            });
        },
        setSkillDic: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
				var index = ele['skill_id']%1000;
                dd[index] = ele;
            }
            this.skillDic = dd;
        },
        setSkillAction: function(result){
            var dd = {};
            for(var id in result){
                var ele = result[id];
				var index = ele['action_id'];
                dd[index] = ele;
            }
            this.skillAction = dd;
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
            var str = "";
            for(var i=1;i<=7;i++){
                let prop = skdata['action_'+i];
                if(prop!=0){
                    str += this.skillAction[prop].description+"\n";
                }
            }
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