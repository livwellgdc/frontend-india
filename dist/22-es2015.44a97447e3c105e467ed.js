(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{EkNo:function(a,t,n){"use strict";n.d(t,"a",(function(){return l}));var e=n("SqtC");class l{constructor(a){this._storage=a}ngOnInit(){this.showTabs()}showTabs(){switch(this.tabName){case"cmsTabs":this.navLinks=i;break;case"userDetailTabs":this.navLinks="ADMIN"==this._storage.adminDetail.userType?o(this.userId):o(this.userId).filter(a=>"Blockchain Challenge Data"!=a.label&&"Blockchain Health Data"!=a.label);break;case"selesTrackerTabs":this.navLinks=r}}}const i=[{path:e.nb,label:"Terms & Conditions"},{path:e.X,label:"Privacy Policy"},{path:e.a,label:"About Us"},{path:e.C,label:"Contact Us"}],o=a=>[{path:`/${e.ob}/${a}/${e.p}`,label:"Badge Earned"},{path:`/${e.ob}/${a}/${e.r}`,label:"Blockchain Challenge Data"},{path:`/${e.ob}/${a}/${e.s}`,label:"Blockchain Health Data"}],r=[{path:`/${e.hb}`,label:"Assigned Codes"}]},ZEnc:function(a,t,n){"use strict";var e=n("8Y7J"),l=n("rWV4"),i=n("/HVE"),o=n("Xd0L"),r=n("5GAg"),b=n("omvX"),s=n("iInd"),c=n("SVse"),u=n("POq0"),d=n("IP0z"),m=(n("cUpR"),n("zMNK"),n("hOhj")),h=e.Cb({encapsulation:2,styles:[".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-header-pagination{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;touch-action:none}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-pagination-after,.mat-tab-header-rtl .mat-tab-header-pagination-before{padding-right:4px}.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-tab-links{display:flex}[mat-align-tabs=center] .mat-tab-links{justify-content:center}[mat-align-tabs=end] .mat-tab-links{justify-content:flex-end}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}._mat-animation-noopable.mat-ink-bar{transition:none;animation:none}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}@media (-ms-high-contrast:active){.mat-ink-bar{outline:solid 2px;height:0}}.mat-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-link{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;vertical-align:top;text-decoration:none;position:relative;overflow:hidden;-webkit-tap-highlight-color:transparent}.mat-tab-link:focus{outline:0}.mat-tab-link:focus:not(.mat-tab-disabled){opacity:1}@media (-ms-high-contrast:active){.mat-tab-link:focus{outline:dotted 2px}}.mat-tab-link.mat-tab-disabled{cursor:default}@media (-ms-high-contrast:active){.mat-tab-link.mat-tab-disabled{opacity:.5}}.mat-tab-link .mat-tab-label-content{display:inline-flex;justify-content:center;align-items:center;white-space:nowrap}@media (-ms-high-contrast:active){.mat-tab-link{opacity:1}}[mat-stretch-tabs] .mat-tab-link{flex-basis:0;flex-grow:1}.mat-tab-link.mat-tab-disabled{pointer-events:none}@media (max-width:599px){.mat-tab-link{min-width:72px}}"],data:{}});function p(a){return e.ac(2,[e.Wb(402653184,1,{_inkBar:0}),e.Wb(402653184,2,{_tabListContainer:0}),e.Wb(402653184,3,{_tabList:0}),e.Wb(671088640,4,{_nextPaginator:0}),e.Wb(671088640,5,{_previousPaginator:0}),(a()(),e.Eb(5,0,[[5,0],["previousPaginator",1]],null,2,"div",[["aria-hidden","true"],["class","mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4 mat-ripple"],["mat-ripple",""]],[[2,"mat-tab-header-pagination-disabled",null],[2,"mat-ripple-unbounded",null]],[[null,"click"],[null,"mousedown"],[null,"touchend"]],(function(a,t,n){var e=!0,l=a.component;return"click"===t&&(e=!1!==l._handlePaginatorClick("before")&&e),"mousedown"===t&&(e=!1!==l._handlePaginatorPress("before")&&e),"touchend"===t&&(e=!1!==l._stopInterval()&&e),e}),null,null)),e.Db(6,212992,null,0,o.v,[e.n,e.G,i.a,[2,o.m],[2,b.a]],{disabled:[0,"disabled"]},null),(a()(),e.Eb(7,0,null,null,0,"div",[["class","mat-tab-header-pagination-chevron"]],null,null,null,null,null)),(a()(),e.Eb(8,0,[[2,0],["tabListContainer",1]],null,6,"div",[["class","mat-tab-link-container"]],null,[[null,"keydown"]],(function(a,t,n){var e=!0;return"keydown"===t&&(e=!1!==a.component._handleKeydown(n)&&e),e}),null,null)),(a()(),e.Eb(9,0,[[3,0],["tabList",1]],null,5,"div",[["class","mat-tab-list"]],null,[[null,"cdkObserveContent"]],(function(a,t,n){var e=!0;return"cdkObserveContent"===t&&(e=!1!==a.component._onContentChanges()&&e),e}),null,null)),e.Db(10,1196032,null,0,u.a,[u.b,e.n,e.G],null,{event:"cdkObserveContent"}),(a()(),e.Eb(11,0,null,null,1,"div",[["class","mat-tab-links"]],null,null,null,null,null)),e.Pb(null,0),(a()(),e.Eb(13,0,null,null,1,"mat-ink-bar",[["class","mat-ink-bar"]],[[2,"_mat-animation-noopable",null]],null,null,null,null)),e.Db(14,16384,[[1,4]],0,l.b,[e.n,e.G,l.l,[2,b.a]],null,null),(a()(),e.Eb(15,0,[[4,0],["nextPaginator",1]],null,2,"div",[["aria-hidden","true"],["class","mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4 mat-ripple"],["mat-ripple",""]],[[2,"mat-tab-header-pagination-disabled",null],[2,"mat-ripple-unbounded",null]],[[null,"mousedown"],[null,"click"],[null,"touchend"]],(function(a,t,n){var e=!0,l=a.component;return"mousedown"===t&&(e=!1!==l._handlePaginatorPress("after")&&e),"click"===t&&(e=!1!==l._handlePaginatorClick("after")&&e),"touchend"===t&&(e=!1!==l._stopInterval()&&e),e}),null,null)),e.Db(16,212992,null,0,o.v,[e.n,e.G,i.a,[2,o.m],[2,b.a]],{disabled:[0,"disabled"]},null),(a()(),e.Eb(17,0,null,null,0,"div",[["class","mat-tab-header-pagination-chevron"]],null,null,null,null,null))],(function(a,t){var n=t.component;a(t,6,0,n._disableScrollBefore||n.disableRipple),a(t,16,0,n._disableScrollAfter||n.disableRipple)}),(function(a,t){var n=t.component;a(t,5,0,n._disableScrollBefore,e.Qb(t,6).unbounded),a(t,13,0,"NoopAnimations"===e.Qb(t,14)._animationMode),a(t,15,0,n._disableScrollAfter,e.Qb(t,16).unbounded)}))}n("EkNo"),n("E2f4"),n.d(t,"a",(function(){return g})),n.d(t,"b",(function(){return v}));var g=e.Cb({encapsulation:0,styles:[[".tabbing_chat[_ngcontent-%COMP%]{display:inline-block;overflow:auto;width:100%;padding:0 15px}.tabbing_chat[_ngcontent-%COMP%]   .mat-tab-nav-bar[_ngcontent-%COMP%]{margin-bottom:10px;overflow:auto}.tabbing_chat[_ngcontent-%COMP%]   .mat-tab-nav-bar[_ngcontent-%COMP%]   .mat-tab-link[_ngcontent-%COMP%]{font-family:inherit;font-weight:500;min-width:120px;font-size:16px}.tabbing_chat[_ngcontent-%COMP%]   .mat-tab-nav-bar[_ngcontent-%COMP%]   .mat-tab-link.mat-tab-label-active[_ngcontent-%COMP%]{border-radius:6px 6px 0 0;opacity:1;background-color:#9009684d}@media (max-width:767px){.tabbing_chat[_ngcontent-%COMP%]   .mat-tab-nav-bar[_ngcontent-%COMP%]   .mat-tab-link[_ngcontent-%COMP%]{min-width:150px}}"]],data:{}});function f(a){return e.ac(0,[(a()(),e.Eb(0,0,null,null,7,"a",[["class","mat-tab-link"],["mat-tab-link",""],["routerLinkActive",""]],[[1,"aria-current",0],[1,"aria-disabled",0],[1,"tabIndex",0],[2,"mat-tab-disabled",null],[2,"mat-tab-label-active",null],[1,"target",0],[8,"href",4]],[[null,"click"]],(function(a,t,n){var l=!0;return"click"===t&&(l=!1!==e.Qb(a,2).onClick(n.button,n.ctrlKey,n.metaKey,n.shiftKey)&&l),l}),null,null)),e.Db(1,147456,[[1,4]],0,l.i,[l.j,e.n,e.G,i.a,[2,o.m],[8,null],r.h,[2,b.a]],{active:[0,"active"]},null),e.Db(2,671744,[[3,4]],0,s.r,[s.o,s.a,c.j],{routerLink:[0,"routerLink"]},null),e.Db(3,1720320,[["rla",4]],2,s.q,[s.o,e.n,e.N,[2,s.p],[2,s.r]],{routerLinkActiveOptions:[0,"routerLinkActiveOptions"],routerLinkActive:[1,"routerLinkActive"]},null),e.Wb(603979776,2,{links:1}),e.Wb(603979776,3,{linksWithHrefs:1}),e.Tb(6,{exact:0}),(a()(),e.Yb(7,null,[" "," "]))],(function(a,t){a(t,1,0,e.Qb(t,3).isActive),a(t,2,0,t.context.$implicit.path);var n=a(t,6,0,!1);a(t,3,0,n,"")}),(function(a,t){a(t,0,0,e.Qb(t,1).active?"page":null,e.Qb(t,1).disabled,e.Qb(t,1).tabIndex,e.Qb(t,1).disabled,e.Qb(t,1).active,e.Qb(t,2).target,e.Qb(t,2).href),a(t,7,0,t.context.$implicit.label)}))}function v(a){return e.ac(0,[(a()(),e.Eb(0,0,null,null,5,"div",[["class","tabbing_chat charitables"]],null,null,null,null,null)),(a()(),e.Eb(1,0,null,null,4,"nav",[["class","mat-tab-nav-bar mat-tab-header"],["mat-tab-nav-bar",""]],[[2,"mat-tab-header-pagination-controls-enabled",null],[2,"mat-tab-header-rtl",null],[2,"mat-primary",null],[2,"mat-accent",null],[2,"mat-warn",null]],null,null,p,h)),e.Db(2,7520256,null,1,l.j,[e.n,[2,d.b],e.G,e.i,m.e,[2,i.a],[2,b.a]],null,null),e.Wb(603979776,1,{_items:1}),(a()(),e.tb(16777216,null,0,1,null,f)),e.Db(5,278528,null,0,c.l,[e.Z,e.V,e.y],{ngForOf:[0,"ngForOf"]},null)],(function(a,t){a(t,5,0,t.component.navLinks)}),(function(a,t){a(t,1,0,e.Qb(t,2)._showPaginationControls,"rtl"==e.Qb(t,2)._getLayoutDirection(),"warn"!==e.Qb(t,2).color&&"accent"!==e.Qb(t,2).color,"accent"===e.Qb(t,2).color,"warn"===e.Qb(t,2).color)}))}}}]);