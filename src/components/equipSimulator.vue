<template>
    <div v-if="equipData.equipment_id<110000">
        <h2>属性强化</h2>
        <div class="clearfixbox">
            <div class="clearfix">            
                <button v-on:click=equipmin()>MIN</button>
                <button v-on:click=equipminus()>-</button>
                {{ eqlv }}
                <button v-on:click=equipplus()>+</button>            
                <button v-on:click=equipmax()>MAX</button>
            </div>
            <div>
                {{ ptneed }}
            </div>
        </div>
        <table>
            <tr v-show="equip.hp>0" >
                <th>HP</th>
			    <td>{{ equip.hp }}</td>
            </tr>
			<tr v-show="equip.atk>0" >
                <th>物理攻击力</th>
			    <td>{{ equip.atk }}</td>
            </tr>
			<tr v-show="equip.magic_str>0" >
                <th>魔法攻击力</th>
			    <td>{{ equip.magic_str }}</td>
            </tr>
            <tr v-show="equip.def>0" >
                <th>防御力</th>
			    <td>{{ equip.def }}</td>
            </tr>
            <tr v-show="equip.magic_def>0" >
                <th>魔法防御力</th>
			    <td>{{ equip.magic_def }}</td>
            </tr>
            <tr v-show="equip.physical_critical>0" >
                <th>物理暴击</th>
			    <td>{{ equip.physical_critical }}</td>
            </tr>
            <tr v-show="equip.magic_critical>0" >
                <th>魔法暴击</th>
			    <td>{{ equip.magic_critical }}</td>
            </tr>
            <tr v-show="equip.wave_hp_recovery>0" >
                <th>HP自动回复</th>
			    <td>{{ equip.wave_hp_recovery }}</td>
            </tr>
            <tr v-show="equip.wave_energy_recovery>0" >
                <th>TP自动回复</th>
			    <td>{{ equip.wave_energy_recovery }}</td>
            </tr>
            <tr v-show="equip.dodge>0" >
                <th>闪避</th>
			    <td>{{ equip.dodge }}</td>
            </tr>
            <tr v-show="equip.physical_penetrate>0" >
                <th>物理穿透</th>
			    <td>{{ equip.physical_penetrate }}</td>
            </tr>
            <tr v-show="equip.magic_penetrate>0" >
                <th>魔法穿透</th>
			    <td>{{ equip.magic_penetrate }}</td>
            </tr>
            <tr v-show="equip.life_steal>0" >
                <th>生命偷取</th>
			    <td>{{ equip.life_steal }}</td>
            </tr>
            <tr v-show="equip.hp_recovery_rate>0" >
                <th>生命回复量</th>
			    <td>{{ equip.hp_recovery_rate }}</td>
            </tr>
            <tr v-show="equip.energy_recovery_rate>0" >
                <th>TP回复量</th>
			    <td>{{ equip.energy_recovery_rate }}</td>
            </tr>
            <tr v-show="equip.energy_reduce_rate>0" >
                <th>TP消耗减少</th>
			    <td>{{ equip.energy_reduce_rate }}</td>
            </tr>
            <tr v-show="equip.accuracy>0" >
                <th>命中率</th>
			    <td>{{ equip.accuracy }}</td>
            </tr>
		</table>
    </div>
</template>

<script>
export default {
    name: 'EquipSimulator',
    props: ['equipData', 'equipRate', 'equipEnhance'],
    data(){
        return {
            eqlv: 0
        }
    },
    computed:{
        equip: function(){
            var equipType = this.Common.equip_type;
            var dd = {};
            for(var i=1;i<=equipType.length;i++){
				var property = equipType[i];
				dd[property] = Math.floor(this.equipData[property] + this.equipRate[property]*(this.eqlv));
            }
            return dd;
        },
        lvmax: function(){
            //装备的强化等级范围是(1,4)
            var plv = this.equipData.promotion_level;
            //对应强化等级上限
            return this.Common.equip_lvmax[plv-1];
        },
        ptneed: function(){
            //if(this.eqlv == this.lvmax) return "已强化至最高等级";
            var pt = this.equipEnhance[this.eqlv+1];
            if(pt==undefined) return "已强化至最高等级";
            return "强化所需pt: " + pt.needed_point;
        },
    },
    methods:{
        equipminus: function(){
            if(this.eqlv > 0) this.eqlv--;
		},
		equipplus: function(){
            if(this.eqlv < this.lvmax) this.eqlv++;
        },
        equipmin: function(){
            this.eqlv = 0;
        },
        equipmax: function(){
            this.eqlv = parseInt(this.lvmax);
		},
    }
}
</script>
