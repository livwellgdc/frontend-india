(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{YSaj:function(l,n,e){"use strict";e.r(n);var a=e("8Y7J"),t=e("RliZ"),i=e("9JY2"),u=e("SqtC"),o=e("vHUI"),r=e("8uYd"),d=e("DWgq"),s=e("hoJe"),b=e("xKpn");class c extends i.a{constructor(l,n,e,a,i,o,r){super(),this._bc=l,this._fb=n,this._router=e,this._toast=a,this._table=i,this._challenge=o,this._common=r,this.heading=[{heading:"Image",key:"image",type:"img",align:"center"},{heading:"Challenge Name",key:"name",content:!0,sort:!0,type:"link",link:`/${u.v}`},{heading:"Challenge Category",key:"categoryName"},{heading:"Start Date",key:"startDate",align:"center",type:"date",sort:!0},{heading:"End Date",key:"endDate",align:"center",type:"date"},{heading:"Start Time",key:"startDate",align:"center",type:"time"},{heading:"End Time",key:"endDate",align:"center",type:"time"},{heading:"Total Participants",key:"totalParticipant",align:"center"},{heading:"Status",key:"status",align:"center",type:"formatStatus"},{heading:"Action",key:"status",type:"action",action:[1,2,5]}],this.status=t.ec,this.categoryList=[],this.classCategoryList=[],this.subscriptions=[]}ngOnInit(){this._bc.setBreadcrumb(r.z),this.permissionHandler(),this.createForm(),this.status.push({name:"Expired",value:"EXPIRED"}),this.getChallengeListing(),this.getCategories(this.API_EVENT.challenge),this.getCategories(this.API_EVENT.class)}createForm(){this.filterForm=this._fb.group({categoryId:[""],classCategoryId:[""],status:[""]})}permissionHandler(){let l=this._common.getPermissionBySectionId(t.Yb.CHALLENGES);Object(d.l)(l)||(l.addEdit||l.deleteBlock?(l.addEdit||(this.permissionClass="removeAddButton",this.heading[this.heading.length-1].action=this.removeAction([1,5])),l.deleteBlock||(this.heading[this.heading.length-1].action=this.removeAction([2]))):(this.permissionClass="removeAddButton",this.heading.splice(this.heading.length-1,1)))}removeAction(l){return this.heading[this.heading.length-1].action.filter(n=>!l.includes(n))}getChallengeListing(){this.subscriptions.push(this._challenge.getChallengeList(this.validPageOptions).subscribe(l=>{l.data.forEach(l=>{l.status=l.categoryId.type==t.t.SERIES?"-":l.status,l.name=Object(d.r)(l.name.en),l.sponsorName=Object(d.r)(l.sponsorName),l.categoryName=Object(d.r)(l.categoryId.name.en)}),this._table.tableRender(l)},()=>{this._table.tableRender({data:[]})}))}getCategories(l){this.subscriptions.push(this._common.getCategories({pageNo:1,limit:100,categoryType:l,status:this.API_EVENT.active}).subscribe(n=>{200===n.statusCode&&(l===this.API_EVENT.challenge?this.categoryList=n.data:this.classCategoryList=n.data)}))}addChallenges(l){this._router.navigate(0==l.id?[`${u.v}/${u.c}`]:[`${u.v}/${u.I}`,l.data._id])}paginationWithSearch(l,n){switch(n){case 0:this.resetPages(),this.search=l,this.tableRef.paginator&&this.tableRef.paginator.firstPage();break;default:this.pageOptionsOnChange=l}this.getChallengeListing()}sortByListing(l){this.sortOptions=l,this.getChallengeListing()}changeStatus(l){switch(l.id){case 1:this.addChallenges(l);break;case 5:this.copyChallenge(l.data);break;default:this.changeCategoryStatus(l)}}copyChallenge(l){this._router.navigate([`${u.v}/${u.c}`],{queryParams:{copyChallenge:l._id}})}changeCategoryStatus(l){this._challenge.blockUnblockDeleteChallenge({challengeId:l.data._id,status:l.action}).subscribe(l=>{this.getChallengeListing(),this._toast.success(l.message)})}submitFilter(l){this.filterForm.dirty&&(l.apply?this.filterOptions=this.filterForm.value:(this.filterOptions=null,this.filterForm.reset()),this.resetPages(),this.tableRef.paginator&&this.tableRef.paginator.firstPage(),this.getChallengeListing())}downloadList(l){let n=[];this.filterOptions&&(this.filterOptions.status&&n.push({key:"status",value:this.filterOptions.status}),this.filterOptions.classCategoryId&&n.push({key:"classCategoryId",value:this.filterOptions.classCategoryId}),this.filterOptions.categoryId&&n.push({key:"categoryId",value:this.filterOptions.categoryId})),this.search&&n.push({key:"searchKey",value:this.search}),this._common.exportReports(s.y,n)}ngOnDestroy(){this.status.pop(),this.subscriptions.length>0&&this._common.unsubscribe(this.subscriptions)}}class g{}var h=e("pMnS"),m=e("NcP4"),p=e("t68o"),f=e("A8YC"),Q=e("zbXB"),_=e("7nec"),y=e("MlvX"),C=e("Xd0L"),O=e("SVse"),v=e("d0kF"),w=e("A7ZX"),S=e("s6ns"),k=e("E2f4"),F=e("iInd"),I=e("dfTd"),D=e("++gc"),x=e("s7LF"),E=e("dJrM"),L=e("HsOI"),W=e("IP0z"),A=e("/HVE"),P=e("omvX"),V=e("Azqq"),N=e("JjoW"),T=e("hOhj"),q=e("5GAg"),$=e("A1Tq"),j=e("IrvQ"),B=a.Cb({encapsulation:0,styles:[[""]],data:{}});function R(l){return a.ac(0,[(l()(),a.Eb(0,0,null,null,3,"mat-option",[["class","mat-option"],["disabled",""],["role","option"]],[[1,"tabindex",0],[2,"mat-selected",null],[2,"mat-option-multiple",null],[2,"mat-active",null],[8,"id",0],[1,"aria-selected",0],[1,"aria-disabled",0],[2,"mat-option-disabled",null]],[[null,"click"],[null,"keydown"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==a.Qb(l,1)._selectViaInteraction()&&t),"keydown"===n&&(t=!1!==a.Qb(l,1)._handleKeydown(e)&&t),t}),y.c,y.a)),a.Db(1,8568832,[[11,4]],0,C.r,[a.n,a.i,[2,C.l],[2,C.q]],{disabled:[0,"disabled"]},null),(l()(),a.Eb(2,0,null,0,1,null,null,null,null,null,null,null)),(l()(),a.Yb(-1,null,["Please add challenge category to filter the challenge"]))],(function(l,n){l(n,1,0,"")}),(function(l,n){l(n,0,0,a.Qb(n,1)._getTabIndex(),a.Qb(n,1).selected,a.Qb(n,1).multiple,a.Qb(n,1).active,a.Qb(n,1).id,a.Qb(n,1)._getAriaSelected(),a.Qb(n,1).disabled.toString(),a.Qb(n,1).disabled)}))}function G(l){return a.ac(0,[(l()(),a.Eb(0,0,null,null,3,"mat-option",[["class","mat-option"],["role","option"]],[[1,"tabindex",0],[2,"mat-selected",null],[2,"mat-option-multiple",null],[2,"mat-active",null],[8,"id",0],[1,"aria-selected",0],[1,"aria-disabled",0],[2,"mat-option-disabled",null]],[[null,"click"],[null,"keydown"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==a.Qb(l,1)._selectViaInteraction()&&t),"keydown"===n&&(t=!1!==a.Qb(l,1)._handleKeydown(e)&&t),t}),y.c,y.a)),a.Db(1,8568832,[[11,4]],0,C.r,[a.n,a.i,[2,C.l],[2,C.q]],{value:[0,"value"]},null),(l()(),a.Yb(2,0,[""," "])),a.Ub(3,1)],(function(l,n){l(n,1,0,null==n.context.$implicit?null:n.context.$implicit._id)}),(function(l,n){l(n,0,0,a.Qb(n,1)._getTabIndex(),a.Qb(n,1).selected,a.Qb(n,1).multiple,a.Qb(n,1).active,a.Qb(n,1).id,a.Qb(n,1)._getAriaSelected(),a.Qb(n,1).disabled.toString(),a.Qb(n,1).disabled);var e=a.Zb(n,2,0,l(n,3,0,a.Qb(n.parent,0),null==n.context.$implicit?null:null==n.context.$implicit.name?null:n.context.$implicit.name.en));l(n,2,0,e)}))}function Y(l){return a.ac(0,[(l()(),a.Eb(0,0,null,null,3,"mat-option",[["class","mat-option"],["disabled",""],["role","option"]],[[1,"tabindex",0],[2,"mat-selected",null],[2,"mat-option-multiple",null],[2,"mat-active",null],[8,"id",0],[1,"aria-selected",0],[1,"aria-disabled",0],[2,"mat-option-disabled",null]],[[null,"click"],[null,"keydown"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==a.Qb(l,1)._selectViaInteraction()&&t),"keydown"===n&&(t=!1!==a.Qb(l,1)._handleKeydown(e)&&t),t}),y.c,y.a)),a.Db(1,8568832,[[23,4]],0,C.r,[a.n,a.i,[2,C.l],[2,C.q]],{disabled:[0,"disabled"]},null),(l()(),a.Eb(2,0,null,0,1,null,null,null,null,null,null,null)),(l()(),a.Yb(-1,null,["Please add class category to filter the challenge"]))],(function(l,n){l(n,1,0,"")}),(function(l,n){l(n,0,0,a.Qb(n,1)._getTabIndex(),a.Qb(n,1).selected,a.Qb(n,1).multiple,a.Qb(n,1).active,a.Qb(n,1).id,a.Qb(n,1)._getAriaSelected(),a.Qb(n,1).disabled.toString(),a.Qb(n,1).disabled)}))}function Z(l){return a.ac(0,[(l()(),a.Eb(0,0,null,null,3,"mat-option",[["class","mat-option"],["role","option"]],[[1,"tabindex",0],[2,"mat-selected",null],[2,"mat-option-multiple",null],[2,"mat-active",null],[8,"id",0],[1,"aria-selected",0],[1,"aria-disabled",0],[2,"mat-option-disabled",null]],[[null,"click"],[null,"keydown"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==a.Qb(l,1)._selectViaInteraction()&&t),"keydown"===n&&(t=!1!==a.Qb(l,1)._handleKeydown(e)&&t),t}),y.c,y.a)),a.Db(1,8568832,[[23,4]],0,C.r,[a.n,a.i,[2,C.l],[2,C.q]],{value:[0,"value"]},null),(l()(),a.Yb(2,0,[" "," "])),a.Ub(3,1)],(function(l,n){l(n,1,0,null==n.context.$implicit?null:n.context.$implicit._id)}),(function(l,n){l(n,0,0,a.Qb(n,1)._getTabIndex(),a.Qb(n,1).selected,a.Qb(n,1).multiple,a.Qb(n,1).active,a.Qb(n,1).id,a.Qb(n,1)._getAriaSelected(),a.Qb(n,1).disabled.toString(),a.Qb(n,1).disabled);var e=a.Zb(n,2,0,l(n,3,0,a.Qb(n.parent,0),null==n.context.$implicit?null:null==n.context.$implicit.name?null:n.context.$implicit.name.en));l(n,2,0,e)}))}function K(l){return a.ac(0,[(l()(),a.Eb(0,0,null,null,2,"mat-option",[["class","mat-option"],["role","option"]],[[1,"tabindex",0],[2,"mat-selected",null],[2,"mat-option-multiple",null],[2,"mat-active",null],[8,"id",0],[1,"aria-selected",0],[1,"aria-disabled",0],[2,"mat-option-disabled",null]],[[null,"click"],[null,"keydown"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==a.Qb(l,1)._selectViaInteraction()&&t),"keydown"===n&&(t=!1!==a.Qb(l,1)._handleKeydown(e)&&t),t}),y.c,y.a)),a.Db(1,8568832,[[35,4]],0,C.r,[a.n,a.i,[2,C.l],[2,C.q]],{value:[0,"value"]},null),(l()(),a.Yb(2,0,[""," "]))],(function(l,n){l(n,1,0,null==n.context.$implicit?null:n.context.$implicit.value)}),(function(l,n){l(n,0,0,a.Qb(n,1)._getTabIndex(),a.Qb(n,1).selected,a.Qb(n,1).multiple,a.Qb(n,1).active,a.Qb(n,1).id,a.Qb(n,1)._getAriaSelected(),a.Qb(n,1).disabled.toString(),a.Qb(n,1).disabled),l(n,2,0,null==n.context.$implicit?null:n.context.$implicit.name)}))}function U(l){return a.ac(0,[a.Sb(0,O.v,[]),a.Wb(402653184,1,{tableRef:0}),(l()(),a.Eb(2,0,null,null,89,"mat-table-renderer",[["notFound","Challenges not added"],["placeholder","Search by Challenge Name"]],null,[[null,"add"],[null,"export"],[null,"find"],[null,"page"],[null,"status"],[null,"sort"],[null,"filter"]],(function(l,n,e){var a=!0,t=l.component;return"add"===n&&(a=!1!==t.addChallenges(e)&&a),"export"===n&&(a=!1!==t.downloadList(e)&&a),"find"===n&&(a=!1!==t.paginationWithSearch(e,0)&&a),"page"===n&&(a=!1!==t.paginationWithSearch(e,1)&&a),"status"===n&&(a=!1!==t.changeStatus(e)&&a),"sort"===n&&(a=!1!==t.sortByListing(e)&&a),"filter"===n&&(a=!1!==t.submitFilter(e)&&a),a}),v.b,v.a)),a.Db(3,245760,[[1,4]],0,b.a,[w.a,S.e,k.a,F.a,I.a,D.a],{pageType:[0,"pageType"],cls:[1,"cls"],addCustomClass:[2,"addCustomClass"],heading:[3,"heading"],notFound:[4,"notFound"],placeholder:[5,"placeholder"]},{page:"page",find:"find",sort:"sort",add:"add",status:"status",filter:"filter",export:"export"}),(l()(),a.Eb(4,0,null,1,87,"div",[["role","filter"]],null,null,null,null,null)),(l()(),a.Eb(5,0,null,null,86,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,e){var t=!0;return"submit"===n&&(t=!1!==a.Qb(l,7).onSubmit(e)&&t),"reset"===n&&(t=!1!==a.Qb(l,7).onReset()&&t),t}),null,null)),a.Db(6,16384,null,0,x.D,[],null,null),a.Db(7,540672,null,0,x.k,[[8,null],[8,null]],{form:[0,"form"]},null),a.Vb(2048,null,x.c,null,[x.k]),a.Db(9,16384,null,0,x.t,[[4,x.c]],null,null),(l()(),a.Eb(10,0,null,null,27,"mat-form-field",[["appearance","outline"],["class","search_filter mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,E.b,E.a)),a.Db(11,7520256,null,9,L.c,[a.n,a.i,[2,C.j],[2,W.b],[2,L.a],A.a,a.G,[2,P.a]],{appearance:[0,"appearance"]},null),a.Wb(603979776,2,{_controlNonStatic:0}),a.Wb(335544320,3,{_controlStatic:0}),a.Wb(603979776,4,{_labelChildNonStatic:0}),a.Wb(335544320,5,{_labelChildStatic:0}),a.Wb(603979776,6,{_placeholderChild:0}),a.Wb(603979776,7,{_errorChildren:1}),a.Wb(603979776,8,{_hintChildren:1}),a.Wb(603979776,9,{_prefixChildren:1}),a.Wb(603979776,10,{_suffixChildren:1}),(l()(),a.Eb(21,0,null,3,2,"mat-label",[],null,null,null,null,null)),a.Db(22,16384,[[4,4],[5,4]],0,L.g,[],null,null),(l()(),a.Yb(-1,null,["Select Challenge Category"])),(l()(),a.Eb(24,0,null,1,13,"mat-select",[["class","mat-select"],["formControlName","categoryId"],["role","listbox"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[1,"id",0],[1,"tabindex",0],[1,"aria-label",0],[1,"aria-labelledby",0],[1,"aria-required",0],[1,"aria-disabled",0],[1,"aria-invalid",0],[1,"aria-owns",0],[1,"aria-multiselectable",0],[1,"aria-describedby",0],[1,"aria-activedescendant",0],[2,"mat-select-disabled",null],[2,"mat-select-invalid",null],[2,"mat-select-required",null],[2,"mat-select-empty",null]],[[null,"keydown"],[null,"focus"],[null,"blur"]],(function(l,n,e){var t=!0;return"keydown"===n&&(t=!1!==a.Qb(l,29)._handleKeydown(e)&&t),"focus"===n&&(t=!1!==a.Qb(l,29)._onFocus()&&t),"blur"===n&&(t=!1!==a.Qb(l,29)._onBlur()&&t),t}),V.b,V.a)),a.Vb(6144,null,C.l,null,[N.c]),a.Db(26,671744,null,0,x.i,[[3,x.c],[8,null],[8,null],[8,null],[2,x.C]],{name:[0,"name"]},null),a.Vb(2048,null,x.r,null,[x.i]),a.Db(28,16384,null,0,x.s,[[4,x.r]],null,null),a.Db(29,2080768,null,3,N.c,[T.e,a.i,a.G,C.d,a.n,[2,W.b],[2,x.u],[2,x.k],[2,L.c],[6,x.r],[8,null],N.a,q.j],null,null),a.Wb(603979776,11,{options:1}),a.Wb(603979776,12,{optionGroups:1}),a.Wb(603979776,13,{customTrigger:0}),a.Vb(2048,[[2,4],[3,4]],L.d,null,[N.c]),(l()(),a.tb(16777216,null,1,1,null,R)),a.Db(35,16384,null,0,O.m,[a.Z,a.V],{ngIf:[0,"ngIf"]},null),(l()(),a.tb(16777216,null,1,1,null,G)),a.Db(37,278528,null,0,O.l,[a.Z,a.V,a.y],{ngForOf:[0,"ngForOf"]},null),(l()(),a.Eb(38,0,null,null,27,"mat-form-field",[["appearance","outline"],["class","search_filter mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,E.b,E.a)),a.Db(39,7520256,null,9,L.c,[a.n,a.i,[2,C.j],[2,W.b],[2,L.a],A.a,a.G,[2,P.a]],{appearance:[0,"appearance"]},null),a.Wb(603979776,14,{_controlNonStatic:0}),a.Wb(335544320,15,{_controlStatic:0}),a.Wb(603979776,16,{_labelChildNonStatic:0}),a.Wb(335544320,17,{_labelChildStatic:0}),a.Wb(603979776,18,{_placeholderChild:0}),a.Wb(603979776,19,{_errorChildren:1}),a.Wb(603979776,20,{_hintChildren:1}),a.Wb(603979776,21,{_prefixChildren:1}),a.Wb(603979776,22,{_suffixChildren:1}),(l()(),a.Eb(49,0,null,3,2,"mat-label",[],null,null,null,null,null)),a.Db(50,16384,[[16,4],[17,4]],0,L.g,[],null,null),(l()(),a.Yb(-1,null,["Select Class Category"])),(l()(),a.Eb(52,0,null,1,13,"mat-select",[["class","mat-select"],["formControlName","classCategoryId"],["role","listbox"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[1,"id",0],[1,"tabindex",0],[1,"aria-label",0],[1,"aria-labelledby",0],[1,"aria-required",0],[1,"aria-disabled",0],[1,"aria-invalid",0],[1,"aria-owns",0],[1,"aria-multiselectable",0],[1,"aria-describedby",0],[1,"aria-activedescendant",0],[2,"mat-select-disabled",null],[2,"mat-select-invalid",null],[2,"mat-select-required",null],[2,"mat-select-empty",null]],[[null,"keydown"],[null,"focus"],[null,"blur"]],(function(l,n,e){var t=!0;return"keydown"===n&&(t=!1!==a.Qb(l,57)._handleKeydown(e)&&t),"focus"===n&&(t=!1!==a.Qb(l,57)._onFocus()&&t),"blur"===n&&(t=!1!==a.Qb(l,57)._onBlur()&&t),t}),V.b,V.a)),a.Vb(6144,null,C.l,null,[N.c]),a.Db(54,671744,null,0,x.i,[[3,x.c],[8,null],[8,null],[8,null],[2,x.C]],{name:[0,"name"]},null),a.Vb(2048,null,x.r,null,[x.i]),a.Db(56,16384,null,0,x.s,[[4,x.r]],null,null),a.Db(57,2080768,null,3,N.c,[T.e,a.i,a.G,C.d,a.n,[2,W.b],[2,x.u],[2,x.k],[2,L.c],[6,x.r],[8,null],N.a,q.j],null,null),a.Wb(603979776,23,{options:1}),a.Wb(603979776,24,{optionGroups:1}),a.Wb(603979776,25,{customTrigger:0}),a.Vb(2048,[[14,4],[15,4]],L.d,null,[N.c]),(l()(),a.tb(16777216,null,1,1,null,Y)),a.Db(63,16384,null,0,O.m,[a.Z,a.V],{ngIf:[0,"ngIf"]},null),(l()(),a.tb(16777216,null,1,1,null,Z)),a.Db(65,278528,null,0,O.l,[a.Z,a.V,a.y],{ngForOf:[0,"ngForOf"]},null),(l()(),a.Eb(66,0,null,null,25,"mat-form-field",[["appearance","outline"],["class","search_filter mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,E.b,E.a)),a.Db(67,7520256,null,9,L.c,[a.n,a.i,[2,C.j],[2,W.b],[2,L.a],A.a,a.G,[2,P.a]],{appearance:[0,"appearance"]},null),a.Wb(603979776,26,{_controlNonStatic:0}),a.Wb(335544320,27,{_controlStatic:0}),a.Wb(603979776,28,{_labelChildNonStatic:0}),a.Wb(335544320,29,{_labelChildStatic:0}),a.Wb(603979776,30,{_placeholderChild:0}),a.Wb(603979776,31,{_errorChildren:1}),a.Wb(603979776,32,{_hintChildren:1}),a.Wb(603979776,33,{_prefixChildren:1}),a.Wb(603979776,34,{_suffixChildren:1}),(l()(),a.Eb(77,0,null,3,2,"mat-label",[],null,null,null,null,null)),a.Db(78,16384,[[28,4],[29,4]],0,L.g,[],null,null),(l()(),a.Yb(-1,null,["Select Status"])),(l()(),a.Eb(80,0,null,1,11,"mat-select",[["class","mat-select"],["formControlName","status"],["role","listbox"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[1,"id",0],[1,"tabindex",0],[1,"aria-label",0],[1,"aria-labelledby",0],[1,"aria-required",0],[1,"aria-disabled",0],[1,"aria-invalid",0],[1,"aria-owns",0],[1,"aria-multiselectable",0],[1,"aria-describedby",0],[1,"aria-activedescendant",0],[2,"mat-select-disabled",null],[2,"mat-select-invalid",null],[2,"mat-select-required",null],[2,"mat-select-empty",null]],[[null,"keydown"],[null,"focus"],[null,"blur"]],(function(l,n,e){var t=!0;return"keydown"===n&&(t=!1!==a.Qb(l,85)._handleKeydown(e)&&t),"focus"===n&&(t=!1!==a.Qb(l,85)._onFocus()&&t),"blur"===n&&(t=!1!==a.Qb(l,85)._onBlur()&&t),t}),V.b,V.a)),a.Vb(6144,null,C.l,null,[N.c]),a.Db(82,671744,null,0,x.i,[[3,x.c],[8,null],[8,null],[8,null],[2,x.C]],{name:[0,"name"]},null),a.Vb(2048,null,x.r,null,[x.i]),a.Db(84,16384,null,0,x.s,[[4,x.r]],null,null),a.Db(85,2080768,null,3,N.c,[T.e,a.i,a.G,C.d,a.n,[2,W.b],[2,x.u],[2,x.k],[2,L.c],[6,x.r],[8,null],N.a,q.j],null,null),a.Wb(603979776,35,{options:1}),a.Wb(603979776,36,{optionGroups:1}),a.Wb(603979776,37,{customTrigger:0}),a.Vb(2048,[[26,4],[27,4]],L.d,null,[N.c]),(l()(),a.tb(16777216,null,1,1,null,K)),a.Db(91,278528,null,0,O.l,[a.Z,a.V,a.y],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var e=n.component;l(n,3,0,"disableEditIcon",a.Ib(1,"",e.permissionClass,""),"",e.heading,"Challenges not added","Search by Challenge Name"),l(n,7,0,e.filterForm),l(n,11,0,"outline"),l(n,26,0,"categoryId"),l(n,29,0),l(n,35,0,!e.categoryList||(null==e.categoryList?null:e.categoryList.length)<=0),l(n,37,0,e.categoryList),l(n,39,0,"outline"),l(n,54,0,"classCategoryId"),l(n,57,0),l(n,63,0,!e.classCategoryList||(null==e.classCategoryList?null:e.classCategoryList.length)<=0),l(n,65,0,e.classCategoryList),l(n,67,0,"outline"),l(n,82,0,"status"),l(n,85,0),l(n,91,0,e.status)}),(function(l,n){l(n,5,0,a.Qb(n,9).ngClassUntouched,a.Qb(n,9).ngClassTouched,a.Qb(n,9).ngClassPristine,a.Qb(n,9).ngClassDirty,a.Qb(n,9).ngClassValid,a.Qb(n,9).ngClassInvalid,a.Qb(n,9).ngClassPending),l(n,10,1,["standard"==a.Qb(n,11).appearance,"fill"==a.Qb(n,11).appearance,"outline"==a.Qb(n,11).appearance,"legacy"==a.Qb(n,11).appearance,a.Qb(n,11)._control.errorState,a.Qb(n,11)._canLabelFloat,a.Qb(n,11)._shouldLabelFloat(),a.Qb(n,11)._hasFloatingLabel(),a.Qb(n,11)._hideControlPlaceholder(),a.Qb(n,11)._control.disabled,a.Qb(n,11)._control.autofilled,a.Qb(n,11)._control.focused,"accent"==a.Qb(n,11).color,"warn"==a.Qb(n,11).color,a.Qb(n,11)._shouldForward("untouched"),a.Qb(n,11)._shouldForward("touched"),a.Qb(n,11)._shouldForward("pristine"),a.Qb(n,11)._shouldForward("dirty"),a.Qb(n,11)._shouldForward("valid"),a.Qb(n,11)._shouldForward("invalid"),a.Qb(n,11)._shouldForward("pending"),!a.Qb(n,11)._animationsEnabled]),l(n,24,1,[a.Qb(n,28).ngClassUntouched,a.Qb(n,28).ngClassTouched,a.Qb(n,28).ngClassPristine,a.Qb(n,28).ngClassDirty,a.Qb(n,28).ngClassValid,a.Qb(n,28).ngClassInvalid,a.Qb(n,28).ngClassPending,a.Qb(n,29).id,a.Qb(n,29).tabIndex,a.Qb(n,29)._getAriaLabel(),a.Qb(n,29)._getAriaLabelledby(),a.Qb(n,29).required.toString(),a.Qb(n,29).disabled.toString(),a.Qb(n,29).errorState,a.Qb(n,29).panelOpen?a.Qb(n,29)._optionIds:null,a.Qb(n,29).multiple,a.Qb(n,29)._ariaDescribedby||null,a.Qb(n,29)._getAriaActiveDescendant(),a.Qb(n,29).disabled,a.Qb(n,29).errorState,a.Qb(n,29).required,a.Qb(n,29).empty]),l(n,38,1,["standard"==a.Qb(n,39).appearance,"fill"==a.Qb(n,39).appearance,"outline"==a.Qb(n,39).appearance,"legacy"==a.Qb(n,39).appearance,a.Qb(n,39)._control.errorState,a.Qb(n,39)._canLabelFloat,a.Qb(n,39)._shouldLabelFloat(),a.Qb(n,39)._hasFloatingLabel(),a.Qb(n,39)._hideControlPlaceholder(),a.Qb(n,39)._control.disabled,a.Qb(n,39)._control.autofilled,a.Qb(n,39)._control.focused,"accent"==a.Qb(n,39).color,"warn"==a.Qb(n,39).color,a.Qb(n,39)._shouldForward("untouched"),a.Qb(n,39)._shouldForward("touched"),a.Qb(n,39)._shouldForward("pristine"),a.Qb(n,39)._shouldForward("dirty"),a.Qb(n,39)._shouldForward("valid"),a.Qb(n,39)._shouldForward("invalid"),a.Qb(n,39)._shouldForward("pending"),!a.Qb(n,39)._animationsEnabled]),l(n,52,1,[a.Qb(n,56).ngClassUntouched,a.Qb(n,56).ngClassTouched,a.Qb(n,56).ngClassPristine,a.Qb(n,56).ngClassDirty,a.Qb(n,56).ngClassValid,a.Qb(n,56).ngClassInvalid,a.Qb(n,56).ngClassPending,a.Qb(n,57).id,a.Qb(n,57).tabIndex,a.Qb(n,57)._getAriaLabel(),a.Qb(n,57)._getAriaLabelledby(),a.Qb(n,57).required.toString(),a.Qb(n,57).disabled.toString(),a.Qb(n,57).errorState,a.Qb(n,57).panelOpen?a.Qb(n,57)._optionIds:null,a.Qb(n,57).multiple,a.Qb(n,57)._ariaDescribedby||null,a.Qb(n,57)._getAriaActiveDescendant(),a.Qb(n,57).disabled,a.Qb(n,57).errorState,a.Qb(n,57).required,a.Qb(n,57).empty]),l(n,66,1,["standard"==a.Qb(n,67).appearance,"fill"==a.Qb(n,67).appearance,"outline"==a.Qb(n,67).appearance,"legacy"==a.Qb(n,67).appearance,a.Qb(n,67)._control.errorState,a.Qb(n,67)._canLabelFloat,a.Qb(n,67)._shouldLabelFloat(),a.Qb(n,67)._hasFloatingLabel(),a.Qb(n,67)._hideControlPlaceholder(),a.Qb(n,67)._control.disabled,a.Qb(n,67)._control.autofilled,a.Qb(n,67)._control.focused,"accent"==a.Qb(n,67).color,"warn"==a.Qb(n,67).color,a.Qb(n,67)._shouldForward("untouched"),a.Qb(n,67)._shouldForward("touched"),a.Qb(n,67)._shouldForward("pristine"),a.Qb(n,67)._shouldForward("dirty"),a.Qb(n,67)._shouldForward("valid"),a.Qb(n,67)._shouldForward("invalid"),a.Qb(n,67)._shouldForward("pending"),!a.Qb(n,67)._animationsEnabled]),l(n,80,1,[a.Qb(n,84).ngClassUntouched,a.Qb(n,84).ngClassTouched,a.Qb(n,84).ngClassPristine,a.Qb(n,84).ngClassDirty,a.Qb(n,84).ngClassValid,a.Qb(n,84).ngClassInvalid,a.Qb(n,84).ngClassPending,a.Qb(n,85).id,a.Qb(n,85).tabIndex,a.Qb(n,85)._getAriaLabel(),a.Qb(n,85)._getAriaLabelledby(),a.Qb(n,85).required.toString(),a.Qb(n,85).disabled.toString(),a.Qb(n,85).errorState,a.Qb(n,85).panelOpen?a.Qb(n,85)._optionIds:null,a.Qb(n,85).multiple,a.Qb(n,85)._ariaDescribedby||null,a.Qb(n,85)._getAriaActiveDescendant(),a.Qb(n,85).disabled,a.Qb(n,85).errorState,a.Qb(n,85).required,a.Qb(n,85).empty])}))}function H(l){return a.ac(0,[(l()(),a.Eb(0,0,null,null,2,"lv-challenges-listing",[],null,null,null,U,B)),a.Vb(512,null,o.a,o.a,[$.a]),a.Db(2,245760,null,0,c,[j.a,x.f,F.o,I.a,w.a,o.a,D.a],null,null)],(function(l,n){l(n,2,0)}),null)}var z=a.Ab("lv-challenges-listing",c,H,{},{},[]),J=e("POq0"),M=e("QQfA"),X=e("Mz6y"),ll=e("cUpR"),nl=e("OIZN"),el=e("7kcP"),al=e("821u"),tl=e("gavF"),il=e("Gi4r"),ul=e("oapL"),ol=e("ZwOa"),rl=e("Fwaw"),dl=e("dHPm"),sl=e("Z0D0"),bl=e("zMNK"),cl=e("igqZ"),gl=e("zQui"),hl=e("8rEH"),ml=e("UqGY"),pl=e("fjoK"),fl=e("A3va"),Ql=e("TTF9"),_l=e("RGOs"),yl=e("tl6j"),Cl=e("mkRZ"),Ol=e("6d+p"),vl=e("oATp"),wl=e("Mwml"),Sl=e("pBi1"),kl=e("AHvR"),Fl=e("phW1"),Il=e("UP7b"),Dl=e("r0V8"),xl=e("ohvV");e.d(n,"ChallengesListingModuleNgFactory",(function(){return El}));var El=a.Bb(g,[],(function(l){return a.Nb([a.Ob(512,a.l,a.mb,[[8,[h.a,m.a,p.a,f.a,Q.b,Q.a,_.a,z]],[3,a.l],a.E]),a.Ob(4608,O.o,O.n,[a.A,[2,O.E]]),a.Ob(4608,x.B,x.B,[]),a.Ob(4608,J.c,J.c,[]),a.Ob(4608,C.d,C.d,[]),a.Ob(4608,x.f,x.f,[]),a.Ob(4608,M.d,M.d,[M.j,M.f,a.l,M.i,M.g,a.w,a.G,O.d,W.b,[2,O.i]]),a.Ob(5120,M.k,M.l,[M.d]),a.Ob(5120,N.a,N.b,[M.d]),a.Ob(5120,X.b,X.c,[M.d]),a.Ob(4608,ll.e,C.e,[[2,C.i],[2,C.n]]),a.Ob(5120,nl.c,nl.a,[[3,nl.c]]),a.Ob(5120,S.c,S.d,[M.d]),a.Ob(135680,S.e,S.e,[M.d,a.w,[2,O.i],[2,S.b],S.c,[3,S.e],M.f]),a.Ob(5120,el.d,el.a,[[3,el.d]]),a.Ob(4608,al.i,al.i,[]),a.Ob(5120,al.a,al.b,[M.d]),a.Ob(4608,C.c,C.x,[[2,C.h],A.a]),a.Ob(5120,tl.c,tl.j,[M.d]),a.Ob(4608,w.a,w.a,[]),a.Ob(1073742336,O.c,O.c,[]),a.Ob(1073742336,F.s,F.s,[[2,F.x],[2,F.o]]),a.Ob(1073742336,x.A,x.A,[]),a.Ob(1073742336,x.m,x.m,[]),a.Ob(1073742336,W.a,W.a,[]),a.Ob(1073742336,C.n,C.n,[[2,C.f],[2,ll.f]]),a.Ob(1073742336,il.c,il.c,[]),a.Ob(1073742336,J.d,J.d,[]),a.Ob(1073742336,L.e,L.e,[]),a.Ob(1073742336,A.b,A.b,[]),a.Ob(1073742336,ul.c,ul.c,[]),a.Ob(1073742336,ol.c,ol.c,[]),a.Ob(1073742336,C.w,C.w,[]),a.Ob(1073742336,rl.c,rl.c,[]),a.Ob(1073742336,x.x,x.x,[]),a.Ob(1073742336,dl.a,dl.a,[]),a.Ob(1073742336,sl.a,sl.a,[]),a.Ob(1073742336,C.u,C.u,[]),a.Ob(1073742336,C.s,C.s,[]),a.Ob(1073742336,bl.g,bl.g,[]),a.Ob(1073742336,T.c,T.c,[]),a.Ob(1073742336,M.h,M.h,[]),a.Ob(1073742336,N.d,N.d,[]),a.Ob(1073742336,cl.e,cl.e,[]),a.Ob(1073742336,gl.p,gl.p,[]),a.Ob(1073742336,hl.m,hl.m,[]),a.Ob(1073742336,q.a,q.a,[]),a.Ob(1073742336,X.e,X.e,[]),a.Ob(1073742336,nl.d,nl.d,[]),a.Ob(1073742336,S.k,S.k,[]),a.Ob(1073742336,el.e,el.e,[]),a.Ob(1073742336,ml.a,ml.a,[]),a.Ob(1073742336,pl.a,pl.a,[]),a.Ob(1073742336,al.j,al.j,[]),a.Ob(1073742336,C.y,C.y,[]),a.Ob(1073742336,C.p,C.p,[]),a.Ob(1073742336,fl.a,fl.a,[]),a.Ob(1073742336,Ql.a,Ql.a,[]),a.Ob(1073742336,_l.a,_l.a,[]),a.Ob(1073742336,yl.a,yl.a,[]),a.Ob(1073742336,Cl.e,Cl.e,[]),a.Ob(1073742336,Ol.a,Ol.a,[]),a.Ob(1073742336,tl.i,tl.i,[]),a.Ob(1073742336,tl.f,tl.f,[]),a.Ob(1073742336,vl.a,vl.a,[]),a.Ob(1073742336,wl.a,wl.a,[]),a.Ob(1073742336,Sl.d,Sl.d,[]),a.Ob(1073742336,Sl.c,Sl.c,[]),a.Ob(1073742336,kl.a,kl.a,[]),a.Ob(1073742336,Fl.a,Fl.a,[]),a.Ob(1073742336,Il.a,Il.a,[]),a.Ob(1073742336,Dl.d,Dl.d,[]),a.Ob(1073742336,Dl.c,Dl.c,[]),a.Ob(1073742336,xl.a,xl.a,[]),a.Ob(1073742336,g,g,[]),a.Ob(256,C.g,C.k,[]),a.Ob(1024,F.m,(function(){return[[{path:"",component:c}]]}),[])])}))}}]);