(window["webpackJsonpfinance-react"]=window["webpackJsonpfinance-react"]||[]).push([[0],{101:function(e,t,n){e.exports=n(132)},106:function(e,t,n){},132:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(9),o=n.n(i),c=(n(106),n(35)),u=n(59),l=n(13),s=n(33),p=n(183),m=n(184),d=n(185),f=n(61),E=n(182),g=n(91),b=n(5),h=n(87),y=n.n(h),O=n(88),v=n.n(O),w=n(60),j=n.n(w),P=n(197),D=n(181),x=n(186),k=n(72),C=n.n(k),T=n(133),M=n(179),N=n(180),S=n(84),A=n.n(S),R=n(85),B=n.n(R),G=function(e,t){e.history.push("/"+t)},U=Object(c.f)(function(e){return r.a.createElement("div",null,r.a.createElement(T.a,{button:!0,onClick:function(){return G(e,"groups")}},r.a.createElement(M.a,null,r.a.createElement(A.a,null)),r.a.createElement(N.a,{primary:"Agrupamentos"})),r.a.createElement(T.a,{button:!0,onClick:function(){return G(e,"relatorios")}},r.a.createElement(M.a,null,r.a.createElement(B.a,null)),r.a.createElement(N.a,{primary:"Relat\xf3rios"})))});function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function W(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(n,!0).forEach(function(t){Object(l.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var z=function(e,t){e({anchorEl:null,isMenuExpanded:t})},F=function(e,t){t({isMenuExpanded:!1}),e.toogleNavigation(!1)},I=Object(s.b)(function(e){return W({},e.navigation)},function(e){return{toogleNavigation:function(t){return e(function(e){return{type:"TOOGLE_MENU",isMenuExpanded:e}}(t))}}})(Object(b.a)(function(e){return{toolbar:{paddingRight:24},toolbarIcon:W({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),appBar:{zIndex:e.zIndex.drawer+1},menuButton:{marginLeft:10,marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:190,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerPaperClose:Object(l.a)({overflowX:"hidden",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),width:7*e.spacing.unit},e.breakpoints.up("sm"),{width:9*e.spacing.unit})}})(function(e){var t=Object(a.useState)({anchorEl:e.anchorEl,isMenuExpanded:e.isMenuExpanded}),n=Object(u.a)(t,2),i=n[0],o=n[1];i.isMenuExpanded!==e.isMenuExpanded&&o({isMenuExpanded:e.isMenuExpanded,anchorEl:e.anchorEl});var c=i.anchorEl,l=i.isMenuExpanded,s=e.classes,b=r.a.createElement(g.a,{anchorEl:c,anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},open:Boolean(c),onClose:function(){return z(o,e.isMenuExpanded)}},r.a.createElement(E.a,{onClick:function(){return z(o,e.isMenuExpanded)}},"Minha conta"),r.a.createElement(E.a,{onClick:function(){return z(o,e.isMenuExpanded)}},"Sair"));return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{position:"absolute",className:s.appBar},r.a.createElement(m.a,{className:s.toolbar},r.a.createElement(d.a,{color:"inherit","aria-label":"Open drawer",onClick:function(){return function(e,t){t({isMenuExpanded:!0}),e.toogleNavigation(!0)}(e,o)},className:j()(s.menuButton,l&&s.menuButtonHidden)},"  ",r.a.createElement(y.a,null)),r.a.createElement(d.a,{color:"inherit","aria-label":"Close drawer",onClick:function(){return F(e,o)},className:j()(s.menuButton,!l&&s.menuButtonHidden)},r.a.createElement(C.a,null)),r.a.createElement(f.a,{className:s.title,variant:"h6",color:"inherit",noWrap:!0},"Financeiro"),r.a.createElement(d.a,{"aria-owns":l?"material-appbar":void 0,"aria-haspopup":"true",onClick:function(t){return function(e,t,n){t({anchorEl:e.currentTarget,isMenuExpanded:n})}(t,o,e.isMenuExpanded)},color:"inherit"},r.a.createElement(v.a,null)))),b,r.a.createElement(P.a,{variant:"permanent",classes:{paper:j()(s.drawerPaper,!i.isMenuExpanded&&s.drawerPaperClose)},open:l},r.a.createElement("div",{className:s.toolbarIcon},r.a.createElement(d.a,{onClick:function(){return F(e,o)}},r.a.createElement(C.a,null))),r.a.createElement(x.a,null),r.a.createElement(D.a,null,r.a.createElement(U,null))))})),L=n(188),q=n(192),H=n(191),J=n(189),X=n(190),V=n(137),$=n(187),K=n(89),Q=n.n(K);var Y=Object(s.b)(function(e){return{items:e.group.items}})(Object(c.f)(Object(b.a)(function(e){var t;return{root:{width:"100%",overflowX:"auto"},table:{minWidth:700},tableRow:{cursor:"pointer"},fab:(t={},Object(l.a)(t,e.breakpoints.down("sm"),{position:"absolute",bottom:2*e.spacing.unit,right:2*e.spacing.unit}),Object(l.a)(t,e.breakpoints.up("sm"),{margin:2*e.spacing.unit,float:"right"}),t)}})(function(e){var t=e.classes;return r.a.createElement(r.a.Fragment,null,r.a.createElement($.a,{color:"primary","aria-label":"Add",className:t.fab,onClick:function(){return G(e,"groups/new")}},r.a.createElement(Q.a,null)),r.a.createElement(f.a,{variant:"h4",gutterBottom:!0,component:"h2"},"Agrupamentos"),r.a.createElement(V.a,{className:t.root},r.a.createElement(L.a,{className:t.table},r.a.createElement(J.a,null,r.a.createElement(X.a,null,r.a.createElement(H.a,null,"Nome"),r.a.createElement(H.a,{align:"right"},"Prioridade"),r.a.createElement(H.a,{align:"right"},"Tipo"))),r.a.createElement(q.a,null,e.items.map(function(n){return r.a.createElement(X.a,{className:t.tableRow,key:n.uuid,onClick:function(){return G(e,"groups/edit/".concat(n.uuid))}},r.a.createElement(H.a,{component:"th",scope:"row"},n.name),r.a.createElement(H.a,{align:"right"},n.priority),r.a.createElement(H.a,{align:"right"},n.categoryType))})))))}))),Z=n(50),ee=n.n(Z),te=n(193),ne=n(194),ae=n(198),re=n(201),ie=n(90),oe=n.n(ie),ce=n(195);function ue(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function le(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ue(n,!0).forEach(function(t){Object(l.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ue(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var se=function(e,t,n,a,r){e.preventDefault(),n.uuid?t.update(n):t.add(n),ee.a.success("Group saved!!"),a?r({uuid:0,priority:1,name:"",categoryType:1}):t.history.push("/groups")},pe=Object(s.b)(function(e){return{items:e.group.items}},function(e){return{update:function(t){return e({type:"UPDATE_GROUP",item:t})},add:function(t){return e({type:"ADD_GROUP",item:t})},deleteGroup:function(t){return e(function(e){return{type:"DELETE_GROUP",uuid:e}}(t))}}})(Object(c.f)(oe()(function(e){return{form:{maxWidth:"350px",marginTop:e.spacing.unit},button:{marginTop:3*e.spacing.unit,marginRight:e.spacing.unit}}})(function(e){var t=e.classes,n={uuid:0,priority:1,name:"",categoryType:2},i=parseInt(e.match.params.uuid);if(i){var o=e.items.find(function(e){return e.uuid===i});o?n=o:i=null}var c=Object(a.useState)(le({},n)),l=Object(u.a)(c,2),s=l[0],p=l[1];n.uuid!==s.uuid&&p(le({},n));var m=n.uuid&&0!==n.uuid?r.a.createElement(te.a,{type:"button",variant:"contained",color:"secondary",size:"small",className:t.button,onClick:function(t){return function(e,t){e.deleteGroup(t),ee.a.success("Group deleted!!"),e.history.push("/groups")}(e,s.uuid)}},"Excluir"):r.a.createElement(te.a,{type:"button",variant:"contained",size:"small",className:t.button,onClick:function(t){return se(t,e,s,!0,p)}},"Salvar e novo");return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"text"),r.a.createElement(f.a,{component:"h1",variant:"h5"},"Agrupamento"),r.a.createElement("form",{className:t.form,onSubmit:function(t){return se(t,e,s,!1,p)}},r.a.createElement("input",{type:"hidden",name:"id",value:s.uuid}),r.a.createElement(ne.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(re.a,{htmlFor:"email"},"Nome"),r.a.createElement(ae.a,{id:"name",name:"name",autoFocus:!0,value:s.name,onChange:function(e){return p(le({},s,{name:e.target.value}))}})),r.a.createElement(ne.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(re.a,{htmlFor:"priority"},"Prioridade"),r.a.createElement(ae.a,{name:"priority",type:"number",step:"1",id:"priority",value:s.priority,onChange:function(e){return p(le({},s,{priority:e.target.value}))}})),r.a.createElement(ne.a,{margin:"normal",required:!0,fullWidth:!0},r.a.createElement(re.a,{htmlFor:"categoryType"},"Tipo"),r.a.createElement(ce.a,{value:s.categoryType,onChange:function(e){return p(le({},s,{categoryType:e.target.value}))},inputProps:{name:"categoryType",id:"categoryType"}},r.a.createElement(E.a,{value:1},"Cr\xe9dito"),r.a.createElement(E.a,{value:2},"D\xe9bito"),r.a.createElement(E.a,{value:3},"Tranfer\xeancia de cr\xe9dito"),r.a.createElement(E.a,{value:4},"Tranfer\xeancia de d\xe9bito"))),r.a.createElement(te.a,{type:"submit",variant:"contained",color:"primary",size:"small",className:t.button},"Salvar"),m,r.a.createElement(te.a,{type:"button",variant:"contained",size:"small",className:t.button,onClick:function(){return function(e){e.history.push("/groups")}(e)}},"Voltar")))}))),me=n(200),de=function(e){return{root:{display:"flex"},content:{flexGrow:1,padding:3*e.spacing.unit,height:"100vh",overflow:"auto"},appBarSpacer:e.mixins.toolbar}},fe=Object(b.a)(de)(function(e){var t=e.classes;return r.a.createElement("div",{className:t.root},r.a.createElement(me.a,null),r.a.createElement(I,null),r.a.createElement("main",{className:t.content},r.a.createElement("div",{className:t.appBarSpacer}),r.a.createElement("div",{className:[de.MainContainer,"container"].join(" ")},r.a.createElement(c.c,null,r.a.createElement(c.a,{path:"/groups/new",component:pe}),r.a.createElement(c.a,{path:"/groups/edit/:uuid",exact:!0,component:pe}),r.a.createElement(c.a,{path:"/groups",exact:!0,render:function(){return r.a.createElement(Y,null)}}),r.a.createElement(c.a,{exact:!0,path:"/",render:function(){return r.a.createElement(Y,null)}})))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ee=n(43),ge=n(44),be=n(19);function he(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function ye(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?he(n,!0).forEach(function(t){Object(l.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):he(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Oe={products:[{id:1,price:13.5,name:"keyboard",description:"A keyboard full of keys",creationDate:Date()},{id:2,price:7.75,name:"mouse",description:"A mouse with three buttons",creationDate:Date()},{id:3,price:700,name:"laptop",description:"A laptop with screen and a keyboard",creationDate:Date()},{id:4,price:150,name:"monitor",description:"A widescreen monitor",creationDate:Date()},{id:5,price:120.99,name:"desk",description:"A big desk",creationDate:Date()}]},ve=function(e){return 0===e.products.length?0:Math.max.apply(Math,e.products.map(function(e){return e.id}))},we=function(e,t){return{products:[].concat(Object(be.a)(e.products),[ye({},t.product,{id:ve(e)+1,creationDate:Date()})])}},je=function(e,t){return{products:e.products.map(function(e){return e.id===t.product.id?ye({},t.product,{creationDate:e.creationDate}):e})}},Pe=function(e,t){return{products:e.products.filter(function(e){return t.id!==e.id})}},De=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_PRODUCT":return we(e,t);case"UPDATE_PRODUCT":return je(e,t);case"DELETE_PRODUCT":return Pe(e,t);default:return e}};function xe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function ke(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?xe(n,!0).forEach(function(t){Object(l.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):xe(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var Ce={items:[{uuid:1,priority:1,name:"keyboard",type:1},{uuid:2,priority:2,name:"keyb222oard",type:2}]},Te=function(e,t){return{items:[].concat(Object(be.a)(e.items),[ke({},t.item,{uuid:1e4*(new Date).getTime()+621355968e9})])}},Me=function(e,t){return{items:e.items.map(function(e){return e.uuid===t.item.uuid?ke({},t.item):e})}},Ne=function(e,t){return{items:e.items.filter(function(e){return t.uuid!==e.uuid})}},Se=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ce,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_GROUP":return Te(e,t);case"UPDATE_GROUP":return Me(e,t);case"DELETE_GROUP":return Ne(e,t);default:return e}},Ae={anchorEl:null,isMenuExpanded:window.innerWidth>600},Re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TOOGLE_MENU":return{anchorEl:null,isMenuExpanded:t.isMenuExpanded};default:return e}},Be=Object(ge.b)({product:De,group:Se,navigation:Re}),Ge=Object(ge.c)(Be);ee.a.options={hideDuration:300,timeOut:1200,positionClass:"toast-top-full-width"},o.a.render(r.a.createElement(s.a,{store:Ge},r.a.createElement(Ee.a,null,r.a.createElement(fe,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[101,1,2]]]);
//# sourceMappingURL=main.45707389.chunk.js.map