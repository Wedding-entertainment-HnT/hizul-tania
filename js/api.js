/* api.js — pengganti google.script.run agar halaman di GitHub bisa bicara dengan Apps Script */
(function(){
'use strict';
var noop=function(){};
function url(){var u=(window.CONFIG||{}).apiUrl||'';return /^https:\/\/script\.google\.com\//.test(u)?u:''}
function post(fn,args){
  var u=url();
  if(!u)return Promise.reject(new Error('apiUrl belum diisi di config.js'));
  return fetch(u,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({fn:fn,args:args}),redirect:'follow'})
    .then(function(r){return r.json()});
}
function get(params){
  var u=url();
  if(!u)return Promise.reject(new Error('apiUrl belum diisi di config.js'));
  var qs=Object.keys(params).map(function(k){return k+'='+encodeURIComponent(params[k])}).join('\u0026');
  return fetch(u+(u.indexOf('?')<0?'?':'\u0026')+qs,{redirect:'follow'}).then(function(r){return r.json()});
}
function runner(ok,fail){
  return new Proxy({},{get:function(_,name){
    if(name==='withSuccessHandler')return function(f){return runner(f,fail)};
    if(name==='withFailureHandler')return function(f){return runner(ok,f)};
    return function(){
      post(name,[].slice.call(arguments)).then(function(r){(ok||noop)(r)},function(e){(fail||noop)(e)});
    };
  }});
}
window.google={script:{run:runner()}};
window.API={post:post,get:get};
})();
