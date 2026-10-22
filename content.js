export const SOURCES={history:'https://www.dswxyjy.org.cn/n/2013/0815/c222137-22578237.html',architecture:'https://peixun.hnu.edu.cn/info/1041/1081.htm'};
export const CHAPTERS=[
 {name:'叩门',subtitle:'门前，先把脚步放慢。',hint:'双臂展开，或向两侧拖开木门',symbol:'↔'},
 {name:'入院',subtitle:'一座农舍的日常，藏在瓦、竹与水之间。',hint:'挥手拂雾 · 点水起纹 · 触竹听风',symbol:'≈'},
 {name:'读屋',subtitle:'开一扇窗，读几页来路。',hint:'开窗引光 · 翻书读史 · 写意落印',symbol:'⌑'},
 {name:'回望',subtitle:'把走过的场景，留成自己的行旅手札。',hint:'双手合拢保持片刻，或点击留影',symbol:'◇'}
];
export const ENCOUNTERS={
 door:{icon:'↔',position:[.56,.59],label:'推开木门',detail:'双臂展开保持片刻；也可横向拖门或按 Enter。',meaning:'推门是本次数字漫游的开始。门的动作与动线属于创作设计。'},
 mist:{icon:'彡',position:[.28,.43],label:'拂去晨雾',detail:'左右挥手，或按住画面横向扫动，让雾气散开。',meaning:'雾是湘中山间氛围的艺术表达，不代表故居固定天气。'},
 pond:{icon:'≈',position:[.67,.78],label:'点水成纹',detail:'手移动到水面，或点击、拖动水面，水纹随动作扩散。',meaning:'故居前临水塘、后倚青山。水面互动取意于真实环境关系。',source:SOURCES.history},
 bamboo:{icon:'竹',position:[.88,.43],label:'摇竹听风',detail:'手停在竹影间；也可拖动竹梢，松手后缓缓回弹。',meaning:'竹影与风声是场景氛围设计。观察动作如何转化为有惯性的回应。'},
 sun:{icon:'☼',position:[.48,.28],label:'牵引天光',detail:'举起一只手改变光线；也可选中后上下拖动或调节光影刻度。',meaning:'明暗变化帮助观察屋檐、土墙与院落层次，是数字光影演绎。'},
 chime:{icon:'♧',position:[.73,.35],label:'轻触檐铃',detail:'停手檐铃旁或轻点，触发摆动与合成钟声。',meaning:'檐铃是用于声音反馈的艺术装置，并非史料确认的故居原物。'},
 window:{icon:'⊞',position:[.82,.35],label:'推窗见光',detail:'在窗前停手后展开双臂；也可点击或拖动窗扇。',meaning:'故居为土木结构农舍。窗的光影让材料的质感变得可感。',source:SOURCES.architecture},
 book:{icon:'册',position:[.59,.69],label:'翻页读史',detail:'在书页停手后左右挥动；也可点击书页边缘或用 ← → 翻页。',meaning:'书笺中的历史事实附有出处；书本是阅读界面，不是历史文物复制品。'},
 ink:{icon:'笔',position:[.47,.77],label:'指尖写意',detail:'选中笔后在纸面移动手；鼠标或触屏按住纸面即可留墨。',meaning:'让动作留下痕迹：纸上墨线属于你的数字笔迹，不模仿历史人物书法。'},
 seal:{icon:'印',position:[.76,.78],label:'落下印记',detail:'留下墨迹后双手合拢；也可点击“印”在纸上落下参访印记。',meaning:'“故居回响”为本作品设计的参访印记，不是历史人物印章。'},
 lantern:{icon:'灯',position:[.35,.32],label:'点亮一室',detail:'双手举过头顶点灯，放下后再次举起可熄灯；也可点按灯笼。',meaning:'灯笼与暖光是数字场景装置。它们回应动作，而非复原历史场景。'},
 postcard:{icon:'◇',position:[.69,.58],label:'留下此刻',detail:'双手合拢保持约一秒，或点击留影；预览后可以下载PNG。',meaning:'手札记录已体验的互动、读过的史料，以及你留下的纸上笔迹。'}
};
export const PAGES=[
 {year:'1898',title:'从炭子冲开始',text:'1898年11月24日，刘少奇诞生于炭子冲，在这里度过童年和少年时代。普通农舍承载着人生最初的生活经验。',source:SOURCES.architecture},
 {year:'1916',title:'离乡求学的脚步',text:'1916年，刘少奇赴长沙求学，寒暑假仍回家居住。家乡与外面的世界，随着求学的脚步逐渐相连。',source:SOURCES.architecture},
 {year:'1961',title:'回到家乡开展调查',text:'1961年5月，刘少奇回乡调查研究，曾在故居居住一周。横堂屋等空间也由此承载了另一层历史记忆。',source:SOURCES.history}
];
export const ARCHIVE=[
 {year:'建筑',title:'半茅半瓦的农舍',text:'土木结构、小青瓦与茅草相间的屋面，是理解故居朴素材料的一条线索。',source:SOURCES.architecture},
 {year:'环境',title:'山水之间',text:'故居坐东朝西，前临水塘，后倚青山。作品水纹以这一环境关系为灵感。',source:SOURCES.history},
 ...PAGES,
 {year:'1988',title:'作为历史空间被保护',text:'1988年1月，刘少奇故居被公布为全国重点文物保护单位。参访也意味着理解与珍惜历史遗存。',source:SOURCES.history}
];
