<template>
  <div id="app">
    <header class="naviTop clearfixbox">
        <div class="naviTitle clearfix">{{ msg }}</div>
        <div class="naviButton clearfix" v-for="(ele,key) in naviBtn" :key="key">
            <router-link :to="ele.to">
                <div class="naviButtonContent">
                    <div class="naviTxt">
                        {{ ele.txt }}
                    </div>
                    <div class="naviImg small_icon">
                        <!--img :src="ele.url" /-->
                    </div>
                </div>
            </router-link>
        </div>
        <div id="optionBox">
            语言/言語/Language
            <select>
                <option value="zh">简体中文</option>
                <option value="jp">日本語</option>
                <option value="en">English</option>
            </select>
        </div>
    </header>
    <router-view class="naviContent"></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to PcrWiki!',
            naviBtn:[
                {
                    to: "/",
                    url: '',
                    txt: "首页"
                },
                {
                    to: "/event",
                    url: '',
                    txt: "活动"
                },
                {
                    to: "/chara",
                    url: '',
                    txt: "角色"
                },
                {
                    to: "/story",
                    url: '',
                    txt: "故事"
                },
                {
                    to: "/quest",
                    url: '',
                    txt: "地图"
                },
                {
                    to: "/equip",
                    url: '',
                    txt: "装备"
                },
                {
                    to: "/mission",
                    url: '',
                    txt: "任务·公会"
                },
                // {
                //     to: "/kouryuaku",
                //     url: '',
                //     txt: "攻略"
                // },
                {
                    to: "/about",
                    url: '',
                    txt: "关于"
                }
            ]
        }
    },
    created: function() {
        // this.$http.get('/static/redive_jp.db.br' ,{responseType: 'arraybuffer'}).then((response) => {
        //     var Uints = new Uint8Array(response.data);
        //     this.Common.db = new SQL.Database(Uints);
        //     console.log('app init !! database loaded');
        // }, (err) => {
        //     console.log(err);
        // });
    },
    mounted(){
        
    },
    beforeRouteEnter (to, from, next) {
        // if(this.Common.db == undefined){
        //     this.$http.get('/static/redive_jp.db.br' ,{responseType: 'arraybuffer'}).then((response) => {
        //         var Uints = new Uint8Array(response.data);
        //         this.Common.db = new SQL.Database(Uints);
        //         console.log('app init !! database loaded');
        //     }, (err) => {
        //         console.log(err);
        //         //next();
        //     });
        // }
        next();
    },
    methods:{
    }
}
</script>

<style lang="scss">
#app {
    .naviTop{
        position: fixed;
        top: 0;
        width: 100%;
        height: 40px;
        padding: 5px;
        background: #fed;
        z-index: 99999;
        box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);

        .naviTitle {
            width: 200px;
            color: green;
            padding: 10px;
            font-size: 20px;
        }
        .naviButton {
            position: relative;
            margin: 0 10px;

            .naviTxt{
                margin: auto;
            }
            .naviButtonContent{
                width: 100px;
                height: 100%;
                text-align: center;
                background: olivedrab;
            }

            .naviImg{
                position: absolute;
                top: 0;
            }
        }

        #optionBox {
            position: absolute;
            right: 10px;
        }
        
    }
    .naviContent {
        margin-top: 60px;
        margin-left: 15px;
        margin-right: 15px;
        margin-bottom: 10px;
    }

    a.router-link-active.router-link-exact-active {
        color: white;
    }
    a {
        text-decoration:none;  /*超链接无下划线*/
        color: black;
    }

}
</style>
