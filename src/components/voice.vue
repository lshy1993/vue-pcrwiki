<template>
<div>
	<li v-for="(ele,key) in charaVoice" :key="">
	</li>



</div>
</template>


<script>
export default {
	name: 'charaVoice',
	date(){
		return {
			charaVoice: {},
		}
	},
	methods: {
		loadData: function(){
			var db = this.Common.db;
			var result = db.prepare("SELECT * FROM album_voice_list WHERE unit_id ="+this.unitid);
			this.setVoiceData(result);


		},
		setVoiceData: function(result){
			var dd = {};
			while(result.step()){
				var ele = result.getAsObjet();
				let index = ele.id;
				dd[index] = ele;
			}
			this.charaVoice = dd;
		}
	}
	
}




</script>