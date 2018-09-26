<template>
<div>
	<h2>{{ msg }}</h2>
	<div v-for="(equip,key) in equipDic" v-bind:key="key">
		<table>
			<tr>{{ equip.equipment_id }}</tr>
			<tr>{{ equip.equipment_name }}</tr>
			<tr><pre>{{ equip.description }}</pre></tr>
			<tr>{{ equip.promotion_level }}</tr>
			<tr>{{ equip.craft_flg }}</tr>
			<tr>{{ equip.equipment_enhance_point }}</tr>
			<tr>{{ equip.sale_price }}</tr>
			<tr>{{ equip.require_level }}</tr>
			<tr>{{ equip.hp }}</tr>
			<tr>{{ equip.atk }}</tr>
			<tr>{{ equip.magic_str }}</tr>
			<tr>{{ equip.def }}</tr>
			<tr>{{ equip.magic_def }}</tr>
			<tr>{{ equip.physical_critical }}</tr>
			<tr>{{ equip.magic_critical }}</tr>
			<tr>{{ equip.wave_hp_recovery }}</tr>
			<tr>{{ equip.wave_energy_recovery }}</tr>
			<tr>{{ equip.dodge }}</tr>
			<tr>{{ equip.physical_penetrate }}</tr>
			<tr>{{ equip.magic_penetrate }}</tr>
			<tr>{{ equip.life_steal }}</tr>
			<tr>{{ equip.hp_recovery_rate }}</tr>
			<tr>{{ equip.energy_recovery_rate }}</tr>
			<tr>{{ equip.energy_reduce_rate }}</tr>
			<tr>{{ equip.enable_donation }}</tr>
			<tr>{{ equip.accuracy }}</tr>
		</table>
	</div> 
</div>
</template>


<script>
export default {
	name: 'EquipList',
	props: ['equipDic'],
	data(){
		return {
			msg: 'this is a equip list'
		}
	},
	methods: {

	}
}

</script>