<template>
<div id="BattleCalculator" class="clearfixbox">
	<h2>战斗属性计算器</h2>
	<div class="clearfix">
		<table id="lvtable">
			<tr>
				<th colspan="2">角色等级</th>
			</tr>
			<tr>
				<td>Lv:</td>
				<td>
					<button v-on:click="lvminus">-</button>
					<input class="num_input" type="text" v-model="lv">
					<button v-on:click="lvplus">+</button>
				</td>
			</tr>
			<tr>
				<td>所需exp</td>
				<td>{{ getlvexp }}</td>
			</tr>
			<tr>
				<th colspan="2">才能开花</th>
			</tr>
			<tr>
				<td>星级：</td>
				<td>
					<button v-on:click="rareminus">-</button>
					<input class="num_input" type="text" v-model="rare">
					<button v-on:click="rareplus">+</button>
				</td>
			</tr>
			<tr>
				<td>所需碎片</td>
				<td>{{ consumepiece }}</td>
			</tr>
			<tr>
				<td>所需Mana</td>
				<td>{{ consumegold }}</td>
			</tr>
			<tr>
				<th colspan="2">羁绊等级</th>
			</tr>
			<tr>
				<td>Lv:</td>
				<td>
					<button v-on:click="loveminus">-</button>
					<input class="num_input" type="text" v-model="love">
					<button v-on:click="loveplus">+</button>
				</td>
			</tr>
			<tr>
				<td>绊</td>
				<td>{{ getlove }}</td>
			</tr>
		</table>
	</div>
	<div class="clearfix" >
		<table id="resulttable">
			<th colspan="4">详细数据（可以更改显示条件）</th>
			<tr>
				<th>攻击方式</th>
				<td>{{ charaData.atk_type }}</td>
				<th>普攻时间</th>
				<td>{{ charaData.normal_atk_cast_time  }}</td>
			</tr>
			<tr>
				<th>HP</th>
				<td>{{ batInfo.hp }}</td>
				<th>HP回复量</th>
				<td>{{ batInfo.hp_recovery_rate }}</td>
			</tr>
			<tr>
				<th>TP回复量</th>
				<td>{{ batInfo.energy_recovery_rate }}</td>
				<th>TP消耗减少</th>
				<td>{{ batInfo.energy_reduce_rate }}</td>
			</tr>
			<tr>
				<th>HP每回合回复</th>
				<td>{{ batInfo.wave_hp_recovery }}</td>
				<th>TP每回合回复</th>
				<td>{{ batInfo.wave_energy_recovery }}</td>
			</tr>
			<tr>
				<th>物攻</th>
				<td>{{ batInfo.atk }}</td>
				<th>魔攻</th>
				<td>{{ batInfo.magic_str }}</td>
			</tr>
			<tr>
				<th>物防</th>
				<td>{{ batInfo.def }}</td>
				<th>魔防</th>
				<td>{{ batInfo.magic_def }}</td>
			</tr>
			<tr>
				<th>物理暴击</th>
				<td>{{ batInfo.physical_critical }}</td>
				<th>法术暴击</th>
				<td>{{ batInfo.magic_critical }}</td>
			</tr>
			<tr>
				<th>吸血</th>
				<td>{{ batInfo.life_steal }}</td>
				<th>闪避</th>
				<td>{{ batInfo.dodge }}</td>
			</tr>
			<tr>
				<th>移速</th>
				<td>{{ charaData.move_speed }}</td>
				<th>位置</th>
				<td>{{ charaData.search_area_width }}</td>
			</tr>
		</table>
	</div>
	<div class="clearfix">
		<table id="equiptable">
			<tr>
				<th>Rank:</th>
				<td>
					<button v-on:click="rankminus">-</button>
					<input class="num_input" type="text" v-model="rank">
					<button v-on:click="rankplus">+</button>
				</td>
			</tr>
			<tr>
				<th>装备</th>
				<td>等级</td>
			</tr>
			<tr v-for="i in 6" v-bind:key="i">
				<td>
					<input type="checkbox" :id="i" v-model="checked[i]" v-on:change="setBattleInfo()">
					<label :for="i">
						<div class="small_icon48">
							<img style="width:100%" v-bind:src=geturl(i,checked[i]) />
						</div>
					</label>
				</td>
				<td id="equipNum" v-bind:class="{ active: !checked[i] }">
					<button :disabled="!checked[i]" v-on:click=equipminus(i)>-</button>
					{{ eqlv[i] }}
					<button :disabled="!checked[i]" v-on:click=equipplus(i)>+</button>
				</td>
			</tr>
		</table>
	</div>

