(window.webpackJsonp=window.webpackJsonp||[]).push([[109],{OE6O:function(t,a,i){"use strict";i.r(a);var e=i("8Y7J"),s=i("xKpn"),n=i("8uYd"),l=i("DWgq"),h=i("RliZ"),r=i("9JY2"),b=i("SqtC"),o=i("ygWr");class c extends r.a{constructor(t,a,i,e,s,n,l){super(),this._bc=t,this._fb=a,this._router=i,this._table=e,this._charity=s,this._common=n,this._toast=l,this.heading=[{heading:"Logo",key:"logo",type:"img",align:"center"},{heading:"Name",key:"name",align:"center",content:!0,type:"link",link:"/".concat(b.x)},{heading:"Email",key:"email",align:"center"},{heading:"Mobile",key:"mobileNo",align:"center"},{heading:"Status",key:"status",align:"center"},{heading:"Action",key:"action",type:"action",action:[1,3]}],this.categoryList=[],this.classCategoryList=[],this.subscriptions=[],this.tempList=[]}ngOnInit(){this._bc.setBreadcrumb(n.E),this.permissionHandler(),this.getCharityListing()}permissionHandler(){let t=this._common.getPermissionBySectionId(h.Yb.CHARITY);Object(l.l)(t)||(t.addEdit||t.deleteBlock?(t.addEdit||(this.permissionClass="removeAddButton",this.heading[this.heading.length-1].action=this.removeAction([1])),t.deleteBlock||(this.heading[this.heading.length-1].action=this.removeAction([3]))):(this.permissionClass="removeAddButton",this.heading.splice(this.heading.length-1,1)))}removeAction(t){return this.heading[this.heading.length-1].action.filter(a=>!t.includes(a))}getCharityListing(){this.subscriptions.push(this._charity.getCharityList(this.validPageOptions).subscribe(t=>{this.tempList=t.data,this._table.tableRender(t)},()=>{this._table.tableRender({data:[]})}))}getCategories(t){this.subscriptions.push(this._common.getCategories({pageNo:1,limit:100,categoryType:t,status:this.API_EVENT.active}).subscribe(a=>{200===a.statusCode&&(t===this.API_EVENT.challenge?this.categoryList=a.data:this.classCategoryList=a.data)}))}addCharity(t){this._router.navigate(0==t.id?["".concat(b.x,"/").concat(b.c)]:["".concat(b.x,"/").concat(b.I),t.data._id])}paginationWithSearch(t,a){switch(a){case 0:this.resetPages(),this.search=t,this.tableRef.paginator&&this.tableRef.paginator.firstPage();break;default:this.pageOptionsOnChange=t}this.getCharityListing()}sortByListing(t){this.sortOptions=t,this.getCharityListing()}changeStatus(t){switch(t.id){case 1:this.addCharity(t);break;default:this.changeCharityStatus(t)}}changeCharityStatus(t){this._charity.deleteCharity({charityId:t.data._id,status:t.action}).subscribe(a=>{t.action==this.API_EVENT.delete&&t.data.s_no>1&&t.data.s_no%this.limit==1&&1==this.tempList.length&&(this.pageNo=this.pageNo-1,this.tableRef.paginator.pageIndex=this.pageNo-1),this.getCharityListing(),this._toast.success(a.message)})}submitFilter(t){this.filterForm.dirty&&(t.apply?this.filterOptions=this.filterForm.value:(this.filterOptions=null,this.filterForm.reset()),this.resetPages(),this.tableRef.paginator&&this.tableRef.paginator.firstPage(),this.getCharityListing())}ngOnDestroy(){this.subscriptions.length>0&&this._common.unsubscribe(this.subscriptions)}}class d{}var g=i("pMnS"),u=i("NcP4"),O=i("t68o"),p=i("A8YC"),m=i("zbXB"),y=i("7nec"),f=i("d0kF"),C=i("A7ZX"),v=i("s6ns"),_=i("E2f4"),A=i("iInd"),k=i("dfTd"),L=i("++gc"),E=i("A1Tq"),w=i("IrvQ"),N=i("s7LF"),F=e.Cb({encapsulation:0,styles:[[""]],data:{}});function I(t){return e.ac(0,[e.Wb(402653184,1,{tableRef:0}),(t()(),e.Eb(1,0,null,null,2,"mat-table-renderer",[["notFound","Challenges not added"],["placeholder","Search by Name"]],null,[[null,"status"],[null,"add"],[null,"find"],[null,"page"],[null,"sort"],[null,"filter"]],(function(t,a,i){var e=!0,s=t.component;return"status"===a&&(e=!1!==s.changeStatus(i)&&e),"add"===a&&(e=!1!==s.addCharity(i)&&e),"find"===a&&(e=!1!==s.paginationWithSearch(i,0)&&e),"page"===a&&(e=!1!==s.paginationWithSearch(i,1)&&e),"sort"===a&&(e=!1!==s.sortByListing(i)&&e),"filter"===a&&(e=!1!==s.submitFilter(i)&&e),e}),f.b,f.a)),e.Db(2,245760,[[1,4]],0,s.a,[C.a,v.e,_.a,A.a,k.a,L.a],{cls:[0,"cls"],heading:[1,"heading"],notFound:[2,"notFound"],placeholder:[3,"placeholder"]},{page:"page",find:"find",sort:"sort",add:"add",status:"status",filter:"filter"}),(t()(),e.Eb(3,0,null,1,0,"div",[["role","filter"]],null,null,null,null,null))],(function(t,a){var i=a.component;t(a,2,0,e.Ib(1,"",i.permissionClass," removeFilter"),i.heading,"Challenges not added","Search by Name")}),null)}var P=e.Ab("lv-charity-list",c,(function(t){return e.ac(0,[(t()(),e.Eb(0,0,null,null,2,"lv-charity-list",[],null,null,null,I,F)),e.Vb(512,null,o.a,o.a,[E.a]),e.Db(2,245760,null,0,c,[w.a,N.f,A.o,C.a,o.a,L.a,k.a],null,null)],(function(t,a){t(a,2,0)}),null)}),{},{},[]),R=i("SVse"),S=i("POq0"),B=i("Xd0L"),x=i("QQfA"),T=i("IP0z"),j=i("JjoW"),H=i("Mz6y"),V=i("cUpR"),W=i("OIZN"),Y=i("7kcP"),Z=i("821u"),q=i("/HVE"),M=i("gavF"),z=i("Gi4r"),D=i("HsOI"),G=i("oapL"),J=i("ZwOa"),Q=i("Fwaw"),K=i("dHPm"),U=i("Z0D0"),X=i("zMNK"),$=i("hOhj"),tt=i("igqZ"),at=i("zQui"),it=i("8rEH"),et=i("5GAg"),st=i("UqGY"),nt=i("fjoK"),lt=i("A3va"),ht=i("TTF9"),rt=i("RGOs"),bt=i("tl6j"),ot=i("mkRZ"),ct=i("6d+p"),dt=i("oATp"),gt=i("Mwml"),ut=i("pBi1"),Ot=i("AHvR"),pt=i("phW1"),mt=i("UP7b"),yt=i("r0V8"),ft=i("ohvV");i.d(a,"CharityListModuleNgFactory",(function(){return Ct}));var Ct=e.Bb(d,[],(function(t){return e.Nb([e.Ob(512,e.l,e.mb,[[8,[g.a,u.a,O.a,p.a,m.b,m.a,y.a,P]],[3,e.l],e.E]),e.Ob(4608,R.o,R.n,[e.A,[2,R.E]]),e.Ob(4608,N.B,N.B,[]),e.Ob(4608,S.c,S.c,[]),e.Ob(4608,B.d,B.d,[]),e.Ob(4608,N.f,N.f,[]),e.Ob(4608,x.d,x.d,[x.j,x.f,e.l,x.i,x.g,e.w,e.G,R.d,T.b,[2,R.i]]),e.Ob(5120,x.k,x.l,[x.d]),e.Ob(5120,j.a,j.b,[x.d]),e.Ob(5120,H.b,H.c,[x.d]),e.Ob(4608,V.e,B.e,[[2,B.i],[2,B.n]]),e.Ob(5120,W.c,W.a,[[3,W.c]]),e.Ob(5120,v.c,v.d,[x.d]),e.Ob(135680,v.e,v.e,[x.d,e.w,[2,R.i],[2,v.b],v.c,[3,v.e],x.f]),e.Ob(5120,Y.d,Y.a,[[3,Y.d]]),e.Ob(4608,Z.i,Z.i,[]),e.Ob(5120,Z.a,Z.b,[x.d]),e.Ob(4608,B.c,B.x,[[2,B.h],q.a]),e.Ob(5120,M.c,M.j,[x.d]),e.Ob(4608,C.a,C.a,[]),e.Ob(1073742336,R.c,R.c,[]),e.Ob(1073742336,A.s,A.s,[[2,A.x],[2,A.o]]),e.Ob(1073742336,N.A,N.A,[]),e.Ob(1073742336,N.m,N.m,[]),e.Ob(1073742336,T.a,T.a,[]),e.Ob(1073742336,B.n,B.n,[[2,B.f],[2,V.f]]),e.Ob(1073742336,z.c,z.c,[]),e.Ob(1073742336,S.d,S.d,[]),e.Ob(1073742336,D.e,D.e,[]),e.Ob(1073742336,q.b,q.b,[]),e.Ob(1073742336,G.c,G.c,[]),e.Ob(1073742336,J.c,J.c,[]),e.Ob(1073742336,B.w,B.w,[]),e.Ob(1073742336,Q.c,Q.c,[]),e.Ob(1073742336,N.x,N.x,[]),e.Ob(1073742336,K.a,K.a,[]),e.Ob(1073742336,U.a,U.a,[]),e.Ob(1073742336,B.u,B.u,[]),e.Ob(1073742336,B.s,B.s,[]),e.Ob(1073742336,X.g,X.g,[]),e.Ob(1073742336,$.c,$.c,[]),e.Ob(1073742336,x.h,x.h,[]),e.Ob(1073742336,j.d,j.d,[]),e.Ob(1073742336,tt.e,tt.e,[]),e.Ob(1073742336,at.p,at.p,[]),e.Ob(1073742336,it.m,it.m,[]),e.Ob(1073742336,et.a,et.a,[]),e.Ob(1073742336,H.e,H.e,[]),e.Ob(1073742336,W.d,W.d,[]),e.Ob(1073742336,v.k,v.k,[]),e.Ob(1073742336,Y.e,Y.e,[]),e.Ob(1073742336,st.a,st.a,[]),e.Ob(1073742336,nt.a,nt.a,[]),e.Ob(1073742336,Z.j,Z.j,[]),e.Ob(1073742336,B.y,B.y,[]),e.Ob(1073742336,B.p,B.p,[]),e.Ob(1073742336,lt.a,lt.a,[]),e.Ob(1073742336,ht.a,ht.a,[]),e.Ob(1073742336,rt.a,rt.a,[]),e.Ob(1073742336,bt.a,bt.a,[]),e.Ob(1073742336,ot.e,ot.e,[]),e.Ob(1073742336,ct.a,ct.a,[]),e.Ob(1073742336,M.i,M.i,[]),e.Ob(1073742336,M.f,M.f,[]),e.Ob(1073742336,dt.a,dt.a,[]),e.Ob(1073742336,gt.a,gt.a,[]),e.Ob(1073742336,ut.d,ut.d,[]),e.Ob(1073742336,ut.c,ut.c,[]),e.Ob(1073742336,Ot.a,Ot.a,[]),e.Ob(1073742336,pt.a,pt.a,[]),e.Ob(1073742336,mt.a,mt.a,[]),e.Ob(1073742336,yt.d,yt.d,[]),e.Ob(1073742336,yt.c,yt.c,[]),e.Ob(1073742336,ft.a,ft.a,[]),e.Ob(1073742336,d,d,[]),e.Ob(256,B.g,B.k,[]),e.Ob(1024,A.m,(function(){return[[{path:"",component:c}]]}),[])])}))}}]);