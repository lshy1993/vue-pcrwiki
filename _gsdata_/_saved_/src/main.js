import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import App from './App.vue';
import CharaProfile from './components/charaProfile.vue';
import CharaIndex from './components/CharaIndex.vue';
import CharaMainList from './components/charaMainList.vue';
import StoryList from './components/storyList.vue';
import StoryTable from './components/storyTable.vue';
import EquipMainList from './components/equipMainList.vue';
import EquipTable from './components/equipTable.vue';
import QuestMainList from './components/QuestMainList.vue';
import QuestTable from './components/QuestTable.vue';
import TrainTable from './components/trainTable.vue';
import DungeonTable from './components/dungeonTable.vue'; 
import EventIndex from './components/EventIndex.vue';

import Mission from './components/mission.vue';
import About from './components/about.vue';

import axios from 'axios'
import VueAxios from 'vue-axios'
import commonData from './commonData.js';
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

import './style/common.scss';

//路由信息
const routes = [
  { path: '', component: EventIndex,},
  { path: '/chara', component: CharaIndex,
    children: [
      { path: '', component: CharaMainList },
      { path: ':id', component: CharaProfile }
    ]
  },
  { path: '/story', component: StoryList },
  { path: '/story/:id', component: StoryTable },
  { path: '/quest', component: QuestMainList },
  { path: '/quest/:id', component: QuestTable },  
  { path: '/train/:id', component: TrainTable },
  { path: '/dungeon/:id', component: DungeonTable },
  { path: '/equip', component: EquipMainList },
  { path: '/equip/:id', component: EquipTable },
  { path: '/mission', component: Mission },
  
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