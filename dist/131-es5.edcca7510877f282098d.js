(window.webpackJsonp=window.webpackJsonp||[]).push([[131],{"9+cp":function(t,a,e){"use strict";e.r(a);var i=e("8Y7J"),n=e("SqtC"),s=e("xKpn"),o=e("kwfS"),r=e("9JY2"),d=e("8uYd"),c=e("DWgq"),b=e("RliZ");class h extends r.a{constructor(t,a,e,i,s,o){super(),this._bc=t,this._router=a,this._toast=e,this._table=i,this._group=s,this._common=o,this.heading=[{heading:"Group Name",key:"name",sort:!0,type:"link",link:"/".concat(n.O)},{heading:"User Type",key:"userType",align:"center"},{heading:"Short Name",key:"shortName",align:"center"},{heading:"Limit to Join",key:"userLimit",align:"center"},{heading:"Joined Participants",key:"totalParticipant",align:"center"},{heading:"Privacy",key:"privacy",align:"center"},{heading:"Created On",key:"created",align:"center",type:"date"},{heading:"Action",key:"status",type:"action",action:[1,2,3]}],this.tempList=[],this.subscriptions=[]}ngOnInit(){this._bc.setBreadcrumb(d.kb),this.permissionHandler(),this.getGroupListing()}permissionHandler(){let t=this._common.getPermissionBySectionId(b.Yb.GROUPS);Object(c.l)(t)||(t.addEdit||t.deleteBlock?(t.addEdit||(this.permissionClass="removeAddButton",this.heading[this.heading.length-1].action=this.removeAction([1,5])),t.deleteBlock||(this.heading[this.heading.length-1].action=this.removeAction([2]))):(this.permissionClass="removeAddButton",this.heading.splice(this.heading.length-1,1)))}removeAction(t){return this.heading[this.heading.length-1].action.filter(a=>!t.includes(a))}getGroupListing(){this.subscriptions.push(this._group.getGroupList(this.validPageOptions).subscribe(t=>{this.tempList=t.data,t.data.forEach(t=>{t.name=Object(c.r)(t.name.en),t.userType=t.createdBy&&t.createdBy.userType?t.createdBy.userType:"ADMIN",t.privacy="PUBLIC"==t.privacy?"Public":"Corporate",t.isEdited=!t.createdBy||"USER"!=t.createdBy.userType}),this._table.tableRender(t)},()=>{this._table.tableRender({data:[]})}))}addGroups(t){this._router.navigate(0==t.id?["".concat(n.O,"/").concat(n.c)]:["".concat(n.O,"/").concat(n.I),t.data._id])}paginationWithSearch(t,a){switch(a){case 0:this.resetPages(),this.search=t,this.tableRef.paginator&&this.tableRef.paginator.firstPage();break;default:this.pageOptionsOnChange=t}this.getGroupListing()}sortByListing(t){this.sortOptions=t,this.getGroupListing()}changeStatus(t){switch(t.id){case 1:this.addGroups(t);break;default:this.changeGroupStatus(t)}}changeGroupStatus(t){this._group.deleteGroup({squadId:t.data._id,status:t.action}).subscribe(a=>{t.action==this.API_EVENT.delete&&t.data.s_no>1&&t.data.s_no%this.limit==1&&1==this.tempList.length&&(this.pageNo=this.pageNo-1,this.tableRef.paginator.pageIndex=this.pageNo-1),this.getGroupListing(),this._toast.success(a.message)})}ngOnDestroy(){this.subscriptions.length>0&&this._common.unsubscribe(this.subscriptions)}}class l{}var u=e("pMnS"),p=e("NcP4"),g=e("t68o"),O=e("A8YC"),m=e("zbXB"),y=e("7nec"),f=e("d0kF"),k=e("A7ZX"),v=e("s6ns"),G=e("E2f4"),A=e("iInd"),_=e("dfTd"),B=e("++gc"),L=e("A1Tq"),w=e("IrvQ"),P=i.Cb({encapsulation:0,styles:[[""]],data:{}});function S(t){return i.ac(0,[i.Wb(402653184,1,{tableRef:0}),(t()(),i.Eb(1,0,null,null,1,"mat-table-renderer",[["cls","removeFilter"],["notFound","Groups not added"],["pageType","group"],["placeholder","Search by Group Name"]],null,[[null,"add"],[null,"find"],[null,"page"],[null,"status"],[null,"sort"]],(function(t,a,e){var i=!0,n=t.component;return"add"===a&&(i=!1!==n.addGroups(e)&&i),"find"===a&&(i=!1!==n.paginationWithSearch(e,0)&&i),"page"===a&&(i=!1!==n.paginationWithSearch(e,1)&&i),"status"===a&&(i=!1!==n.changeStatus(e)&&i),"sort"===a&&(i=!1!==n.sortByListing(e)&&i),i}),f.b,f.a)),i.Db(2,245760,[[1,4]],0,s.a,[k.a,v.e,G.a,A.a,_.a,B.a],{pageType:[0,"pageType"],cls:[1,"cls"],heading:[2,"heading"],notFound:[3,"notFound"],placeholder:[4,"placeholder"]},{page:"page",find:"find",sort:"sort",add:"add",status:"status"})],(function(t,a){var e=a.component;t(a,2,0,"group",i.Ib(1,"",e.permissionClass,""),e.heading,"Groups not added","Search by Group Name")}),null)}var N=i.Ab("lv-group-listing",h,(function(t){return i.ac(0,[(t()(),i.Eb(0,0,null,null,2,"lv-group-listing",[],null,null,null,S,P)),i.Vb(512,null,o.a,o.a,[L.a]),i.Db(2,245760,null,0,h,[w.a,A.o,_.a,k.a,o.a,B.a],null,null)],(function(t,a){t(a,2,0)}),null)}),{},{},[]),T=e("SVse"),E=e("s7LF"),I=e("POq0"),R=e("Xd0L"),j=e("QQfA"),C=e("IP0z"),F=e("JjoW"),q=e("Mz6y"),x=e("cUpR"),H=e("OIZN"),J=e("7kcP"),U=e("821u"),W=e("/HVE"),Z=e("gavF"),D=e("Gi4r"),M=e("HsOI"),V=e("oapL"),Y=e("ZwOa"),z=e("Fwaw"),Q=e("dHPm"),K=e("Z0D0"),X=e("zMNK"),$=e("hOhj"),tt=e("igqZ"),at=e("zQui"),et=e("8rEH"),it=e("5GAg"),nt=e("UqGY"),st=e("fjoK"),ot=e("A3va"),rt=e("TTF9"),dt=e("RGOs"),ct=e("tl6j"),bt=e("mkRZ"),ht=e("6d+p"),lt=e("oATp"),ut=e("Mwml"),pt=e("pBi1"),gt=e("AHvR"),Ot=e("phW1"),mt=e("UP7b"),yt=e("r0V8"),ft=e("ohvV");e.d(a,"GroupListingModuleNgFactory",(function(){return kt}));var kt=i.Bb(l,[],(function(t){return i.Nb([i.Ob(512,i.l,i.mb,[[8,[u.a,p.a,g.a,O.a,m.b,m.a,y.a,N]],[3,i.l],i.E]),i.Ob(4608,T.o,T.n,[i.A,[2,T.E]]),i.Ob(4608,E.B,E.B,[]),i.Ob(4608,I.c,I.c,[]),i.Ob(4608,R.d,R.d,[]),i.Ob(4608,E.f,E.f,[]),i.Ob(4608,j.d,j.d,[j.j,j.f,i.l,j.i,j.g,i.w,i.G,T.d,C.b,[2,T.i]]),i.Ob(5120,j.k,j.l,[j.d]),i.Ob(5120,F.a,F.b,[j.d]),i.Ob(5120,q.b,q.c,[j.d]),i.Ob(4608,x.e,R.e,[[2,R.i],[2,R.n]]),i.Ob(5120,H.c,H.a,[[3,H.c]]),i.Ob(5120,v.c,v.d,[j.d]),i.Ob(135680,v.e,v.e,[j.d,i.w,[2,T.i],[2,v.b],v.c,[3,v.e],j.f]),i.Ob(5120,J.d,J.a,[[3,J.d]]),i.Ob(4608,U.i,U.i,[]),i.Ob(5120,U.a,U.b,[j.d]),i.Ob(4608,R.c,R.x,[[2,R.h],W.a]),i.Ob(5120,Z.c,Z.j,[j.d]),i.Ob(4608,k.a,k.a,[]),i.Ob(1073742336,T.c,T.c,[]),i.Ob(1073742336,A.s,A.s,[[2,A.x],[2,A.o]]),i.Ob(1073742336,E.A,E.A,[]),i.Ob(1073742336,E.m,E.m,[]),i.Ob(1073742336,C.a,C.a,[]),i.Ob(1073742336,R.n,R.n,[[2,R.f],[2,x.f]]),i.Ob(1073742336,D.c,D.c,[]),i.Ob(1073742336,I.d,I.d,[]),i.Ob(1073742336,M.e,M.e,[]),i.Ob(1073742336,W.b,W.b,[]),i.Ob(1073742336,V.c,V.c,[]),i.Ob(1073742336,Y.c,Y.c,[]),i.Ob(1073742336,R.w,R.w,[]),i.Ob(1073742336,z.c,z.c,[]),i.Ob(1073742336,E.x,E.x,[]),i.Ob(1073742336,Q.a,Q.a,[]),i.Ob(1073742336,K.a,K.a,[]),i.Ob(1073742336,R.u,R.u,[]),i.Ob(1073742336,R.s,R.s,[]),i.Ob(1073742336,X.g,X.g,[]),i.Ob(1073742336,$.c,$.c,[]),i.Ob(1073742336,j.h,j.h,[]),i.Ob(1073742336,F.d,F.d,[]),i.Ob(1073742336,tt.e,tt.e,[]),i.Ob(1073742336,at.p,at.p,[]),i.Ob(1073742336,et.m,et.m,[]),i.Ob(1073742336,it.a,it.a,[]),i.Ob(1073742336,q.e,q.e,[]),i.Ob(1073742336,H.d,H.d,[]),i.Ob(1073742336,v.k,v.k,[]),i.Ob(1073742336,J.e,J.e,[]),i.Ob(1073742336,nt.a,nt.a,[]),i.Ob(1073742336,st.a,st.a,[]),i.Ob(1073742336,U.j,U.j,[]),i.Ob(1073742336,R.y,R.y,[]),i.Ob(1073742336,R.p,R.p,[]),i.Ob(1073742336,ot.a,ot.a,[]),i.Ob(1073742336,rt.a,rt.a,[]),i.Ob(1073742336,dt.a,dt.a,[]),i.Ob(1073742336,ct.a,ct.a,[]),i.Ob(1073742336,bt.e,bt.e,[]),i.Ob(1073742336,ht.a,ht.a,[]),i.Ob(1073742336,Z.i,Z.i,[]),i.Ob(1073742336,Z.f,Z.f,[]),i.Ob(1073742336,lt.a,lt.a,[]),i.Ob(1073742336,ut.a,ut.a,[]),i.Ob(1073742336,pt.d,pt.d,[]),i.Ob(1073742336,pt.c,pt.c,[]),i.Ob(1073742336,gt.a,gt.a,[]),i.Ob(1073742336,Ot.a,Ot.a,[]),i.Ob(1073742336,mt.a,mt.a,[]),i.Ob(1073742336,yt.d,yt.d,[]),i.Ob(1073742336,yt.c,yt.c,[]),i.Ob(1073742336,ft.a,ft.a,[]),i.Ob(1073742336,l,l,[]),i.Ob(256,R.g,R.k,[]),i.Ob(1024,A.m,(function(){return[[{path:"",component:h}]]}),[])])}))}}]);