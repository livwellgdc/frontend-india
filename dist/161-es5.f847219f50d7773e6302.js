(window.webpackJsonp=window.webpackJsonp||[]).push([[161],{VMzn:function(t,e,i){"use strict";i.r(e);var a=i("8Y7J");class s{}var n=i("pMnS"),l=i("d0kF"),h=i("xKpn"),b=i("A7ZX"),d=i("s6ns"),o=i("E2f4"),c=i("iInd"),r=i("dfTd"),p=i("++gc"),u=i("/Pe+"),O=i("A1Tq"),g=i("RliZ"),f=i("9JY2"),m=i("SqtC"),S=i("8uYd"),W=i("DWgq");class v extends f.a{constructor(t,e,i,a,s,n){super(),this._bc=t,this._router=e,this._table=i,this._spinWheel=a,this._common=s,this._toast=n,this.heading=[{heading:"Title",key:"title",align:"center"},{heading:"value",key:"value",align:"center"},{heading:"weight",key:"weight",align:"center"},{heading:"Status",key:"status",align:"center",type:"formatStatus"},{heading:"Action",key:"status",type:"action",action:[1,2,3]}],this.status=g.fc,this.categoryList=[],this.classCategoryList=[],this.subscriptions=[],this.tempList=[]}ngOnInit(){this._bc.setBreadcrumb(S.cc),this.permissionHandler(),this.getSpinWheelList()}permissionHandler(){let t=this._common.getPermissionBySectionId(g.Zb.SPIN_WHEEL);Object(W.l)(t)||(t.addEdit||t.deleteBlock?(t.addEdit||(this.permissionClass="removeAddButton",this.heading[this.heading.length-1].action=this.removeAction([1])),t.deleteBlock||(this.heading[this.heading.length-1].action=this.removeAction([3]))):(this.permissionClass="removeAddButton",this.heading.splice(this.heading.length-1,1)))}removeAction(t){return this.heading[this.heading.length-1].action.filter(e=>!t.includes(e))}getSpinWheelList(){this.subscriptions.push(this._spinWheel.getSpinWheelList(this.validPageOptions).subscribe(t=>{this.tempList=t.data,t.data.forEach(t=>{t.description=t.description.en?t.description.en:t.description}),this._table.tableRender(t)},()=>{this._table.tableRender({data:[]})}))}addSpinWheel(t){this._router.navigate(0==t.id?["".concat(m.kb,"/").concat(m.c)]:["".concat(m.kb,"/").concat(m.I),t.data._id])}paginationWithSearch(t,e){switch(e){case 0:this.resetPages(),this.search=t,this.tableRef.paginator&&this.tableRef.paginator.firstPage();break;default:this.pageOptionsOnChange=t}this.getSpinWheelList()}sortByListing(t){this.sortOptions=t,this.getSpinWheelList()}changeStatus(t){switch(t.id){case 1:this.addSpinWheel(t);break;default:this.changeSpinWheelStatus(t)}}changeSpinWheelStatus(t){this._spinWheel.deleteSpinWheel({spinnerWheelMetaId:t.data._id,status:t.action}).subscribe(e=>{t.action==this.API_EVENT.delete&&t.data.s_no>1&&t.data.s_no%this.limit==1&&1==this.tempList.length&&(this.pageNo=this.pageNo-1,this.tableRef.paginator.pageIndex=this.pageNo-1),this.getSpinWheelList(),this._toast.success(e.message)})}submitFilter(t){this.filterForm.dirty&&(t.apply?this.filterOptions=this.filterForm.value:(this.filterOptions=null,this.filterForm.reset()),this.resetPages(),this.tableRef.paginator&&this.tableRef.paginator.firstPage(),this.getSpinWheelList())}ngOnDestroy(){this.status.pop(),this.subscriptions.length>0&&this._common.unsubscribe(this.subscriptions)}}var w=i("IrvQ"),y=a.Cb({encapsulation:0,styles:[[""]],data:{}});function _(t){return a.ac(0,[a.Wb(402653184,1,{tableRef:0}),(t()(),a.Eb(1,0,null,null,2,"mat-table-renderer",[["notFound","SpinWheel not added"],["placeholder","Search by spin wheel title"]],null,[[null,"status"],[null,"add"],[null,"find"],[null,"page"],[null,"sort"],[null,"filter"]],(function(t,e,i){var a=!0,s=t.component;return"status"===e&&(a=!1!==s.changeStatus(i)&&a),"add"===e&&(a=!1!==s.addSpinWheel(i)&&a),"find"===e&&(a=!1!==s.paginationWithSearch(i,0)&&a),"page"===e&&(a=!1!==s.paginationWithSearch(i,1)&&a),"sort"===e&&(a=!1!==s.sortByListing(i)&&a),"filter"===e&&(a=!1!==s.submitFilter(i)&&a),a}),l.b,l.a)),a.Db(2,245760,[[1,4]],0,h.a,[b.a,d.e,o.a,c.a,r.a,p.a],{cls:[0,"cls"],heading:[1,"heading"],notFound:[2,"notFound"],placeholder:[3,"placeholder"]},{page:"page",find:"find",sort:"sort",add:"add",status:"status",filter:"filter"}),(t()(),a.Eb(3,0,null,1,0,"div",[["role","filter"]],null,null,null,null,null))],(function(t,e){var i=e.component;t(e,2,0,a.Ib(1,"",i.permissionClass," removeFilter"),i.heading,"SpinWheel not added","Search by spin wheel title")}),null)}var k=a.Ab("lv-spin-wheels-list",v,(function(t){return a.ac(0,[(t()(),a.Eb(0,0,null,null,2,"lv-spin-wheels-list",[],null,null,null,_,y)),a.Vb(512,null,u.a,u.a,[O.a]),a.Db(2,245760,null,0,v,[w.a,c.o,b.a,u.a,p.a,r.a],null,null)],(function(t,e){t(e,2,0)}),null)}),{},{},[]),A=i("NcP4"),L=i("t68o"),E=i("A8YC"),F=i("zbXB"),P=i("7nec"),B=i("SVse"),I=i("s7LF"),R=i("POq0"),N=i("Xd0L"),j=i("QQfA"),C=i("IP0z"),H=i("JjoW"),Z=i("Mz6y"),x=i("cUpR"),M=i("OIZN"),T=i("7kcP"),V=i("821u"),q=i("/HVE"),z=i("gavF");class D{}var G=i("Gi4r"),J=i("HsOI"),Y=i("oapL"),Q=i("ZwOa"),K=i("Fwaw"),U=i("dHPm"),X=i("Z0D0"),$=i("zMNK"),tt=i("hOhj"),et=i("igqZ"),it=i("zQui"),at=i("8rEH"),st=i("5GAg"),nt=i("UqGY"),lt=i("fjoK"),ht=i("A3va"),bt=i("TTF9"),dt=i("RGOs"),ot=i("tl6j"),ct=i("mkRZ"),rt=i("6d+p"),pt=i("oATp"),ut=i("Mwml"),Ot=i("pBi1"),gt=i("AHvR"),ft=i("phW1"),mt=i("UP7b"),St=i("r0V8"),Wt=i("ohvV");i.d(e,"SpinWheelsListModuleNgFactory",(function(){return vt}));var vt=a.Bb(s,[],(function(t){return a.Nb([a.Ob(512,a.l,a.mb,[[8,[n.a,k,A.a,L.a,E.a,F.b,F.a,P.a]],[3,a.l],a.E]),a.Ob(4608,B.o,B.n,[a.A,[2,B.E]]),a.Ob(4608,I.B,I.B,[]),a.Ob(4608,R.c,R.c,[]),a.Ob(4608,N.d,N.d,[]),a.Ob(4608,I.f,I.f,[]),a.Ob(4608,j.d,j.d,[j.j,j.f,a.l,j.i,j.g,a.w,a.G,B.d,C.b,[2,B.i]]),a.Ob(5120,j.k,j.l,[j.d]),a.Ob(5120,H.a,H.b,[j.d]),a.Ob(5120,Z.b,Z.c,[j.d]),a.Ob(4608,x.e,N.e,[[2,N.i],[2,N.n]]),a.Ob(5120,M.c,M.a,[[3,M.c]]),a.Ob(5120,d.c,d.d,[j.d]),a.Ob(135680,d.e,d.e,[j.d,a.w,[2,B.i],[2,d.b],d.c,[3,d.e],j.f]),a.Ob(5120,T.d,T.a,[[3,T.d]]),a.Ob(4608,V.i,V.i,[]),a.Ob(5120,V.a,V.b,[j.d]),a.Ob(4608,N.c,N.x,[[2,N.h],q.a]),a.Ob(5120,z.c,z.j,[j.d]),a.Ob(4608,b.a,b.a,[]),a.Ob(1073742336,B.c,B.c,[]),a.Ob(1073742336,c.s,c.s,[[2,c.x],[2,c.o]]),a.Ob(1073742336,D,D,[]),a.Ob(1073742336,I.A,I.A,[]),a.Ob(1073742336,I.m,I.m,[]),a.Ob(1073742336,C.a,C.a,[]),a.Ob(1073742336,N.n,N.n,[[2,N.f],[2,x.f]]),a.Ob(1073742336,G.c,G.c,[]),a.Ob(1073742336,R.d,R.d,[]),a.Ob(1073742336,J.e,J.e,[]),a.Ob(1073742336,q.b,q.b,[]),a.Ob(1073742336,Y.c,Y.c,[]),a.Ob(1073742336,Q.c,Q.c,[]),a.Ob(1073742336,N.w,N.w,[]),a.Ob(1073742336,K.c,K.c,[]),a.Ob(1073742336,I.x,I.x,[]),a.Ob(1073742336,U.a,U.a,[]),a.Ob(1073742336,X.a,X.a,[]),a.Ob(1073742336,N.u,N.u,[]),a.Ob(1073742336,N.s,N.s,[]),a.Ob(1073742336,$.g,$.g,[]),a.Ob(1073742336,tt.c,tt.c,[]),a.Ob(1073742336,j.h,j.h,[]),a.Ob(1073742336,H.d,H.d,[]),a.Ob(1073742336,et.e,et.e,[]),a.Ob(1073742336,it.p,it.p,[]),a.Ob(1073742336,at.m,at.m,[]),a.Ob(1073742336,st.a,st.a,[]),a.Ob(1073742336,Z.e,Z.e,[]),a.Ob(1073742336,M.d,M.d,[]),a.Ob(1073742336,d.k,d.k,[]),a.Ob(1073742336,T.e,T.e,[]),a.Ob(1073742336,nt.a,nt.a,[]),a.Ob(1073742336,lt.a,lt.a,[]),a.Ob(1073742336,V.j,V.j,[]),a.Ob(1073742336,N.y,N.y,[]),a.Ob(1073742336,N.p,N.p,[]),a.Ob(1073742336,ht.a,ht.a,[]),a.Ob(1073742336,bt.a,bt.a,[]),a.Ob(1073742336,dt.a,dt.a,[]),a.Ob(1073742336,ot.a,ot.a,[]),a.Ob(1073742336,ct.e,ct.e,[]),a.Ob(1073742336,rt.a,rt.a,[]),a.Ob(1073742336,z.i,z.i,[]),a.Ob(1073742336,z.f,z.f,[]),a.Ob(1073742336,pt.a,pt.a,[]),a.Ob(1073742336,ut.a,ut.a,[]),a.Ob(1073742336,Ot.d,Ot.d,[]),a.Ob(1073742336,Ot.c,Ot.c,[]),a.Ob(1073742336,gt.a,gt.a,[]),a.Ob(1073742336,ft.a,ft.a,[]),a.Ob(1073742336,mt.a,mt.a,[]),a.Ob(1073742336,St.d,St.d,[]),a.Ob(1073742336,St.c,St.c,[]),a.Ob(1073742336,Wt.a,Wt.a,[]),a.Ob(1073742336,s,s,[]),a.Ob(1024,c.m,(function(){return[[{path:"",component:v}]]}),[]),a.Ob(256,N.g,N.k,[])])}))}}]);