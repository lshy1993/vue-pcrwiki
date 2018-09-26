<template>
<div id="voiceTable">
    <h2>角色语音试听</h2>
	<audio ref="voiceplayer" :autoplay="'autoplay'" :src="voiceurl" />
	<table>
		<tr v-for="(ele,key) in charaVoiceData" :key="key">
			<th>{{ ele.title }}</th>
			<td>
				<button v-on:click="setVoice(ele)">Play</button>
				<!--aplayer autoplay :music="{
					src: Common.getVoice(ele.unit_id,ele.voice_id),
					}" :mini="true"/-->
			</td>
		</tr>
	</table>
</div>
</template>

<script>
import Aplayer from 'vue-aplayer';
export default {
	name: 'CharaVoice',
    props: ['unitid'],
	data(){
		return {
			charaVoiceData: {},
			voiceurl: ''
		}
	},
	created(){
		this.loadData();
	},
	watch: {
		unitid: function(){
			//检测到传入的unitid变动重新获取数据库
			this.loadDate();
		}
	},
	methods: {
		loadData: function(){
			this.$http.get("http://api.liantui.xyz/pcr/voice/"+this.unitid).then((response)=>{
                this.setVoiceData(response.data);
            });
			//var result = this.Common.prepare("SELECT * FROM album_voice_list WHERE unit_id = " + this.unitid);
			//this.setVoiceData(result);
		},
		setVoiceData: function(result){
			var btl = {};
			var cmn = {};
			var room = {};
			for(var id in result){
				var ele = result[id];
				let index = ele.id;
				btl[index] = ele;
			}
			this.charaVoiceData = btl;
		},
		setVoice: function(ele){
			this.voiceurl = this.Common.getVoice(ele.unit_id,ele.voice_id);
			//this.$refs.voiceplayer.play();
		}
	},
	components: {
		Aplayer
	}
}
</script>

<style lang="scss">
#voiceTable{
	margin: 10px;
}
</style>
