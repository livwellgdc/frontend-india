(window.webpackJsonp=window.webpackJsonp||[]).push([[147],{YPYn:function(i,t,a){"use strict";a.r(t);var e=a("8Y7J"),n=a("RliZ"),s=a("9JY2"),b=a("SqtC"),c=a("8uYd"),l=a("DWgq"),d=a("xKpn"),o=a("PoOZ");class h extends s.a{constructor(i,t,a,e,s,c){super(),this._bc=i,this._router=t,this._table=a,this._quickLink=e,this._common=s,this._toast=c,this.heading=[{heading:"Icon",key:"icon",type:"img",align:"center"},{heading:"Name",key:"name",align:"center",content:!0,type:"link",link:`/${b.ab}`},{heading:"Priority",key:"priority",align:"center",sort:!0},{heading:"DeepLink",key:"deepLink",align:"center"},{heading:"Action",key:"status",type:"action",action:[1,2,3]}],this.status=n.ec,this.subscriptions=[],this.tempList=[]}ngOnInit(){this._bc.setBreadcrumb(c.Gb),this.permissionHandler(),this.getQuickLinksListing()}permissionHandler(){let i=this._common.getPermissionBySectionId(n.Yb.QUICK_LINKS);Object(l.l)(i)||(i.addEdit||i.deleteBlock?(i.addEdit||(this.permissionClass="removeAddButton",this.heading[this.heading.length-1].action=this.removeAction([1])),i.deleteBlock||(this.heading[this.heading.length-1].action=this.removeAction([3]))):(this.permissionClass="removeAddButton",this.heading.splice(this.heading.length-1,1)))}removeAction(i){return this.heading[this.heading.length-1].action.filter(t=>!i.includes(t))}getQuickLinksListing(){this.subscriptions.push(this._quickLink.getQuickLinkList(this.validPageOptions).subscribe(i=>{this.tempList=i.data,i.data.forEach(i=>{i.name=Object(l.r)(i.name.en)}),this._table.tableRender(i)},()=>{this._table.tableRender({data:[]})}))}addQuiclLink(i){this._router.navigate(0==i.id?[`${b.ab}/${b.c}`]:[`${b.ab}/${b.I}`,i.data._id])}paginationWithSearch(i,t){switch(t){case 0:this.resetPages(),this.search=i,this.tableRef.paginator&&this.tableRef.paginator.firstPage();break;default:this.pageOptionsOnChange=i}this.getQuickLinksListing()}sortByListing(i){this.sortOptions=i,this.getQuickLinksListing()}changeStatus(i){switch(i.id){case 1:this.addQuiclLink(i);break;default:this.changeQuickLinksStatus(i)}}changeQuickLinksStatus(i){this._quickLink.deleteQuickLink({quickLinkId:i.data._id,status:i.action}).subscribe(t=>{i.action==this.API_EVENT.delete&&i.data.s_no>1&&i.data.s_no%this.limit==1&&1==this.tempList.length&&(this.pageNo=this.pageNo-1,this.tableRef.paginator.pageIndex=this.pageNo-1),this.getQuickLinksListing(),this._toast.success(t.message)})}submitFilter(i){this.filterForm.dirty&&(i.apply?this.filterOptions=this.filterForm.value:(this.filterOptions=null,this.filterForm.reset()),this.resetPages(),this.tableRef.paginator&&this.tableRef.paginator.firstPage(),this.getQuickLinksListing())}ngOnDestroy(){this.status.pop(),this.subscriptions.length>0&&this._common.unsubscribe(this.subscriptions)}}class r{}var u=a("pMnS"),O=a("NcP4"),g=a("t68o"),p=a("A8YC"),k=a("zbXB"),m=a("7nec"),f=a("d0kF"),L=a("A7ZX"),y=a("s6ns"),v=a("E2f4"),Q=a("iInd"),_=a("dfTd"),A=a("++gc"),w=a("A1Tq"),P=a("IrvQ"),F=e.Cb({encapsulation:0,styles:[[""]],data:{}});function I(i){return e.ac(0,[e.Wb(402653184,1,{tableRef:0}),(i()(),e.Eb(1,0,null,null,1,"mat-table-renderer",[["notFound","QuickLinks not added"],["placeholder","Search by Name"]],null,[[null,"status"],[null,"add"],[null,"find"],[null,"page"],[null,"sort"],[null,"filter"]],(function(i,t,a){var e=!0,n=i.component;return"status"===t&&(e=!1!==n.changeStatus(a)&&e),"add"===t&&(e=!1!==n.addQuiclLink(a)&&e),"find"===t&&(e=!1!==n.paginationWithSearch(a,0)&&e),"page"===t&&(e=!1!==n.paginationWithSearch(a,1)&&e),"sort"===t&&(e=!1!==n.sortByListing(a)&&e),"filter"===t&&(e=!1!==n.submitFilter(a)&&e),e}),f.b,f.a)),e.Db(2,245760,[[1,4]],0,d.a,[L.a,y.e,v.a,Q.a,_.a,A.a],{cls:[0,"cls"],heading:[1,"heading"],notFound:[2,"notFound"],placeholder:[3,"placeholder"]},{page:"page",find:"find",sort:"sort",add:"add",status:"status",filter:"filter"})],(function(i,t){var a=t.component;i(t,2,0,e.Ib(1,"",a.permissionClass," removeFilter"),a.heading,"QuickLinks not added","Search by Name")}),null)}function S(i){return e.ac(0,[(i()(),e.Eb(0,0,null,null,2,"lv-quicklinks-list",[],null,null,null,I,F)),e.Vb(512,null,o.a,o.a,[w.a]),e.Db(2,245760,null,0,h,[P.a,Q.o,L.a,o.a,A.a,_.a],null,null)],(function(i,t){i(t,2,0)}),null)}var B=e.Ab("lv-quicklinks-list",h,S,{},{},[]),N=a("SVse"),R=a("s7LF"),q=a("POq0"),E=a("Xd0L"),j=a("QQfA"),C=a("IP0z"),Y=a("JjoW"),Z=a("Mz6y"),x=a("cUpR"),H=a("OIZN"),W=a("7kcP"),D=a("821u"),G=a("/HVE"),T=a("gavF"),V=a("Gi4r"),z=a("HsOI"),J=a("oapL"),K=a("ZwOa"),M=a("Fwaw"),$=a("dHPm"),U=a("Z0D0"),X=a("zMNK"),ii=a("hOhj"),ti=a("igqZ"),ai=a("zQui"),ei=a("8rEH"),ni=a("5GAg"),si=a("UqGY"),bi=a("fjoK"),ci=a("A3va"),li=a("TTF9"),di=a("RGOs"),oi=a("tl6j"),hi=a("mkRZ"),ri=a("6d+p"),ui=a("oATp"),Oi=a("Mwml"),gi=a("pBi1"),pi=a("AHvR"),ki=a("phW1"),mi=a("UP7b"),fi=a("r0V8"),Li=a("ohvV");a.d(t,"QuicklinksListModuleNgFactory",(function(){return yi}));var yi=e.Bb(r,[],(function(i){return e.Nb([e.Ob(512,e.l,e.mb,[[8,[u.a,O.a,g.a,p.a,k.b,k.a,m.a,B]],[3,e.l],e.E]),e.Ob(4608,N.o,N.n,[e.A,[2,N.E]]),e.Ob(4608,R.B,R.B,[]),e.Ob(4608,q.c,q.c,[]),e.Ob(4608,E.d,E.d,[]),e.Ob(4608,R.f,R.f,[]),e.Ob(4608,j.d,j.d,[j.j,j.f,e.l,j.i,j.g,e.w,e.G,N.d,C.b,[2,N.i]]),e.Ob(5120,j.k,j.l,[j.d]),e.Ob(5120,Y.a,Y.b,[j.d]),e.Ob(5120,Z.b,Z.c,[j.d]),e.Ob(4608,x.e,E.e,[[2,E.i],[2,E.n]]),e.Ob(5120,H.c,H.a,[[3,H.c]]),e.Ob(5120,y.c,y.d,[j.d]),e.Ob(135680,y.e,y.e,[j.d,e.w,[2,N.i],[2,y.b],y.c,[3,y.e],j.f]),e.Ob(5120,W.d,W.a,[[3,W.d]]),e.Ob(4608,D.i,D.i,[]),e.Ob(5120,D.a,D.b,[j.d]),e.Ob(4608,E.c,E.x,[[2,E.h],G.a]),e.Ob(5120,T.c,T.j,[j.d]),e.Ob(4608,L.a,L.a,[]),e.Ob(1073742336,N.c,N.c,[]),e.Ob(1073742336,Q.s,Q.s,[[2,Q.x],[2,Q.o]]),e.Ob(1073742336,R.A,R.A,[]),e.Ob(1073742336,R.m,R.m,[]),e.Ob(1073742336,C.a,C.a,[]),e.Ob(1073742336,E.n,E.n,[[2,E.f],[2,x.f]]),e.Ob(1073742336,V.c,V.c,[]),e.Ob(1073742336,q.d,q.d,[]),e.Ob(1073742336,z.e,z.e,[]),e.Ob(1073742336,G.b,G.b,[]),e.Ob(1073742336,J.c,J.c,[]),e.Ob(1073742336,K.c,K.c,[]),e.Ob(1073742336,E.w,E.w,[]),e.Ob(1073742336,M.c,M.c,[]),e.Ob(1073742336,R.x,R.x,[]),e.Ob(1073742336,$.a,$.a,[]),e.Ob(1073742336,U.a,U.a,[]),e.Ob(1073742336,E.u,E.u,[]),e.Ob(1073742336,E.s,E.s,[]),e.Ob(1073742336,X.g,X.g,[]),e.Ob(1073742336,ii.c,ii.c,[]),e.Ob(1073742336,j.h,j.h,[]),e.Ob(1073742336,Y.d,Y.d,[]),e.Ob(1073742336,ti.e,ti.e,[]),e.Ob(1073742336,ai.p,ai.p,[]),e.Ob(1073742336,ei.m,ei.m,[]),e.Ob(1073742336,ni.a,ni.a,[]),e.Ob(1073742336,Z.e,Z.e,[]),e.Ob(1073742336,H.d,H.d,[]),e.Ob(1073742336,y.k,y.k,[]),e.Ob(1073742336,W.e,W.e,[]),e.Ob(1073742336,si.a,si.a,[]),e.Ob(1073742336,bi.a,bi.a,[]),e.Ob(1073742336,D.j,D.j,[]),e.Ob(1073742336,E.y,E.y,[]),e.Ob(1073742336,E.p,E.p,[]),e.Ob(1073742336,ci.a,ci.a,[]),e.Ob(1073742336,li.a,li.a,[]),e.Ob(1073742336,di.a,di.a,[]),e.Ob(1073742336,oi.a,oi.a,[]),e.Ob(1073742336,hi.e,hi.e,[]),e.Ob(1073742336,ri.a,ri.a,[]),e.Ob(1073742336,T.i,T.i,[]),e.Ob(1073742336,T.f,T.f,[]),e.Ob(1073742336,ui.a,ui.a,[]),e.Ob(1073742336,Oi.a,Oi.a,[]),e.Ob(1073742336,gi.d,gi.d,[]),e.Ob(1073742336,gi.c,gi.c,[]),e.Ob(1073742336,pi.a,pi.a,[]),e.Ob(1073742336,ki.a,ki.a,[]),e.Ob(1073742336,mi.a,mi.a,[]),e.Ob(1073742336,fi.d,fi.d,[]),e.Ob(1073742336,fi.c,fi.c,[]),e.Ob(1073742336,Li.a,Li.a,[]),e.Ob(1073742336,r,r,[]),e.Ob(256,E.g,E.k,[]),e.Ob(1024,Q.m,(function(){return[[{path:"",component:h}]]}),[])])}))}}]);