(window.webpackJsonp=window.webpackJsonp||[]).push([[157],{VMzn:function(t,e,i){"use strict";i.r(e);var a=i("8Y7J");class s{}var n=i("pMnS"),l=i("d0kF"),h=i("xKpn"),b=i("A7ZX"),d=i("s6ns"),o=i("E2f4"),r=i("iInd"),c=i("dfTd"),p=i("++gc"),u=i("/Pe+"),O=i("A1Tq"),g=i("RliZ"),f=i("9JY2"),m=i("SqtC"),S=i("8uYd"),W=i("DWgq");class v extends f.a{constructor(t,e,i,a,s,n){super(),this._bc=t,this._router=e,this._table=i,this._spinWheel=a,this._common=s,this._toast=n,this.heading=[{heading:"Title",key:"title",align:"center"},{heading:"value",key:"value",align:"center"},{heading:"weight",key:"weight",align:"center"},{heading:"Status",key:"status",align:"center",type:"formatStatus"},{heading:"Action",key:"status",type:"action",action:[1,2,3]}],this.status=g.ec,this.categoryList=[],this.classCategoryList=[],this.subscriptions=[],this.tempList=[]}ngOnInit(){this._bc.setBreadcrumb(S.Yb),this.permissionHandler(),this.getSpinWheelList()}permissionHandler(){let t=this._common.getPermissionBySectionId(g.Yb.SPIN_WHEEL);Object(W.l)(t)||(t.addEdit||t.deleteBlock?(t.addEdit||(this.permissionClass="removeAddButton",this.heading[this.heading.length-1].action=this.removeAction([1])),t.deleteBlock||(this.heading[this.heading.length-1].action=this.removeAction([3]))):(this.permissionClass="removeAddButton",this.heading.splice(this.heading.length-1,1)))}removeAction(t){return this.heading[this.heading.length-1].action.filter(e=>!t.includes(e))}getSpinWheelList(){this.subscriptions.push(this._spinWheel.getSpinWheelList(this.validPageOptions).subscribe(t=>{this.tempList=t.data,t.data.forEach(t=>{t.description=t.description.en?t.description.en:t.description}),this._table.tableRender(t)},()=>{this._table.tableRender({data:[]})}))}addSpinWheel(t){this._router.navigate(0==t.id?[`${m.jb}/${m.c}`]:[`${m.jb}/${m.I}`,t.data._id])}paginationWithSearch(t,e){switch(e){case 0:this.resetPages(),this.search=t,this.tableRef.paginator&&this.tableRef.paginator.firstPage();break;default:this.pageOptionsOnChange=t}this.getSpinWheelList()}sortByListing(t){this.sortOptions=t,this.getSpinWheelList()}changeStatus(t){switch(t.id){case 1:this.addSpinWheel(t);break;default:this.changeSpinWheelStatus(t)}}changeSpinWheelStatus(t){this._spinWheel.deleteSpinWheel({spinnerWheelMetaId:t.data._id,status:t.action}).subscribe(e=>{t.action==this.API_EVENT.delete&&t.data.s_no>1&&t.data.s_no%this.limit==1&&1==this.tempList.length&&(this.pageNo=this.pageNo-1,this.tableRef.paginator.pageIndex=this.pageNo-1),this.getSpinWheelList(),this._toast.success(e.message)})}submitFilter(t){this.filterForm.dirty&&(t.apply?this.filterOptions=this.filterForm.value:(this.filterOptions=null,this.filterForm.reset()),this.resetPages(),this.tableRef.paginator&&this.tableRef.paginator.firstPage(),this.getSpinWheelList())}ngOnDestroy(){this.status.pop(),this.subscriptions.length>0&&this._common.unsubscribe(this.subscriptions)}}var w=i("IrvQ"),y=a.Cb({encapsulation:0,styles:[[""]],data:{}});function _(t){return a.ac(0,[a.Wb(402653184,1,{tableRef:0}),(t()(),a.Eb(1,0,null,null,2,"mat-table-renderer",[["notFound","SpinWheel not added"],["placeholder","Search by spin wheel title"]],null,[[null,"status"],[null,"add"],[null,"find"],[null,"page"],[null,"sort"],[null,"filter"]],(function(t,e,i){var a=!0,s=t.component;return"status"===e&&(a=!1!==s.changeStatus(i)&&a),"add"===e&&(a=!1!==s.addSpinWheel(i)&&a),"find"===e&&(a=!1!==s.paginationWithSearch(i,0)&&a),"page"===e&&(a=!1!==s.paginationWithSearch(i,1)&&a),"sort"===e&&(a=!1!==s.sortByListing(i)&&a),"filter"===e&&(a=!1!==s.submitFilter(i)&&a),a}),l.b,l.a)),a.Db(2,245760,[[1,4]],0,h.a,[b.a,d.e,o.a,r.a,c.a,p.a],{cls:[0,"cls"],heading:[1,"heading"],notFound:[2,"notFound"],placeholder:[3,"placeholder"]},{page:"page",find:"find",sort:"sort",add:"add",status:"status",filter:"filter"}),(t()(),a.Eb(3,0,null,1,0,"div",[["role","filter"]],null,null,null,null,null))],(function(t,e){var i=e.component;t(e,2,0,a.Ib(1,"",i.permissionClass," removeFilter"),i.heading,"SpinWheel not added","Search by spin wheel title")}),null)}function A(t){return a.ac(0,[(t()(),a.Eb(0,0,null,null,2,"lv-spin-wheels-list",[],null,null,null,_,y)),a.Vb(512,null,u.a,u.a,[O.a]),a.Db(2,245760,null,0,v,[w.a,r.o,b.a,u.a,p.a,c.a],null,null)],(function(t,e){t(e,2,0)}),null)}var L=a.Ab("lv-spin-wheels-list",v,A,{},{},[]),k=i("NcP4"),E=i("t68o"),F=i("A8YC"),P=i("zbXB"),B=i("7nec"),I=i("SVse"),R=i("s7LF"),j=i("POq0"),N=i("Xd0L"),C=i("QQfA"),H=i("IP0z"),x=i("JjoW"),M=i("Mz6y"),T=i("cUpR"),V=i("OIZN"),Y=i("7kcP"),Z=i("821u"),q=i("/HVE"),z=i("gavF");class D{}var G=i("Gi4r"),J=i("HsOI"),Q=i("oapL"),$=i("ZwOa"),K=i("Fwaw"),U=i("dHPm"),X=i("Z0D0"),tt=i("zMNK"),et=i("hOhj"),it=i("igqZ"),at=i("zQui"),st=i("8rEH"),nt=i("5GAg"),lt=i("UqGY"),ht=i("fjoK"),bt=i("A3va"),dt=i("TTF9"),ot=i("RGOs"),rt=i("tl6j"),ct=i("mkRZ"),pt=i("6d+p"),ut=i("oATp"),Ot=i("Mwml"),gt=i("pBi1"),ft=i("AHvR"),mt=i("phW1"),St=i("UP7b"),Wt=i("r0V8"),vt=i("ohvV");i.d(e,"SpinWheelsListModuleNgFactory",(function(){return wt}));var wt=a.Bb(s,[],(function(t){return a.Nb([a.Ob(512,a.l,a.mb,[[8,[n.a,L,k.a,E.a,F.a,P.b,P.a,B.a]],[3,a.l],a.E]),a.Ob(4608,I.o,I.n,[a.A,[2,I.E]]),a.Ob(4608,R.B,R.B,[]),a.Ob(4608,j.c,j.c,[]),a.Ob(4608,N.d,N.d,[]),a.Ob(4608,R.f,R.f,[]),a.Ob(4608,C.d,C.d,[C.j,C.f,a.l,C.i,C.g,a.w,a.G,I.d,H.b,[2,I.i]]),a.Ob(5120,C.k,C.l,[C.d]),a.Ob(5120,x.a,x.b,[C.d]),a.Ob(5120,M.b,M.c,[C.d]),a.Ob(4608,T.e,N.e,[[2,N.i],[2,N.n]]),a.Ob(5120,V.c,V.a,[[3,V.c]]),a.Ob(5120,d.c,d.d,[C.d]),a.Ob(135680,d.e,d.e,[C.d,a.w,[2,I.i],[2,d.b],d.c,[3,d.e],C.f]),a.Ob(5120,Y.d,Y.a,[[3,Y.d]]),a.Ob(4608,Z.i,Z.i,[]),a.Ob(5120,Z.a,Z.b,[C.d]),a.Ob(4608,N.c,N.x,[[2,N.h],q.a]),a.Ob(5120,z.c,z.j,[C.d]),a.Ob(4608,b.a,b.a,[]),a.Ob(1073742336,I.c,I.c,[]),a.Ob(1073742336,r.s,r.s,[[2,r.x],[2,r.o]]),a.Ob(1073742336,D,D,[]),a.Ob(1073742336,R.A,R.A,[]),a.Ob(1073742336,R.m,R.m,[]),a.Ob(1073742336,H.a,H.a,[]),a.Ob(1073742336,N.n,N.n,[[2,N.f],[2,T.f]]),a.Ob(1073742336,G.c,G.c,[]),a.Ob(1073742336,j.d,j.d,[]),a.Ob(1073742336,J.e,J.e,[]),a.Ob(1073742336,q.b,q.b,[]),a.Ob(1073742336,Q.c,Q.c,[]),a.Ob(1073742336,$.c,$.c,[]),a.Ob(1073742336,N.w,N.w,[]),a.Ob(1073742336,K.c,K.c,[]),a.Ob(1073742336,R.x,R.x,[]),a.Ob(1073742336,U.a,U.a,[]),a.Ob(1073742336,X.a,X.a,[]),a.Ob(1073742336,N.u,N.u,[]),a.Ob(1073742336,N.s,N.s,[]),a.Ob(1073742336,tt.g,tt.g,[]),a.Ob(1073742336,et.c,et.c,[]),a.Ob(1073742336,C.h,C.h,[]),a.Ob(1073742336,x.d,x.d,[]),a.Ob(1073742336,it.e,it.e,[]),a.Ob(1073742336,at.p,at.p,[]),a.Ob(1073742336,st.m,st.m,[]),a.Ob(1073742336,nt.a,nt.a,[]),a.Ob(1073742336,M.e,M.e,[]),a.Ob(1073742336,V.d,V.d,[]),a.Ob(1073742336,d.k,d.k,[]),a.Ob(1073742336,Y.e,Y.e,[]),a.Ob(1073742336,lt.a,lt.a,[]),a.Ob(1073742336,ht.a,ht.a,[]),a.Ob(1073742336,Z.j,Z.j,[]),a.Ob(1073742336,N.y,N.y,[]),a.Ob(1073742336,N.p,N.p,[]),a.Ob(1073742336,bt.a,bt.a,[]),a.Ob(1073742336,dt.a,dt.a,[]),a.Ob(1073742336,ot.a,ot.a,[]),a.Ob(1073742336,rt.a,rt.a,[]),a.Ob(1073742336,ct.e,ct.e,[]),a.Ob(1073742336,pt.a,pt.a,[]),a.Ob(1073742336,z.i,z.i,[]),a.Ob(1073742336,z.f,z.f,[]),a.Ob(1073742336,ut.a,ut.a,[]),a.Ob(1073742336,Ot.a,Ot.a,[]),a.Ob(1073742336,gt.d,gt.d,[]),a.Ob(1073742336,gt.c,gt.c,[]),a.Ob(1073742336,ft.a,ft.a,[]),a.Ob(1073742336,mt.a,mt.a,[]),a.Ob(1073742336,St.a,St.a,[]),a.Ob(1073742336,Wt.d,Wt.d,[]),a.Ob(1073742336,Wt.c,Wt.c,[]),a.Ob(1073742336,vt.a,vt.a,[]),a.Ob(1073742336,s,s,[]),a.Ob(1024,r.m,(function(){return[[{path:"",component:v}]]}),[]),a.Ob(256,N.g,N.k,[])])}))}}]);