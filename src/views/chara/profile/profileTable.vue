<template>
	<div class="clearfix" id="ProfileTable">
		<table border="1">
			<tr>
				<th colspan="4">{{ profileInfo.unit_id }}</th>
			</tr>
			<tr>
				<th>角色名</th>
				<td>{{ profileInfo.unit_name }}</td>
				<th>翻译名</th>
				<td>{{ zh_name }}</td>
			</tr>
			<tr>
				<th>年龄</th>
				<td>{{ profileInfo.age }}</td>
				<th>外号</th>
				<td>{{ nick_name }}</td>
			</tr>
			<tr>
				<th>身高</th>
				<td>{{ profileInfo.height }}cm</td>
				<th>体重</th>
				<td>{{ profileInfo.weight }}kg</td>
			</tr>
			<tr>
				<th>种族</th>
				<td>{{ profileInfo.race }}</td>
				<th>所属</th>
				<td>{{ profileInfo.guild }}</td>
			</tr>
			<tr>
				<th>生日</th>
				<td>{{ profileInfo.birth_month }}月{{ profileInfo.birth_day }}日</td>
				<th>血型</th>
				<td>{{ profileInfo.blood_type }}</td>
			</tr>
			<tr>
				<th>简介</th>
				<td colspan="3">{{ profileInfo.catch_copy }}</td>
			</tr>
			<tr>
				<th>兴趣</th>
				<td colspan="3">{{ profileInfo.favorite }}</td>
			</tr>
			<tr>
				<th>CV</th>
				<td colspan="3">{{ profileInfo.voice }}</td>
			</tr>
			<tr>自我介绍</tr>
			<tr>
				<td class='pretext' colspan="4">
					<pre>{{ self_text }}</pre>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
  name: 'ProfileTable',
	props:['profileInfo'],
	data(){
		return {
			//profileInfo: {}
		}
	},
	computed:{
		zh_name: function(){
			let chara_id = parseInt(this.profileInfo.unit_id/100);
			return this.Translation.zh_unit_name[chara_id];
		},
		nick_name: function(){
			let chara_id = parseInt(this.profileInfo.unit_id/100);
			return this.Translation.zh_nick_name[chara_id];
		},
		self_text: function(){
			if(this.profileInfo.self_text == undefined) return "";
			var reg = new RegExp( /\\n/ , "g" );
            return this.profileInfo.self_text.replace(reg,"\n");
		}
	},
	created() {
		//this.setProfile();
	},
	methods: {
		// setProfile: function(){
		// 	console.log('setProfile',this.unitid);
		// 	var result = this.Common.db.prepare("SELECT * FROM unit_profile WHERE unit_id = "+this.unitid);
		// 	while(result.step()){
		// 		this.profileInfo = result.getAsObject();
		// 	}
		// 	//释放
		// 	result.free();

        // }
	}
}
</script>

<style lang="scss">
#ProfileTable {
	margin: 10px;

	td {
		text-align: right;
		width: 200px;
	}
	th {
		//background-color: aqua;
		font-weight: bold;
		width: 80px;
		text-align: left;
	}
	.pretext {
		text-align: left;
	}
}
</style>
