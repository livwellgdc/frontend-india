(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{MGbM:function(n,u,t){"use strict";t.r(u);var l=t("8Y7J"),r=t("s7LF"),e=t("UMEK"),o=t("RliZ"),_=t("SqtC");class i{constructor(n,u,t){this._fb=n,this._account=u,this._success=t,this.errorMsg=o.b,this.limit=e.a,this.createForm()}ngOnInit(){}createForm(){this.forgotForm=this._fb.group({email:["",[r.z.pattern(e.b.EMAIL)]]})}get f(){return this.forgotForm.controls}trimValues(){for(const n in this.forgotForm.value)this.forgotForm.value.hasOwnProperty(n)&&this.f[n].value&&"string"==typeof this.f[n].value&&this.f[n].patchValue(this.f[n].value.trim())}forgotHandler(){this.forgotForm.valid?this._account.forgotPassword(this.forgotForm.value).subscribe(n=>{200==n.statusCode&&this._success.successBox("Check Your Inbox",n.message,_.b)},n=>{(n.statusCode=400)&&this.email.nativeElement.focus()}):this.email.nativeElement.focus()}}class S{}var A=t("pMnS"),c=t("t68o"),a=t("dAiX"),d=t("9xPC"),E=t("HsOI"),b=t("YtCS"),f=t("dJrM"),$=t("Xd0L"),I=t("IP0z"),s=t("/HVE"),T=t("omvX"),D=t("ZwOa"),B=t("oapL"),L=t("ck89"),O=t("SVse"),N=t("bujt"),m=t("Fwaw"),R=t("5GAg"),C=t("iInd"),p=t("9t6Q"),g=t("48p6"),h=l.Cb({encapsulation:0,styles:[["[_nghost-%COMP%]{display:inline-block;width:100%}.mobile-form[_ngcontent-%COMP%]{background:#fff;border-radius:20px;box-shadow:0 5px 0 #900968}"],d.a],data:{}});function H(n){return l.ac(0,[(n()(),l.Eb(0,0,null,null,2,"mat-error",[["class","mat-error"],["role","alert"]],[[1,"id",0]],null,null,null,null)),l.Db(1,16384,[[7,4]],0,E.b,[],null,null),(n()(),l.Yb(2,null,["",""]))],null,(function(n,u){var t=u.component;n(u,0,0,l.Qb(u,1).id),n(u,2,0,null==t.errorMsg?null:t.errorMsg.EMAIL_REQ)}))}function M(n){return l.ac(0,[(n()(),l.Eb(0,0,null,null,2,"mat-error",[["class","mat-error"],["role","alert"]],[[1,"id",0]],null,null,null,null)),l.Db(1,16384,[[7,4]],0,E.b,[],null,null),(n()(),l.Yb(2,null,["",""]))],null,(function(n,u){var t=u.component;n(u,0,0,l.Qb(u,1).id),n(u,2,0,null==t.errorMsg?null:t.errorMsg.INVALID_EMAIL)}))}function P(n){return l.ac(0,[l.Sb(0,b.a,[]),l.Wb(402653184,1,{email:0}),(n()(),l.Eb(2,0,null,null,49,"form",[["class","form mobile-form"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],(function(n,u,t){var r=!0,e=n.component;return"submit"===u&&(r=!1!==l.Qb(n,4).onSubmit(t)&&r),"reset"===u&&(r=!1!==l.Qb(n,4).onReset()&&r),"ngSubmit"===u&&(r=!1!==e.forgotHandler()&&r),r}),null,null)),l.Db(3,16384,null,0,r.D,[],null,null),l.Db(4,540672,null,0,r.k,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),l.Vb(2048,null,r.c,null,[r.k]),l.Db(6,16384,null,0,r.t,[[4,r.c]],null,null),(n()(),l.Eb(7,0,null,null,1,"h3",[],null,null,null,null,null)),(n()(),l.Yb(-1,null,["Forgot Password"])),(n()(),l.Eb(9,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),l.Yb(-1,null,[" Please enter your registered Email ID to reset your password. "])),(n()(),l.Eb(11,0,null,null,30,"mat-form-field",[["appearance","outline"],["class","mat-form-field"]],[[2,"mat-form-field-appearance-standard",null],[2,"mat-form-field-appearance-fill",null],[2,"mat-form-field-appearance-outline",null],[2,"mat-form-field-appearance-legacy",null],[2,"mat-form-field-invalid",null],[2,"mat-form-field-can-float",null],[2,"mat-form-field-should-float",null],[2,"mat-form-field-has-label",null],[2,"mat-form-field-hide-placeholder",null],[2,"mat-form-field-disabled",null],[2,"mat-form-field-autofilled",null],[2,"mat-focused",null],[2,"mat-accent",null],[2,"mat-warn",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"_mat-animation-noopable",null]],null,null,f.b,f.a)),l.Db(12,7520256,null,9,E.c,[l.n,l.i,[2,$.j],[2,I.b],[2,E.a],s.a,l.G,[2,T.a]],{appearance:[0,"appearance"]},null),l.Wb(603979776,2,{_controlNonStatic:0}),l.Wb(335544320,3,{_controlStatic:0}),l.Wb(603979776,4,{_labelChildNonStatic:0}),l.Wb(335544320,5,{_labelChildStatic:0}),l.Wb(603979776,6,{_placeholderChild:0}),l.Wb(603979776,7,{_errorChildren:1}),l.Wb(603979776,8,{_hintChildren:1}),l.Wb(603979776,9,{_prefixChildren:1}),l.Wb(603979776,10,{_suffixChildren:1}),(n()(),l.Eb(22,0,null,3,2,"mat-label",[],null,null,null,null,null)),l.Db(23,16384,[[4,4],[5,4]],0,E.g,[],null,null),(n()(),l.Yb(-1,null,["Email"])),(n()(),l.Eb(25,0,[[1,0],["email",1]],1,12,"input",[["class","mat-input-element mat-form-field-autofill-control"],["formControlName","email"],["matInput",""],["required",""],["type","email"]],[[1,"required",0],[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null],[2,"mat-input-server",null],[1,"id",0],[1,"placeholder",0],[8,"disabled",0],[8,"required",0],[1,"readonly",0],[1,"aria-describedby",0],[1,"aria-invalid",0],[1,"aria-required",0]],[[null,"blur"],[null,"input"],[null,"compositionstart"],[null,"compositionend"],[null,"focus"],[null,"keydown"]],(function(n,u,t){var r=!0,e=n.component;return"input"===u&&(r=!1!==l.Qb(n,26)._handleInput(t.target.value)&&r),"blur"===u&&(r=!1!==l.Qb(n,26).onTouched()&&r),"compositionstart"===u&&(r=!1!==l.Qb(n,26)._compositionStart()&&r),"compositionend"===u&&(r=!1!==l.Qb(n,26)._compositionEnd(t.target.value)&&r),"blur"===u&&(r=!1!==l.Qb(n,34)._focusChanged(!1)&&r),"focus"===u&&(r=!1!==l.Qb(n,34)._focusChanged(!0)&&r),"input"===u&&(r=!1!==l.Qb(n,34)._onInput()&&r),"keydown"===u&&(r=!1!==l.Qb(n,35).onKeyUp(t)&&r),"blur"===u&&(r=!1!==e.trimValues()&&r),r}),null,null)),l.Db(26,16384,null,0,r.d,[l.N,l.n,[2,r.a]],null,null),l.Db(27,16384,null,0,r.y,[],{required:[0,"required"]},null),l.Db(28,540672,null,0,r.n,[],{maxlength:[0,"maxlength"]},null),l.Vb(1024,null,r.p,(function(n,u){return[n,u]}),[r.y,r.n]),l.Vb(1024,null,r.q,(function(n){return[n]}),[r.d]),l.Db(31,671744,null,0,r.i,[[3,r.c],[6,r.p],[8,null],[6,r.q],[2,r.C]],{name:[0,"name"]},null),l.Vb(2048,null,r.r,null,[r.i]),l.Db(33,16384,null,0,r.s,[[4,r.r]],null,null),l.Db(34,999424,null,0,D.b,[l.n,s.a,[6,r.r],[2,r.u],[2,r.k],$.d,[8,null],B.a,l.G],{required:[0,"required"],type:[1,"type"]},null),l.Db(35,16384,null,0,L.a,[],{preventKeys:[0,"preventKeys"]},null),l.Rb(36,1),l.Vb(2048,[[2,4],[3,4]],E.d,null,[D.b]),(n()(),l.tb(16777216,null,5,1,null,H)),l.Db(39,16384,null,0,O.m,[l.Z,l.V],{ngIf:[0,"ngIf"]},null),(n()(),l.tb(16777216,null,5,1,null,M)),l.Db(41,16384,null,0,O.m,[l.Z,l.V],{ngIf:[0,"ngIf"]},null),(n()(),l.Eb(42,0,null,null,9,"div",[["class","form-btn"]],null,null,null,null,null)),(n()(),l.Eb(43,0,null,null,2,"button",[["color","primary"],["mat-flat-button",""]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],null,null,N.b,N.a)),l.Db(44,180224,null,0,m.b,[l.n,R.h,[2,T.a]],{color:[0,"color"]},null),(n()(),l.Yb(-1,0,[" Submit "])),(n()(),l.Eb(46,0,null,null,5,"button",[["class","float-right"],["mat-button",""],["type","button"]],[[1,"disabled",0],[2,"_mat-animation-noopable",null]],[[null,"click"]],(function(n,u,t){var r=!0;return"click"===u&&(r=!1!==l.Qb(n,47).onClick()&&r),r}),N.b,N.a)),l.Db(47,16384,null,0,C.p,[C.o,C.a,[8,null],l.N,l.n],{routerLink:[0,"routerLink"]},null),l.Ub(48,1),l.Rb(49,1),l.Db(50,180224,null,0,m.b,[l.n,R.h,[2,T.a]],null,null),(n()(),l.Yb(-1,0,[" Back to Login "]))],(function(n,u){var t=u.component;n(u,4,0,t.forgotForm),n(u,12,0,"outline"),n(u,27,0,""),n(u,28,0,null==t.limit?null:t.limit.MAX_EMAIL_LENGTH),n(u,31,0,"email"),n(u,34,0,"","email");var r=n(u,36,0,32);n(u,35,0,r),n(u,39,0,t.f.email.hasError("required")),n(u,41,0,t.f.email.hasError("pattern")),n(u,44,0,"primary");var e=n(u,49,0,l.Zb(u,47,0,n(u,48,0,l.Qb(u,0),"ABS_ACCOUNT_LOGIN")));n(u,47,0,e)}),(function(n,u){n(u,2,0,l.Qb(u,6).ngClassUntouched,l.Qb(u,6).ngClassTouched,l.Qb(u,6).ngClassPristine,l.Qb(u,6).ngClassDirty,l.Qb(u,6).ngClassValid,l.Qb(u,6).ngClassInvalid,l.Qb(u,6).ngClassPending),n(u,11,1,["standard"==l.Qb(u,12).appearance,"fill"==l.Qb(u,12).appearance,"outline"==l.Qb(u,12).appearance,"legacy"==l.Qb(u,12).appearance,l.Qb(u,12)._control.errorState,l.Qb(u,12)._canLabelFloat,l.Qb(u,12)._shouldLabelFloat(),l.Qb(u,12)._hasFloatingLabel(),l.Qb(u,12)._hideControlPlaceholder(),l.Qb(u,12)._control.disabled,l.Qb(u,12)._control.autofilled,l.Qb(u,12)._control.focused,"accent"==l.Qb(u,12).color,"warn"==l.Qb(u,12).color,l.Qb(u,12)._shouldForward("untouched"),l.Qb(u,12)._shouldForward("touched"),l.Qb(u,12)._shouldForward("pristine"),l.Qb(u,12)._shouldForward("dirty"),l.Qb(u,12)._shouldForward("valid"),l.Qb(u,12)._shouldForward("invalid"),l.Qb(u,12)._shouldForward("pending"),!l.Qb(u,12)._animationsEnabled]),n(u,25,1,[l.Qb(u,27).required?"":null,l.Qb(u,28).maxlength?l.Qb(u,28).maxlength:null,l.Qb(u,33).ngClassUntouched,l.Qb(u,33).ngClassTouched,l.Qb(u,33).ngClassPristine,l.Qb(u,33).ngClassDirty,l.Qb(u,33).ngClassValid,l.Qb(u,33).ngClassInvalid,l.Qb(u,33).ngClassPending,l.Qb(u,34)._isServer,l.Qb(u,34).id,l.Qb(u,34).placeholder,l.Qb(u,34).disabled,l.Qb(u,34).required,l.Qb(u,34).readonly&&!l.Qb(u,34)._isNativeSelect||null,l.Qb(u,34)._ariaDescribedby||null,l.Qb(u,34).errorState,l.Qb(u,34).required.toString()]),n(u,43,0,l.Qb(u,44).disabled||null,"NoopAnimations"===l.Qb(u,44)._animationMode),n(u,46,0,l.Qb(u,50).disabled||null,"NoopAnimations"===l.Qb(u,50)._animationMode)}))}function Q(n){return l.ac(0,[(n()(),l.Eb(0,0,null,null,1,"lv-forgot",[],null,null,null,P,h)),l.Db(1,114688,null,0,i,[r.f,p.a,g.a],null,null)],(function(n,u){n(u,1,0)}),null)}var G=l.Ab("lv-forgot",i,Q,{},{},[]),U=t("POq0"),v=t("QQfA"),F=t("s6ns"),y=t("faKS"),V=t("cUpR"),w=t("Gi4r"),X=t("dHPm"),W=t("zMNK"),Y=t("hOhj"),K=t("gddx");t.d(u,"ForgotModuleNgFactory",(function(){return k}));var k=l.Bb(S,[],(function(n){return l.Nb([l.Ob(512,l.l,l.mb,[[8,[A.a,c.a,a.a,G]],[3,l.l],l.E]),l.Ob(4608,O.o,O.n,[l.A,[2,O.E]]),l.Ob(4608,r.f,r.f,[]),l.Ob(4608,r.B,r.B,[]),l.Ob(4608,U.c,U.c,[]),l.Ob(4608,$.d,$.d,[]),l.Ob(4608,v.d,v.d,[v.j,v.f,l.l,v.i,v.g,l.w,l.G,O.d,I.b,[2,O.i]]),l.Ob(5120,v.k,v.l,[v.d]),l.Ob(5120,F.c,F.d,[v.d]),l.Ob(135680,F.e,F.e,[v.d,l.w,[2,O.i],[2,F.b],F.c,[3,F.e],v.f]),l.Ob(4608,g.a,g.a,[F.e,C.o]),l.Ob(1073742336,O.c,O.c,[]),l.Ob(1073742336,C.s,C.s,[[2,C.x],[2,C.o]]),l.Ob(1073742336,y.a,y.a,[]),l.Ob(1073742336,r.A,r.A,[]),l.Ob(1073742336,r.x,r.x,[]),l.Ob(1073742336,s.b,s.b,[]),l.Ob(1073742336,B.c,B.c,[]),l.Ob(1073742336,U.d,U.d,[]),l.Ob(1073742336,E.e,E.e,[]),l.Ob(1073742336,D.c,D.c,[]),l.Ob(1073742336,I.a,I.a,[]),l.Ob(1073742336,$.n,$.n,[[2,$.f],[2,V.f]]),l.Ob(1073742336,w.c,w.c,[]),l.Ob(1073742336,$.w,$.w,[]),l.Ob(1073742336,m.c,m.c,[]),l.Ob(1073742336,X.a,X.a,[]),l.Ob(1073742336,W.g,W.g,[]),l.Ob(1073742336,Y.c,Y.c,[]),l.Ob(1073742336,v.h,v.h,[]),l.Ob(1073742336,F.k,F.k,[]),l.Ob(1073742336,K.a,K.a,[]),l.Ob(1073742336,S,S,[]),l.Ob(1024,C.m,(function(){return[[{path:"",component:i}]]}),[])])}))},UMEK:function(n,u,t){"use strict";t.d(u,"b",(function(){return l})),t.d(u,"a",(function(){return r}));const l={NUMBER:/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,ONLY_NUMBER:/^\d+$/,ONLY_ALPHABET:/^[a-zA-Z]*$/,START_WITH_ALPHABET_ENDS_WITH_DIGITS:/^[a-zA-Z]{4}[0-9]{4}$/,AMOUNT:/(^[0][1-9]+)|([1-9]\d*)+$/,EMAIL:/^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,5}$/i,PASSWORD:/(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[@#$%^&+=])(?=[^0-9]*[0-9]).{8,20}/,URL:/^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?(\#([a-zA-Z0-9$\-_.+!*'(),;:@&=\/?]|%[0-9a-fA-F]{2})*)?)?$/},r={MAX_SHORT_NAME_LENGTH:10,MIN_SHORT_NAME_LENGTH:3,MAX_NAME_LENGTH:50,MAX_DOMAIN_LENGTH:20,MAX_NAME_LENGTH_VI:80,CURRENT_VERSION_LENGTH:20,MAX_INTEREST_LENGTH:35,MAX_INTEREST_LENGTH_VI:50,MIN_NAME_LENGTH:3,MAX_EMAIL_LENGTH:120,MAX_PASSWORD_LENGTH:20,DESCRIPTION_MAX:1e3,DESCRIPTION_MAX_VI:1200,MAX_MOBILE_LENGTH:15,MIN_MOBILE_LENGTH:9,NOTE_MAX:300,VIETNAMESE_NOTE_MAX:500,MAX_PARTICIPANTS_LENGTH:6,MAX_POINTS_LENGTH:10,MAX_CLIENT_CLUB_POINTS_LENGTH:15,MAX_DISPLAY_ORDER_LENGTH:3,MAX_CODE_LENGTH:30,MIN_CODE_LENGTH:2,MAX_CODE_QUANTITY_LENGTH:4,MAX_QR_CODE_LENGTH:8,MAX_TAX_CODE_LENGTH:15,MAX_STEP_LENGTH:10,MAX_QUESTION_LENGTH:1e3,MAX_AGE_QUES_LENGTH:300,MAX_AGE_QUES_LENGTH_VI:350,MAX_AGE_ANS_LENGTH:200,MAX_AGE_ANS_LENGTH_VI:250,MAX_LWC_POINTS:6,MAX_DAYS:5,MAX_DISCOUNT:3,MAX_PERCENTAGE_WITH_NEGATIVE:4,MAX_DISCOUNT_VALUE:100}},YtCS:function(n,u,t){"use strict";t.d(u,"a",(function(){return r}));var l=t("gv+c");class r{transform(n){return l[n]}}},ck89:function(n,u,t){"use strict";t.d(u,"a",(function(){return l}));class l{constructor(){this.isPasteAllowed=!0}onKeyUp(n){this.isPasteAllowed||86!==n.keyCode||!0!==n.ctrlKey||n.preventDefault(),this.preventKeys&&this.preventKeys.includes(n.keyCode)&&n.preventDefault()}}},dHPm:function(n,u,t){"use strict";t.d(u,"a",(function(){return l}));class l{}},faKS:function(n,u,t){"use strict";t.d(u,"a",(function(){return l}));class l{}},"gv+c":function(n,u,t){"use strict";t.r(u),t.d(u,"ABS_DASHBOARD",(function(){return r})),t.d(u,"ABS_LOGIN",(function(){return e})),t.d(u,"ABS_ACCOUNT_LOGIN",(function(){return o})),t.d(u,"ABS_FORGOT_PASSWORD",(function(){return _})),t.d(u,"ABS_RESET_PASSWORD",(function(){return i})),t.d(u,"ABS_ADMIN_PROFILE",(function(){return S})),t.d(u,"ABS_ADMIN_PROFILE_EDIT",(function(){return A})),t.d(u,"ABS_ADMIN_CHANGE_PASSWORD",(function(){return c})),t.d(u,"ABS_ACCOUNT_FORGOT_PASSWORD",(function(){return a})),t.d(u,"ABS_USERS",(function(){return d})),t.d(u,"ABS_USERS_DETAILS",(function(){return E})),t.d(u,"ABS_CATEGORY",(function(){return b})),t.d(u,"ABS_CATEGORY_DETAILS",(function(){return f})),t.d(u,"ABS_PROFILE_INTERESTS",(function(){return $})),t.d(u,"ABS_PROFILE_INTERESTS_DETAILS",(function(){return I})),t.d(u,"ABS_CLASSES",(function(){return s})),t.d(u,"ABS_CLASSES_ADD",(function(){return T})),t.d(u,"ABS_CLASSES_COPY",(function(){return D})),t.d(u,"ABS_CLASSES_EDIT",(function(){return B})),t.d(u,"ABS_CLASSES_DETAILS",(function(){return L})),t.d(u,"ABS_EVENTS",(function(){return O})),t.d(u,"ABS_EVENTS_ADD",(function(){return N})),t.d(u,"ABS_EVENTS_COPY",(function(){return m})),t.d(u,"ABS_EVENTS_EDIT",(function(){return R})),t.d(u,"ABS_EVENTS_DETAILS",(function(){return C})),t.d(u,"ABS_ARTICLES",(function(){return p})),t.d(u,"ABS_ARTICLES_ADD",(function(){return g})),t.d(u,"ABS_ARTICLES_EDIT",(function(){return h})),t.d(u,"ABS_ARTICLES_DETAILS",(function(){return H})),t.d(u,"ABS_REWARDS",(function(){return M})),t.d(u,"ABS_REWARDS_ADD",(function(){return P})),t.d(u,"ABS_REWARDS_EDIT",(function(){return Q})),t.d(u,"ABS_REWARDS_DETAILS",(function(){return G})),t.d(u,"ABS_PROMO_MGMT",(function(){return U})),t.d(u,"ABS_AGE_CALCULATOR",(function(){return v})),t.d(u,"ABS_AGE_CALCULATOR_EDIT",(function(){return F})),t.d(u,"ABS_SPECIAL_OFFERS",(function(){return y})),t.d(u,"ABS_SPECIAL_OFFERS_ADD",(function(){return V})),t.d(u,"ABS_SPECIAL_OFFERS_EDIT",(function(){return w})),t.d(u,"ABS_SPECIAL_OFFERS_DETAILS",(function(){return X})),t.d(u,"ABS_CHALLENGES",(function(){return W})),t.d(u,"ABS_CHALLENGES_ADD",(function(){return Y})),t.d(u,"ABS_CHALLENGES_COPY",(function(){return K})),t.d(u,"ABS_CHALLENGES_EDIT",(function(){return k})),t.d(u,"ABS_CHALLENGES_DETAILS",(function(){return q})),t.d(u,"ABS_GROUPS",(function(){return x})),t.d(u,"ABS_GROUPS_ADD",(function(){return z})),t.d(u,"ABS_GROUPS_EDIT",(function(){return Z})),t.d(u,"ABS_GROUPS_DETAILS",(function(){return J})),t.d(u,"ABS_BADGES",(function(){return j})),t.d(u,"ABS_BADGES_ADD",(function(){return nn})),t.d(u,"ABS_BADGES_EDIT",(function(){return un})),t.d(u,"ABS_BADGES_DETAILS",(function(){return tn})),t.d(u,"ABS_BANNERS",(function(){return ln})),t.d(u,"ABS_BANNERS_ADD",(function(){return rn})),t.d(u,"ABS_BANNERS_EDIT",(function(){return en})),t.d(u,"ABS_BANNERS_DETAILS",(function(){return on})),t.d(u,"ABS_CORPORATES",(function(){return _n})),t.d(u,"ABS_CORPORATES_ADD",(function(){return Sn})),t.d(u,"ABS_CORPORATES_EDIT",(function(){return An})),t.d(u,"ABS_CORPORATES_DETAILS",(function(){return cn})),t.d(u,"ABS_MANAGE_HEALTH_SCORE",(function(){return an})),t.d(u,"ABS_CLUBS",(function(){return dn})),t.d(u,"ABS_CLUBS_ADD",(function(){return En})),t.d(u,"ABS_CLUBS_EDIT",(function(){return bn})),t.d(u,"ABS_CLUBS_DETAILS",(function(){return fn})),t.d(u,"ABS_CLIENT_CLUBS",(function(){return $n})),t.d(u,"ABS_CLIENT_CLUBS_ADD",(function(){return In})),t.d(u,"ABS_CLIENT_CLUBS_EDIT",(function(){return sn})),t.d(u,"ABS_CLIENT_CLUBS_DETAILS",(function(){return Tn})),t.d(u,"ABS_POINTS_DISTRIBUTION",(function(){return Dn})),t.d(u,"ABS_PER_STEP_LWC",(function(){return Bn})),t.d(u,"ABS_POINTS_DISTRIBUTION_HISTORY",(function(){return Ln})),t.d(u,"ABS_LIVWELL_VIDEOS",(function(){return On})),t.d(u,"ABS_LIVWELL_VIDEOS_ADD",(function(){return Nn})),t.d(u,"ABS_LIVWELL_VIDEOS_EDIT",(function(){return mn})),t.d(u,"ABS_LIVWELL_VIDEOS_DETAILS",(function(){return Rn})),t.d(u,"ABS_VERSIONS",(function(){return Cn})),t.d(u,"ABS_VERSIONS_DETAILS",(function(){return pn})),t.d(u,"ABS_SUB_ADMINS",(function(){return gn})),t.d(u,"ABS_SUB_ADMINS_ADD",(function(){return hn})),t.d(u,"ABS_SUB_ADMINS_EDIT",(function(){return Hn})),t.d(u,"ABS_SUB_ADMINS_DETAILS",(function(){return Mn})),t.d(u,"ABS_BOARDS",(function(){return Pn})),t.d(u,"ABS_BOARDS_ADD",(function(){return Qn})),t.d(u,"ABS_BOARDS_EDIT",(function(){return Gn})),t.d(u,"ABS_BOARDS_DETAILS",(function(){return Un})),t.d(u,"ABS_POSTS",(function(){return vn})),t.d(u,"ABS_POSTS_ADD",(function(){return Fn})),t.d(u,"ABS_POSTS_EDIT",(function(){return yn})),t.d(u,"ABS_POSTS_DETAILS",(function(){return Vn})),t.d(u,"ABS_PAYMENTS",(function(){return wn})),t.d(u,"ABS_PAYMENTS_DETAILS",(function(){return Xn})),t.d(u,"ABS_FAQ",(function(){return Wn})),t.d(u,"ABS_FAQ_ADD",(function(){return Yn})),t.d(u,"ABS_FAQ_EDIT",(function(){return Kn})),t.d(u,"ABS_FAQ_DETAILS",(function(){return kn})),t.d(u,"ABS_CMS",(function(){return qn})),t.d(u,"ABS_TERM_CONDITIONS",(function(){return xn})),t.d(u,"ABS_PRIVACY_POLICY",(function(){return zn})),t.d(u,"ABS_ABOUT_US",(function(){return Zn})),t.d(u,"ABS_CONTACT_US",(function(){return Jn})),t.d(u,"ABS_STORIES",(function(){return jn})),t.d(u,"ABS_STORIES_ADD",(function(){return nu})),t.d(u,"ABS_STORIES_EDIT",(function(){return uu})),t.d(u,"ABS_STORY_DETAILS",(function(){return tu})),t.d(u,"ABS_REELS",(function(){return lu})),t.d(u,"ABS_REELS_ADD",(function(){return ru})),t.d(u,"ABS_REELS_EDIT",(function(){return eu})),t.d(u,"ABS_REELS_DETAILS",(function(){return ou})),t.d(u,"ABS_SELES_TRACKER",(function(){return _u})),t.d(u,"ABS_SELES_TRACKER_LIST",(function(){return iu})),t.d(u,"ABS_AUDIT_LOG",(function(){return Su})),t.d(u,"ABS_REPORTS",(function(){return Au})),t.d(u,"ABS_CHARITY",(function(){return cu})),t.d(u,"ABS_CHARITY_ADD",(function(){return au})),t.d(u,"ABS_CHARITY_EDIT",(function(){return du})),t.d(u,"ABS_CHARITY_DETAILS",(function(){return Eu})),t.d(u,"ABS_QUICK_LINKS",(function(){return bu})),t.d(u,"ABS_QUICK_LINKS_ADD",(function(){return fu})),t.d(u,"ABS_QUICK_LINKS_EDIT",(function(){return $u})),t.d(u,"ABS_QUICK_LINKS_DETAILS",(function(){return Iu})),t.d(u,"ABS_DEEP_LINKS",(function(){return su})),t.d(u,"ABS_DEEP_LINKS_ADD",(function(){return Tu})),t.d(u,"ABS_DEEP_LINKS_EDIT",(function(){return Du})),t.d(u,"ABS_DEEP_LINKS_DETAILS",(function(){return Bu})),t.d(u,"ABS_FITNESS_REELS",(function(){return Lu})),t.d(u,"ABS_FUTNESS_REELS_EDIT",(function(){return Ou})),t.d(u,"ABS_FITNESS_REELS_DETAILS",(function(){return Nu})),t.d(u,"ABS_SELES_REPORTS",(function(){return mu})),t.d(u,"ABS_REFERRER_REPORTS",(function(){return Ru})),t.d(u,"ABS_SPIN_WHEEL",(function(){return Cu})),t.d(u,"ABS_SPIN_WHEEL_ADD",(function(){return pu})),t.d(u,"ABS_SPIN_WHEEL_EDIT",(function(){return gu})),t.d(u,"ABS_SPIN_WHEEL_DETAILS",(function(){return hu})),t.d(u,"ABS_SUBSCRIPTION_FETURES",(function(){return Hu})),t.d(u,"ABS_SUBSCRIPTION_FETURES_ADD",(function(){return Mu})),t.d(u,"ABS_SUBSCRIPTION_FETURES_EDIT",(function(){return Pu})),t.d(u,"ABS_SUBSCRIPTION_FETURES_DETAILS",(function(){return Qu}));var l=t("SqtC");const r=`/${l.F}`,e=`/${l.Q}`,o=`/${l.b}/${l.Q}`,_=`/${l.N}`,i=`/${l.eb}`,S=`/${l.d}`,A=`/${l.d}/${l.I}`,c=`/${l.d}/${l.w}`,a=`/${l.b}/${l.N}`,d=`/${l.ob}`,E=`/${l.ob}/${l.H}`,b=`/${l.u}`,f=`/${l.u}/${l.H}`,$=`/${l.Y}`,I=`/${l.Y}/${l.H}`,s=`/${l.y}`,T=`/${l.y}/${l.c}`,D=`/${l.y}/${l.D}`,B=`/${l.y}/${l.I}`,L=`/${l.y}/${l.H}`,O=`/${l.J}`,N=`/${l.J}/${l.c}`,m=`/${l.J}/${l.D}`,R=`/${l.J}/${l.I}`,C=`/${l.J}/${l.H}`,p=`/${l.f}`,g=`/${l.f}/${l.c}`,h=`/${l.f}/${l.I}`,H=`/${l.f}/${l.H}`,M=`/${l.fb}`,P=`/${l.fb}/${l.c}`,Q=`/${l.fb}/${l.I}`,G=`/${l.fb}/${l.H}`,U=`/${l.Z}`,v=`/${l.e}`,F=`/${l.e}/${l.I}`,y=`/${l.ib}`,V=`/${l.ib}/${l.c}`,w=`/${l.ib}/${l.I}`,X=`/${l.ib}/${l.H}`,W=`/${l.v}`,Y=`/${l.v}/${l.c}`,K=`/${l.v}/${l.D}`,k=`/${l.v}/${l.I}`,q=`/${l.v}/${l.H}`,x=`/${l.O}`,z=`/${l.O}/${l.c}`,Z=`/${l.O}/${l.I}`,J=`/${l.O}/${l.H}`,j=`/${l.o}`,nn=`/${l.o}/${l.c}`,un=`/${l.o}/${l.I}`,tn=`/${l.o}/${l.H}`,ln=`/${l.q}`,rn=`/${l.q}/${l.c}`,en=`/${l.q}/${l.I}`,on=`/${l.q}/${l.H}`,_n=`/${l.E}`,Sn=`/${l.E}/${l.c}`,An=`/${l.E}/${l.I}`,cn=`/${l.E}/${l.H}`,an=`/${l.R}`,dn=`/${l.A}`,En=`/${l.A}/${l.c}`,bn=`/${l.A}/${l.I}`,fn=`/${l.A}/${l.H}`,$n=`/${l.z}`,In=`/${l.z}/${l.c}`,sn=`/${l.z}/${l.I}`,Tn=`/${l.z}/${l.H}`,Dn=`/${l.U}`,Bn=`/${l.T}`,Ln=`/${l.V}`,On=`/${l.P}`,Nn=`/${l.P}/${l.c}`,mn=`/${l.P}/${l.I}`,Rn=`/${l.P}/${l.H}`,Cn=`/${l.pb}`,pn=`/${l.pb}/${l.H}`,gn=`/${l.mb}`,hn=`/${l.mb}/${l.c}`,Hn=`/${l.mb}/${l.I}`,Mn=`/${l.mb}/${l.H}`,Pn=`/${l.t}`,Qn=`/${l.t}/${l.c}`,Gn=`/${l.t}/${l.I}`,Un=`/${l.t}/${l.H}`,vn=`/${l.W}`,Fn=`/${l.W}/${l.c}`,yn=`/${l.W}/${l.I}`,Vn=`/${l.W}/${l.H}`,wn=`/${l.S}`,Xn=`/${l.S}/${l.H}`,Wn=`/${l.K}`,Yn=`/${l.K}/${l.c}`,Kn=`/${l.K}/${l.I}`,kn=`/${l.K}/${l.H}`,qn=`/${l.B}`,xn=`/${l.nb}`,zn=`/${l.X}`,Zn=`/${l.a}`,Jn=`/${l.C}`,jn=`/${l.kb}`,nu=`/${l.kb}/${l.c}`,uu=`/${l.kb}/${l.I}`,tu=`/${l.kb}/${l.H}`,lu=`/${l.bb}`,ru=`/${l.bb}/${l.c}`,eu=`/${l.bb}/${l.I}`,ou=`/${l.bb}/${l.H}`,_u=`/${l.hb}`,iu=`/${l.hb}/${l.g}`,Su=`/${l.h}`,Au=`/${l.db}`,cu=`/${l.x}`,au=`/${l.x}/${l.c}`,du=`/${l.x}/${l.I}`,Eu=`/${l.x}/${l.H}`,bu=`/${l.ab}`,fu=`/${l.ab}/${l.c}`,$u=`/${l.ab}/${l.I}`,Iu=`/${l.ab}/${l.H}`,su=`/${l.G}`,Tu=`/${l.G}/${l.c}`,Du=`/${l.G}/${l.I}`,Bu=`/${l.G}/${l.H}`,Lu=`/${l.M}`,Ou=`/${l.M}/${l.I}`,Nu=`/${l.M}/${l.H}`,mu=`/${l.db}/${l.gb}`,Ru=`/${l.db}/${l.cb}`,Cu=`/${l.jb}`,pu=`/${l.jb}/${l.c}`,gu=`/${l.jb}/${l.I}`,hu=`/${l.jb}/${l.H}`,Hu=`/${l.lb}`,Mu=`/${l.lb}/${l.c}`,Pu=`/${l.lb}/${l.I}`,Qu=`/${l.S}/${l.H}`}}]);