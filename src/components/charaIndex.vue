<template>
    <div>
        <!--p>
        {{ msg }}
        <router-link to="/chara/1004">/chara/1004</router-link>
        <input type="text" v-model="inputnum">
        <button v-on:click="setNum">SeeChara</button>
        </p-->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'CharaIndex',
    data(){
        return{
            inputnum: '',
            msg: 'this is chara frame'
        }
    },
    created: function(){
        console.log("chara frame");
    },
    methods:{
        setNum: function () {
            this.msg = this.inputnum;
            const tt = this.inputnum;
            //改为路由跳转
            this.$router.push({ path:`/chara/${tt}` });
        }
	}
}    
</script>