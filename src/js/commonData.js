var naviBtn = [
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
        to: "/clan",
        url: '',
        txt: "公会"
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
        txt: "任务"
    },
    {
        to: "/kouryuaku",
        url: '',
        txt: "攻略"
    },
    {
        to: "/about",
        url: '',
        txt: "关于"
    }
]

var status_type = ["none"            ,"hp"                  ,"atk"               , "def"           , "magic_str" , 
                   "magic_def"       ,"physical_critical"   ,"magic_critical"    , "dodge"         , "life_steal", 
                   "wave_hp_recovery","wave_energy_recovery","physical_penetrate","magic_penetrate","energy_recovery_rate",
                   "hp_recovery_rate","energy_reduce_rate"];

var equip_type = ['none', 'hp', 'atk', 'magic_str', 'def', 'magic_def', 
                  'physical_critical', 'magic_critical', 'wave_hp_recovery',
                  'wave_energy_recovery', 'dodge', 'physical_penetrate',
                  'magic_penetrate', 'life_steal', 'hp_recovery_rate',
                  'energy_recovery_rate', 'energy_reduce_rate', 'accuracy'];

var odds_file_icon = {
    "box_rank_1-3": 99002,
    "eq_rank_3-6": 99002,
    "eq_rank_4-7": 99002,
    "1000120101": 31012,
    "1000120102": 31038,
    "1000220101": 31004,
    "1000220102": 31020,
    "1000320101": 31010,
    "1000320102": 31017,
    "1000420101": 31076,
    "1000420102": 31028,
    "eq_rank_5-8": 99002,
    "1000520101": 31080,
    "1000520102": 31032
};
var odds_file_name = { 
    "box_rank_1-3":"ランダム装備BOX",
    "eq_rank_3-6":"RANK3～6の装備アイテム",
    "eq_rank_4-7":"RANK4～7の装備アイテム",
    "1000120101":"ハツネのメモリーピース",
    "1000120102":"シオリのメモリーピース",
    "1000220101":"ミソギのメモリーピース",
    "1000220102":"ミミのメモリーピース",
    "1000320101":"マホのメモリーピース",
    "1000320102":"カオリのメモリーピース",
    "1000420101":"コッコロ（サマー）のメモリーピース",
    "1000420102":"サレンのメモリーピース",
    "eq_rank_5-8":"RANK5～8の装備アイテム",
    "1000520101":"ミフユ（サマー）のメモリーピース",
    "1000520102":"アキノのメモリーピース",
}
var equip_lvmax = [0,1,3,5];

var lv_max = 102;
var rank_max = 10;
var love_max = 8;

var campaign_type = {
    101: 'Normal Quest',
    102: 'Hard Quest',
    103: '探索',
    104: 'Downgeon'
}
var date = new Date();
var db;
var rpmode = 'repeat-one';

function prepare(sql){
    var url = GetApi('pcr');
    this.$http.get(url, { params: {sql: sql}}).then((response)=>{
        return response.data;
    });
}

function getRewardImg(type,key){
    //var tt = "";
    if(type == 2 && key<100000){
        return 'static/img/item/icon_item_' + key + '.png';
    }
    if(type == 4){
        return 'static/img/equipment/icon_equipment_' + key + '.png';
    }
    if(type == 5){
        return 'static/img/item/icon_item_92001.png';
    }
    if(type == 6 || type == 8 || type == 12){
        return 'static/img/item/icon_item_' + key + '.png';
    }
    return 'static/img/equipment/icon_icon_equipment_' + key + '.png';
}

function getEnemyImg(key){
    if(key>600000){
        let id = 100010 + key%10000;
        return 'static/img/iconshadow/icon_shadow_' + id + '.png';
    }
    return 'static/img/iconunit/icon_unit_' + key + '.png';
}

function getQuestIcon(key){
    return 'static/img/iconquest/icon_quest_'+key+'.png';
}

function getMapIcon(key){
    return 'static/img/iconmap/icon_map_'+key+'.png';
}

function getUnitIcon(key){            
    return "/static/img/iconunit/icon_unit_"+key+".png";
}

function getEquipIcon(key){
    return '/static/img/equipment/icon_equipment_' + key + '.png';
}

function getStoryTopThumb(key){
    return '/static/img/thumbstorytop/thumb_chara_story_top_'+key+'.png';
}
function getStoryThumb(key){
    return '/static/img/thumbstory/thumb_story_'+key+'.png';
}

function getGuildStoryThumb(key){
    return '/static/img/thumbguildstory/thumb_guild_story_top_'+key+'.png';
}

function getDungeonThumb(key){
    return '/static/img/icondungeon/AtlasDungeon_'+key+'.png';
}

function getStillUnit(key){
    return "/static/img/stillunit/still_unit_" +key+ ".png";
}

function getBGM(key){
    return '/static/bgm/'+key+'.ogg';
}

function getBGMObject(key){
    var music = {
        src: '/static/bgm/'+key+'.ogg',
        title: key,
        artist: 'cygames'
    }
    return music;
}

function getVoice(chara,key){
    chara = parseInt(chara/100);
    return '/static/voice/'+chara+'/'+key+'.ogg';
}

function ranBG(){
    let random = Math.floor(Math.random()*(80)+1001);
    return 'url(/static/img/stillunit/still_unit_'+random+'31.png)';
}
function changeByte(bytes){
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes)/Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    //return btsize/1024;
}

function GetApi(path){
    return 'https://api.liantui.moe/'+path;
}

export default {
    naviBtn,
    status_type,
    equip_type,
    odds_file_icon,
    odds_file_name,
    equip_lvmax,
    lv_max,
    rank_max,
    love_max,
    campaign_type,
    db,
    prepare,
    rpmode,
    date,
    getRewardImg,
    getQuestIcon,
    getMapIcon,
    getEnemyImg,
    getUnitIcon,
    getEquipIcon,
    getVoice,
    getBGMObject,
    getStillUnit,
    getBGM,
    getStoryTopThumb,
    getStoryThumb,
    getGuildStoryThumb,
    getDungeonThumb,
    ranBG,
    changeByte,
    GetApi
}