</div>
</template>

<script>
export default {
	name: 'BattleTable',
	props: ['unitid'],
	data(){
		return {
			lv: 1,
			rare: 1,
			rank: 1,
			love: 1,
			checked: [false,true,true,true,true,true,true],
			eqlv: [-1,0,0,0,0,0,0],
			unitRarity: {},
			promotionDic: {},			
			promotionStatus: {},
			loveDic: {},
			equipDic: {},
			equipRateDic: {},
			batInfo: {},
			curPromo: {},
			charaData: {},
			expTable: [],
			loveTable: []
		}
	},
	computed:{
		getlvexp: function(){
			let lv = parseInt(this.lv)
			return this.expTable[lv+1] - this.expTable[lv];
		},
		getlove: function(){
			let love = parseInt(this.love)
			return this.loveTable[love+1] - this.loveTable[love];
		},
		consumepiece: function(){
			let nr = parseInt(this.rare);
			//if(nr == 5) return "";
			if(this.unitRarity[nr] == undefined) return "";
			return this.unitRarity[nr].consume_num;
		},
		consumegold: function(){
			let nr = parseInt(this.rare);
			//if(nr == 5) return "";
			if(this.unitRarity[nr] == undefined) return "";
			return this.unitRarity[nr].consume_gold;
		}
	},
	created() {
		this.loadStaticData();
	},
	watch: {
		unitid: function(){
			//检测到传入的unitid变动重新获取数据库
			this.loadDate();
		},
        lv: function () {
			if(this.lv>0 && this.lv<=this.Common.lv_max){
				this.setBattleInfo();
			}
        },
		rare: function(){
			if(this.rare>0 && this.rare<=5) this.setBattleInfo();
		},
		rank: function () {
			if(this.rank>0 && this.rank<=this.Common.rank_max){
				this.eqlv = [-1,0,0,0,0,0,0];
				this.setBattleInfo();
			}
        },
		love: function(){
			if(this.love>0 && this.love<=this.Common.love_max){
				this.setBattleInfo();
			}
		}
    },
	methods:{
		loadStaticData: function(){
			//读取常用列表 仅在create时调用
			this.$http.get("http://api.liantui.xyz/pcr/battle").then((response)=>{
                this.setEquip(response.data.Equip);
                this.setEquipRate(response.data.EquipRate);
                this.setUnitExp(response.data.UnitExp);
                this.setUnitLove(response.data.UnitLove);
			});

			// this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'equipment_data'}}).then((response)=>{
            //     this.setEquip(response.data);
			// });
			// this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'equipment_enhance_rate'}}).then((response)=>{
            //     this.setEquipRate(response.data);
			// });
			// this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'experience_unit'}}).then((response)=>{
            //     this.setUnitExp(response.data);
			// });
			// this.$http.get("http://api.liantui.xyz/pcr", { params: {table: 'love_chara'}}).then((response)=>{
            //     this.setUnitLove(response.data);
			// });
			
			// var result = this.Common.db.prepare("SELECT * FROM equipment_data");
			// this.setEquip(result);
			// result = this.Common.db.prepare("SELECT * FROM equipment_enhance_rate");
			// this.setEquipRate(result);
			// result = this.Common.db.prepare("SELECT * FROM experience_unit");
			// this.setUnitExp(result);
			// result = this.Common.db.prepare("SELECT * FROM love_chara");
			// this.setUnitLove(result);

			this.loadDate();
		},
		loadDate: function(){
			//根据uintid每次重新获取的部分
			// this.$http.get("http://api.liantui.xyz/pcr/battle/"+this.unitid).then((response)=>{
            //     this.setData(response.data.Data);
            //     this.setRarity(response.data.Rarity);
            //     this.setPromotion(response.data.Promotion);
			// 	this.setPromotionStatus(response.data.PromotionStatus);
			// 	this.setLoveStory(response.data.LoveStory);
			// 	this.setBattleInfo();
			// });

			this.$http.get("http://api.liantui.xyz/pcr/data/"+this.unitid).then((response)=>{
				this.setData(response.data);
				this.$http.get("http://api.liantui.xyz/pcr/rarity/"+this.unitid).then((response)=>{
					this.setRarity(response.data);
					this.$http.get("http://api.liantui.xyz/pcr/promotion/"+this.unitid).then((response)=>{
						this.setPromotion(response.data);
						this.$http.get("http://api.liantui.xyz/pcr/promotionstatus/"+this.unitid).then((response)=>{
							this.setPromotionStatus(response.data);
							this.$http.get("http://api.liantui.xyz/pcr/charastory/"+this.unitid).then((response)=>{
								this.setLoveStory(response.data);
							});
						});
					});
				});
			});

			// var result = this.Common.prepare("SELECT * FROM unit_data WHERE unit_id = "+ this.unitid);
			// this.setData(result);
			// result = this.Common.prepare("SELECT * FROM unit_rarity WHERE unit_id = "+ this.unitid);
			// this.setRarity(result);
			// result = this.Common.prepare("SELECT * FROM unit_promotion WHERE unit_id = "+ this.unitid);
			// this.setPromotion(result);
			// result = this.Common.prepare("SELECT * FROM unit_promotion_status WHERE unit_id = "+ this.unitid);
			// this.setPromotionStatus(result);

			// let char_id = parseInt(this.unitid/100);
			// result = this.Common.prepare("SELECT * FROM chara_story_status WHERE chara_id_1 = "+ char_id);
			// this.setLoveStory(result);
			//this.setBattleInfo();
		},
		setData: function(result){
			this.charaData = result[0];
			return;
			// while(result.step()){
			// 	this.charaData = result.getAsObject();
			// 	result.free();
			// 	return;
			// }
		},
		setRarity: function(result){
			//获取星级信息
			console.log('setRarity');
			var dd = {};
			for(var id in result){
				var ele = result[id];
				var index = ele['rarity'];
				dd[index] = ele;
			}
			this.unitRarity = dd;
        },
		setPromotion: function(result){
			//获取每个rank需要的装备列表
			console.log('setPromotion');
			var dd = {};
			for(var id in result){
				var ele = result[id];
				var index = ele['promotion_level'];
				dd[index] = ele;
			}
			this.promotionDic = dd;
		},
		setPromotionStatus: function(result){
			//获取每个rank的加成
			console.log('setPromotionStatus');
			var dd = {};
			for(var id in result){
				var ele = result[id];
				var index = ele['promotion_level'];
				dd[index] = ele;
			}
			this.promotionStatus = dd;
		},
		setLoveStory: function(result){
			//获取每个绊等级的加成
			console.log('setLoveStory');
			var dd = {};
			for(var id in result){
				var ele = result[id];
				var index = ele['story_id']%100;
				dd[index] = ele;
			}
			this.loveDic = dd;
			this.setBattleInfo();
		},
		setUnitExp: function(result){
			//获取升级表
			var dd = [];
			for(var id in result){
				var ele = result[id];
				var lv = ele.unit_level;
				dd[lv] = ele.total_exp;
			}
			this.expTable = dd;
		},
		setUnitLove(result){
			//获取羁绊表
			var dd = [];
			for(var id in result){
				var ele = result[id];
				var lv = ele.love_level;
				dd[lv] = ele.total_love;
			}
			this.loveTable = dd;
		},
		setEquip: function(result){
			//获取需要的装备的基础信息
			console.log('setEquip');
			var dd = {};
			for(var id in result){
				var ele = result[id];
				var index = ele['equipment_id'];
				dd[index] = ele;
			}
			this.equipDic = dd;
		},
		setEquipRate: function(result){
			//获取装备强化的成长
			console.log('setEquipRate');
			var dd = {};
			for(var id in result){
				var ele = result[id];
				var index = ele['equipment_id'];
				dd[index] = ele;
			}
			this.equipRateDic = dd;
		},
		setBattleInfo: function() {
			//获取各项数值并计算最终需要显示的数值
			this.lv = parseInt(this.lv);
			this.rare = parseInt(this.rare);
			this.rank = parseInt(this.rank);
			this.love = parseInt(this.love);
			//设置装备
			this.curPromo = this.promotionDic[this.rank];
			var curEquipList = [];
			for(var i=1;i<=6;i++){
				curEquipList[i-1] = this.curPromo['equip_slot_'+i];
			};

			//当前rare基础与成长
			var db = this.unitRarity[this.rare];
			var statusType = this.Common.status_type;
			//总值 = 当前rare的基础+[当前rare的成长*lv]+当前Rank基础值+每个装备数值*每个装备等级+羁绊追加
			var batInfo = {};
			for(var i=1;i<=statusType.length;i++){
				var property = statusType[i];
				batInfo[property] = db[property] + db[property+'_growth']*(this.lv+7);
			}
			//Rank2以上的加成
			if(this.rank>1){
				var ps = this.promotionStatus[this.rank];
				for(var i=1;i<=statusType.length;i++){
					var property = statusType[i];
					batInfo[property] += ps[property];
				}
			}
			//计算装备的数据与加成
			for(var i=1;i<=6;i++){
				//未开启装备则跳过
				if(!this.checked[i]) continue;
				//编号
				var element = curEquipList[i-1];
				if(element == '999999') continue;
				//属性与成长
				var dd = this.equipDic[element];
				var cc = this.equipRateDic[element];
				for(var jj=1;jj<=statusType.length;jj++){
					var property = statusType[jj];
					batInfo[property] += dd[property]+cc[property]*this.eqlv[i];
				}
			}

			//羁绊等级累加
				for(var l=2;l<=this.love;l++){
					var ls = this.loveDic[l];
					if(ls == undefined) continue;
					for(var i=1;i<=5;i++){
						let index = ls['status_type_'+i];
						if(index==undefined || index==0) continue;
						let property = statusType[index];
						batInfo[property] += ls['status_rate_'+i];
					}
				}

			//取整
			for(var i=1;i<=statusType.length;i++){
				var property = statusType[i];
				batInfo[property] = Math.round(batInfo[property]);
			}

			//渲染到页面
			this.batInfo = batInfo;
		},
		equipminus: function(i){
			if(this.eqlv[i]>0) this.$set(this.eqlv, i, this.eqlv[i]-1);
			this.setBattleInfo();
		},
		equipplus: function(i){
			var eq = this.equipDic[this.curPromo['equip_slot_'+i]];
			//装备的类型范围是(1,4)
			var jj = eq['promotion_level']
			//对应强化等级上限为
			var lvmax = this.Common.equip_lvmax;
			if(this.eqlv[i]<lvmax[jj-1]) this.$set(this.eqlv, i, this.eqlv[i]+1);
			this.setBattleInfo();
		},
		lvminus: function(){
			if(this.lv > 1)this.lv--;
		},
		lvplus: function(){
			if(this.lv < this.Common.lv_max)this.lv++;
		},
		rareminus: function(){
			if(this.rare>1)this.rare--;
		},
		rareplus: function(){
			if(this.rare<5)this.rare++;
		},
		rankminus: function(){
			if(this.rank>1)this.rank--;
		},
		rankplus: function(){
			if(this.rank < this.Common.rank_max) this.rank++;
		},
		loveminus: function(){
			if(this.love>1)this.love--;
		},
		loveplus: function(){
			if(this.love < this.Common.love_max) this.love++;
		},
		geturl: function(i,checked){
			var equipid = this.curPromo['equip_slot_'+i];
			var tt = (checked) ? equipid : 'invalid_' + equipid;
			if(equipid==undefined||equipid=='999999'){
				tt = '999999';
			}
            return '/static/img/equipment/icon_equipment_' + tt + '.png';
        }
	}
}
</script>


<style lang="scss">
#BattleCalculator {
	width: 1000px;
	margin: 10px;
	//margin-left: auto;
	//margin-right: auto;
	height: 500px;
	//background: white;
	

	input.num_input {
		width: 30px;
	}
	input[type="checkbox"] {
		-webkit-appearance: none; //去掉checkbox原有的样式
	}
	#equipNum.active{
		color: gray;
	}
	table#lvtable {
		border: solid #000 1px;
		width: 250px;
		height: 440px;
		th {
			height: 40px;
		}
		td {
			padding: 10px;
		}
	}
	table#resulttable {
		border: solid #000 1px;
		width: 500px;
		height: 440px;
		tr {
			height: 40px;
		}
		th {
			font-weight: bold;
			text-align: left;
			color: white;
			background: #212529;
			padding: 10px;
		}
		td {
			text-align: right;
			padding: 10px;
			width: 80px;
		}
	}
	table#equiptable {
		border: solid #000 1px;
		width: 250px;
		height: 440px;
		th {
			font-weight: bold;
			text-align: left;
			height: 40px;
			padding: 10px;
		}
		td {
			text-align: right;
			width: 80px;
			padding-left: 10px;
			padding-right: 10px;
		}
	}
}
</style>