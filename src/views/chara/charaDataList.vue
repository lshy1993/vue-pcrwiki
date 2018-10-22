<template>
<div id="charadatalist">
    <chara-filter v-on:filter="listenProps"/>
    <table>
        <thead>
            <tr>
                <th @click="sortBy('unit_id')">头像</th>
                <th>角色名</th>
                <th>翻译名</th>
                <!--th>外号</th-->
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
        </thead>
        <transition-group name="flip-list" tag="tbody">
            <tr v-for="(ele,key) in charaShowDic" :key="ele.unit_id">
                <th>
                    <router-link :to="getrouter(ele.unit_id)">
                        <div class="small_icon">
                            <img style="width:100%" :src="getIconImg(ele.unit_id)" />
                        </div>
                    </router-link>
                </th>
                <th>{{ ele.unit_name }}</th>
                <th>{{ getTransName(ele.unit_id) }}</th>
                <!--th>{{ getNickName(ele.unit_id) }}</th-->
                <th>{{ ele.rarity }}</th>
                <th>职业</th>
                <th>类型</th>
                <th>HP</th>
                <th>物攻</th>
                <th>魔攻</th>
                <th>物防</th>
                <th>魔防</th>
                <th>{{ ele.move_speed }}</th>
                <th>{{ ele.search_area_width }}</th>
                <th>{{ ele.atk_type==1?"物理":"魔法" }}</th>
                <th>{{ ele.normal_atk_cast_time }}</th>
            </tr>
        </transition-group>
    </table>
</div>
</template>

<script>
import CharaFilter from '@/components/charaFilter.vue';

export default {
    name: 'CharaDataList',
    props: ['charaDic'],
    created(){

    },
    data(){
        return{
            filter: {},
            chceked: 0,
            sortKey: ''
        }
    },
    computed:{
        charaShowDic: function () {
            var result = [];
            for(var key in this.charaDic){
                let ele = this.charaDic[key];
                result.push(ele);
            }
            result = result.filter(this.checkStar);
            result = result.filter(this.checkPos);
            return result;
        }
    },
    methods: {
        listenProps: function(childValue){
            this.filter = childValue;
        },
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
        },
        checkStar: function(ele){
            if(this.filter.star == -1) return true;
            return ele.rarity==this.filter.star;
        },
        checkPos: function(ele){
            if(this.filter.position == -1) return true;
            let min = 300*(this.filter.position-1);
            let max = 300*(this.filter.position);
            return ele.search_area_width <= max && ele.search_area_width > min;
        },
        sortBy: function(key) {
            this.sortKey = key;
        }
    },
    components:{
        CharaFilter
    }
}    
</script>

<style lang="scss">
.flip-list-move {
    transition: transform 1s;
}
.flip-list-enter, .flip-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
.flip-list-leave, .flip-list-enter-to {
    opacity: 0;
    transform: translateY(30px);
}


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
