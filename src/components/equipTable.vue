<template>
    <div id="equipTable">
        <h2>基本信息</h2>
        <span>{{ equipData.equipment_name }}</span>
        <p/>
        <table>
            <tr>
                <td rowspan="4">
                    <img :src="imgpath" />
                </td>
                <th colspan="4">描述</th>
			</tr>
            <tr>
                <td colspan="4">{{ description }}</td>
            </tr>
			<tr>
                <th>需要角色等级</th>
                <td>{{ equipData.require_level }}</td>
                <th>出售价格</th>
				<td>{{ equipData.sale_price }}</td>
            </tr>
			<tr>
                <!--th>强化点数</th>
                <td>{{ equipData.equipment_enhance_point }}</td-->
                <th>需要合成</th>
				<td>{{ craft_flag }}</td>
				<th>工会捐献</th>
                <td>{{ donate_flag }}</td>
            </tr>
			
		</table>
        <equip-simulator :equip-data="equipData" :equip-rate="equipRate" :equip-enhance="equipEnhance"/>
        <equip-craft :equip-craft="equipCraft"/>
        <equip-drop :equipid="equipid" />
    </div>
</template>

<script>
import EquipSimulator from './equipSimulator.vue';
import EquipDrop from './equipDrop.vue';
import EquipCraft from './equipCraft.vue';

export default {
    name: 'EquipTable',
    data(){
        return {
            equipid: 0,
            equipData: {},
            equipRate: {},
            equipCraft: {},
            equipEnhance: {}
        }
    },
    computed: {
        craft_flag: function(){
            return this.equipData.craft_flg==0;
        },
        donate_flag: function(){
            return this.equipData.enable_donation==0;
        },
        description: function(){
            if(this.equipData.description==undefined) return "";
            var reg = new RegExp( /\\n/ , "g" );
            return this.equipData.description.replace(reg,"");
        },
        imgpath: function(){
            let key = this.equipData.equipment_id;
            if(key==undefined) key = 999999;
            return '/static/img/equipment/icon_equipment_' + key + '.png';
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.equipid = to.params.id;
        next();
    },
    created(){
        console.log('route changed:',this.$route.params.id);
        this.equipid = this.$route.params.id;
        this.loadData();
    },
    watch:{
        equipid: function(){
            this.loadData();
        }
    },
    methods: {
        loadData: function(){

            // this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'equipment_data', condition:"equipment_id = "+this.equipid }}).then((response)=>{
            //     this.equipData = response.data[0];
            //     //this.setEquipData(response.data);
            // });
            // this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'equipment_enhance_rate', condition:"equipment_id = "+this.equipid }}).then((response)=>{
            //     this.equipRate = response.data[0];
            //     //this.setEquipRate(response.data);
            // });
            // this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'equipment_craft', condition:"equipment_id = "+this.equipid }}).then((response)=>{
            //     this.equipCraft = response.data[0];
            //     //this.setEquipCraft(response.data);
            // });
            // this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'equipment_enhance_data' }}).then((response)=>{
            //     this.setEquipEhance(response.data);
            // });
            
            this.$http.get("http://api.liantui.xyz/pcr/equip/"+this.equipid).then((response)=>{
                this.equipData = response.data.EquipData;
                this.equipRate = response.data.EquipRate;
                this.equipCraft = response.data.EquipCraft;
                this.setEquipEhance(response.data.EquipEnhance);
            });

            // var db = this.Common.db;
			// var result = db.prepare("SELECT * FROM equipment_data WHERE equipment_id = "+this.equipid);
            // this.setEquipData(result);
            // result = db.prepare("SELECT * FROM equipment_enhance_rate WHERE equipment_id = "+this.equipid);
            // this.setEquipRate(result);
            // result = db.prepare("SELECT * FROM equipment_craft WHERE equipment_id = "+this.equipid);
            // this.setEquipCraft(result);
            // result = db.prepare("SELECT * FROM equipment_enhance_data");
            // this.setEquipEhance(result);

        },
        setEquipData: function(result){
            this.equipData = result[0];

            while(result.step()){
                this.equipData = result.getAsObject();
            }
        },
        setEquipRate: function(result){
            while(result.step()){
                this.equipRate = result.getAsObject();
            }
        },
        setEquipCraft: function(result){
            var dd = {};
            for(var id in result){
                dd = result[id];
            }
            this.equipCraft = dd;
        },
        setEquipEhance: function(result){
            var dd = {};
            var plv = this.equipData.promotion_level;
            for(var id in result){
                var ele = result[id];
                if(ele.promotion_level == plv){
                    let index = ele.equipment_enhance_level;
                    dd[index] = ele;
                }
            }
            this.equipEnhance = dd;
        }
    },
    components:{
        EquipSimulator,
        EquipDrop,
        EquipCraft
    }
}
</script>

<style lang="scss">
#equipTable {
    table{
        border: 1px solid black;
        border-collapse: collapse;
        border-spacing: 0;
        th,td{
            border: 1px solid black;
        }
    }
}
</style>
