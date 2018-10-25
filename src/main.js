import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);

import SQL from 'sql.js';
Vue.use(SQL);

//公用数据
import CommonData from './commonData.js';
Vue.prototype.Common = CommonData;
//翻译数据
import Translation from './translateData.js';
Vue.prototype.Translation = Translation;

import Aplayer from 'vue-aplayer';
Vue.component('aplayer', Aplayer);

import moment from 'vue-moment';
Vue.use(moment);

//Spine动画
// import { spine } from './spine-webgl.js';
// Vue.prototype.spine = spine;
// Vue.use(spine);

import './style/common.scss';


import App from './App.vue';
import MainIndex from './views/MainIndex.vue';

import EventIndex from './views/EventIndex.vue';

import CharaIndex from './views/CharaIndex.vue';
import CharaProfile from './views/chara/charaProfile.vue';

import StoryIndex from './views/StoryIndex.vue';
import StoryTable from './views/story/storyTable.vue';

import EquipIndex from './views/equipIndex.vue';
import EquipTable from './views/equip/equipTable.vue';

import QuestIndex from './views/QuestIndex.vue';
import QuestTable from './views/quest/QuestTable.vue';

import TrainIndex from './views/TrainIndex.vue';
import DungeonTable from './views/dungeonTable.vue'; 
import ClanIndex from './views/clanindex.vue';
import Mission from './views/mission.vue';
import DownLoad from './views/download.vue';
import FileViewer from './views/download/FileViewer.vue';
import About from './views/about.vue';

//路由信息
const routes = [
    { path: '', component: MainIndex,},
    { path: '/event', component: EventIndex, },
    { path: '/chara', component: CharaIndex },
    { path: '/chara/:id', component: CharaProfile },
    { path: '/story', component: StoryIndex },
    { path: '/story/:id', component: StoryTable },
    { path: '/quest', component: QuestIndex },
    { path: '/quest/:id', component: QuestTable },
    { path: '/train/:id', component: TrainIndex },
    { path: '/dungeon/:id', component: DungeonTable },
    { path: '/equip', component: EquipIndex },
    { path: '/equip/:id', component: EquipTable },
    { path: '/mission', component: Mission },
    { path: '/clan', component: ClanIndex },
    { path: '/download/', component: DownLoad, children:[
        { path: 'stillunit', component: FileViewer,
            props: { 
                fileTitle: 'StillUnit',
                thumbclass: 'thumbstill',
                folder: 'stillunit'
            }
        },
        { path: 'item', component: FileViewer,
            props: { 
                fileTitle: 'Icon-Item',
                thumbclass: 'thumbitem',
                folder: 'item'
            } 
        },
        { path: 'equipment', component: FileViewer,
            props: { 
                fileTitle: 'Icon-Equipment',
                thumbclass: 'thumbitem',
                folder: 'equipment'
            } 
        },
        { path: 'unitplate', component: FileViewer,
            props: { 
                fileTitle: 'UnitPlate',
                thumbclass: 'thumbplate',
                folder: 'unitplate'
            }
        },
        { path: 'skill', component: FileViewer,
            props: { 
                fileTitle: 'Skill',
                thumbclass: 'thumbitem',
                folder: 'skill'
            }
        },
        { path: 'unit', component: FileViewer,
            props: { 
                fileTitle: 'Icon-Unit',
                thumbclass: 'thumbitem',
                folder: 'iconunit'
            }
        },
        { path: 'unitshadow', component: FileViewer,
            props: { 
                fileTitle: 'Icon-UnitShadow',
                thumbclass: 'thumbitem',
                folder: 'iconshadow'
            }
        },
        { path: 'charastory', component: FileViewer,
            props: { 
                fileTitle: 'CharaStory',
                thumbclass: 'thumbplate',
                folder: 'thumbstory'
            }
        },
    ]},
    { path: '/about', component: About }
]

const router = new VueRouter({
    //mode: 'history',
    routes: routes // (缩写) 相当于 routes: routes
})

const app = new Vue({
    el: '#app',
    template: '<App/>',
    components: { 
        App
    },
    router: router,
}).$mount('#app');