<template>
<div id="charadatalist">
    <div>
        过滤器
    </div>
    <table>
        <tr>
            <th>头像</th>
            <th>角色名</th>
            <th>翻译名</th>
            <th>外号</th>
            <th>初始星级</th>
            <th>职业</th>
            <th>类型</th>
            <th>HP</th>
            <th>物攻</th>
            <th>魔攻</th>
            <th>物防</th>
            <th>魔防</th>
            <th>移速</th>
            <th>位置</th>
            <th>攻击方式</th>
            <th>攻击间隔时间</th>
        </tr>
        <tr v-for="(charaData,key) in charaDic" v-bind:key="key">
            <th>
                <router-link :to="getrouter(key)">
                    <div class="small_icon">
                        <img style="width:100%" :src="getIconImg(key)" />
                    </div>
                </router-link>
            </th>
            <th>{{ charaData.unit_name }}</th>
            <th>{{ getTransName(key) }}</th>
            <th>{{ getNickName(key) }}</th>
            <th>{{ charaData.rarity }}</th>
            <th>职业</th>
            <th>类型</th>
            <th>HP</th>
            <th>物攻</th>
            <th>魔攻</th>
            <th>物防</th>
            <th>魔防</th>
            <th>{{ charaData.move_speed }}</th>
            <th>{{ charaData.search_area_width }}</th>
            <th>{{ charaData.atk_type }}</th>
            <th>{{ charaData.normal_atk_cast_time }}</th>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    name: 'CharaDataList',
    props: ['charaDic'],
    created(){

    },
    data(){
        return{
            chceked: 0,
        }
    },
    watch: {

    },
    methods: {
        getIconImg: function(key){
            let chara_id = parseInt(key)+10;
            return this.Common.getUnitIcon(chara_id);
        },
        getTransName: function(key){
            let chara_id = parseInt(key/100);
            return this.Translation.zh_unit_name[chara_id];
        },
        getNickName: function(key){
            let chara_id = parseInt(key/100);
            return this.Translation.zh_nick_name[chara_id];
        },
        getrouter: function(key){
            let chara_id = parseInt(key/100);
            return '/chara/' + chara_id;
        }
    }
}    
</script>

<style lang="scss">
#charadatalist{

    tr.active {
        color: red;
        background: gray;
    }
    
    .collection-item {
        border: 1px solid #dadada;
        padding: 10px 2px;
        width: 98px;
        margin-bottom: 5px;
        text-align: center;
    }

    div.small_icon {
		width: 64px;
		height: 64px;
	}
}

</style>
