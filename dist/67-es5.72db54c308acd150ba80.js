(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{"6d+p":function(n,t,l){"use strict";l.d(t,"a",(function(){return e}));class e{}},"9JY2":function(n,t,l){"use strict";l.d(t,"a",(function(){return e}));class e{constructor(){this.API_EVENT={defaultLimit:100,delete:"DELETED",active:"UN_BLOCKED",block:"BLOCKED",all:"ALL",ongoing:"ONGOING",upcoming:"UPCOMING",ended:"ENDED",expired:"EXPIRED",confirmed:"CONFIRMED",complete:"COMPLETE",incomplete:"INCOMPLETE",cancelled:"CANCELLED",pending:"PENDING",quickLinks:"QUICK_LINKS",producstStore:"PRODUCTS_STORE",generic:"GENERIC_CATEGORIES",class:"CLASS",event:"EVENT",challenge:"CHALLENGE",livwellBenifit:"LIVWELL_BENEFITS",fitnessVideo:"FITNESS_VIDEO",joining:"JOINING",health:"HEALTH",reward:"REWARD",healthHistory:"HEALTH_HISTORY",rewardHistory:"REWARD_HISTORY",pointHistory:"POINT_HISTORY",loginHistory:"LOGIN_HISTORY",badgeHistory:"BADGE_HISTORY",challengeHistory:"CHALANGE_HISTORY",approved:"APPROVED",rejected:"REJECTED",productsStore:"PRODUCTS_STORE"},this.today=new Date,this.nextHit=2,this.sortBy="created",this.sortOrder="-1",this.permissionClass="",this.viewPermission=!0,this.total=0,this.pageNo=1,this.limit=10,this.pageOptions=[5,10,25,100]}get pageParams(){return{pageNo:this.pageNo,limit:this.limit}}get searchFilter(){return{searchKey:this.search}}get sortHeaders(){return{sortBy:this.sortBy,sortOrder:this.sortOrder}}get typeOf(){return{type:this.type,status:this.statusType}}confirmPageReload(){}allPrams(){return Object.assign({},this.typeOf,this.pageParams,this.filterOptions,this.searchFilter,this.sortHeaders)}normalPrams(){return Object.assign({},this.pageParams,this.filterOptions,this.searchFilter)}validateDeletion(){1!==this.total&&this.total-(this.pageNo-1)*this.limit==1&&(this.pageNo--,this.total--)}get validPageOptions(){const n=this.allPrams(),t={};for(var l=0,e=Object.keys(n);l<e.length;l++){const i=e[l];(n[i]||0===n[i])&&(t[i]=n[i])}return t}get params(){const n=this.normalPrams(),t={};for(var l=0,e=Object.keys(n);l<e.length;l++){const i=e[l];(n[i]||0===n[i])&&(t[i]=n[i])}return t}set pageOptionsOnChange(n){this.pageNo=n.pageIndex+1,this.limit=n.pageSize}set sortOptions(n){n.direction?(this.sortBy=n.active,this.sortOrder="asc"===n.direction?"1":"-1"):(this.sortBy=null,this.sortOrder=null)}currentIndex(n){return(this.pageNo-1)*this.limit+n+1}resetPages(){this.pageNo=1,this.nextHit=2}}},"M/Fb":function(n,t,l){"use strict";l.d(t,"a",(function(){return e}));class e{constructor(){}ngOnInit(){}}},Qs3C:function(n,t,l){"use strict";l.r(t);var e=l("8Y7J");class i{constructor(n){this._router=n}ngOnInit(){this.currentTab=this._router.url.split("/")[2]}}class a{}var s=l("pMnS"),r=l("a4vG"),o=l("fgjK"),u=l("A1Tq"),d=l("F4VZ"),c=l("dfTd"),g=l("zIN6"),b=l("tsPK"),p=l("s7LF"),h=l("IrvQ"),O=l("++gc"),m=l("iInd"),f=e.Cb({encapsulation:0,styles:[[""]],data:{}});function E(n){return e.ac(0,[(n()(),e.Eb(0,0,null,null,3,"lv-editor",[],null,null,null,r.b,r.a)),e.Vb(512,null,o.a,o.a,[u.a]),e.Vb(512,null,d.a,d.a,[c.a,g.a]),e.Db(3,245760,null,0,b.a,[p.f,o.a,c.a,h.a,d.a,O.a],{currentUrl:[0,"currentUrl"]},null)],(function(n,t){n(t,3,0,t.component.currentTab)}),null)}var y=e.Ab("lv-contact-us",i,(function(n){return e.ac(0,[(n()(),e.Eb(0,0,null,null,1,"lv-contact-us",[],null,null,null,E,f)),e.Db(1,114688,null,0,i,[m.o],null,null)],(function(n,t){n(t,1,0)}),null)}),{},{},[]),C=l("SVse"),P=l("IP0z"),v=l("Xd0L"),w=l("cUpR"),_=l("/HVE"),k=l("Fwaw"),M=l("alHs"),I=l("Cdor"),N=l("6d+p"),T=l("aRbg");l.d(t,"ContactUsModuleNgFactory",(function(){return H}));var H=e.Bb(a,[],(function(n){return e.Nb([e.Ob(512,e.l,e.mb,[[8,[s.a,y]],[3,e.l],e.E]),e.Ob(4608,C.o,C.n,[e.A,[2,C.E]]),e.Ob(4608,p.f,p.f,[]),e.Ob(4608,p.B,p.B,[]),e.Ob(1073742336,C.c,C.c,[]),e.Ob(1073742336,m.s,m.s,[[2,m.x],[2,m.o]]),e.Ob(1073742336,P.a,P.a,[]),e.Ob(1073742336,v.n,v.n,[[2,v.f],[2,w.f]]),e.Ob(1073742336,_.b,_.b,[]),e.Ob(1073742336,v.w,v.w,[]),e.Ob(1073742336,k.c,k.c,[]),e.Ob(1073742336,M.c,M.c,[]),e.Ob(1073742336,p.A,p.A,[]),e.Ob(1073742336,p.x,p.x,[]),e.Ob(1073742336,I.a,I.a,[]),e.Ob(1073742336,N.a,N.a,[]),e.Ob(1073742336,T.a,T.a,[]),e.Ob(1073742336,a,a,[]),e.Ob(256,M.a,{modules:M.f},[]),e.Ob(1024,m.m,(function(){return[[{path:"",component:i}]]}),[])])}))},ic1F:function(n,t,l){"use strict";var e=l("8Y7J");l("M/Fb"),l.d(t,"a",(function(){return i})),l.d(t,"b",(function(){return a}));var i=e.Cb({encapsulation:0,styles:[['.loader[_ngcontent-%COMP%]{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:100%;margin-top:15px}.lds-spinner[_ngcontent-%COMP%]{color:official;display:inline-block;position:relative;width:80px;height:80px}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{-webkit-transform-origin:40px 22px;transform-origin:40px 22px;-webkit-animation:1.3s linear infinite lds-spinner;animation:1.3s linear infinite lds-spinner}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:after{content:" ";display:block;position:absolute;top:3px;left:37px;width:4px;height:13px;border-radius:20%;background:#900968}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(1){-webkit-transform:rotate(0);transform:rotate(0);-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(2){-webkit-transform:rotate(30deg);transform:rotate(30deg);-webkit-animation-delay:-1s;animation-delay:-1s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(3){-webkit-transform:rotate(60deg);transform:rotate(60deg);-webkit-animation-delay:-.9s;animation-delay:-.9s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(4){-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-animation-delay:-.8s;animation-delay:-.8s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(5){-webkit-transform:rotate(120deg);transform:rotate(120deg);-webkit-animation-delay:-.7s;animation-delay:-.7s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(6){-webkit-transform:rotate(150deg);transform:rotate(150deg);-webkit-animation-delay:-.6s;animation-delay:-.6s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(7){-webkit-transform:rotate(180deg);transform:rotate(180deg);-webkit-animation-delay:-.5s;animation-delay:-.5s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(8){-webkit-transform:rotate(210deg);transform:rotate(210deg);-webkit-animation-delay:-.4s;animation-delay:-.4s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(9){-webkit-transform:rotate(240deg);transform:rotate(240deg);-webkit-animation-delay:-.3s;animation-delay:-.3s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(10){-webkit-transform:rotate(270deg);transform:rotate(270deg);-webkit-animation-delay:-.2s;animation-delay:-.2s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(11){-webkit-transform:rotate(300deg);transform:rotate(300deg);-webkit-animation-delay:-.1s;animation-delay:-.1s}.lds-spinner[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:nth-child(12){-webkit-transform:rotate(330deg);transform:rotate(330deg);-webkit-animation-delay:0s;animation-delay:0s}@-webkit-keyframes lds-spinner{0%{opacity:1}100%{opacity:0}}@keyframes lds-spinner{0%{opacity:1}100%{opacity:0}}']],data:{}});function a(n){return e.ac(0,[(n()(),e.Eb(0,0,null,null,13,"div",[["class","loader"]],null,null,null,null,null)),(n()(),e.Eb(1,0,null,null,12,"div",[["class","lds-spinner"]],null,null,null,null,null)),(n()(),e.Eb(2,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(3,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(4,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(5,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(6,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(7,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(8,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(9,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(10,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(11,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(12,0,null,null,0,"div",[],null,null,null,null,null)),(n()(),e.Eb(13,0,null,null,0,"div",[],null,null,null,null,null))],null,null)}}}]);