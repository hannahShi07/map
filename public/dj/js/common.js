/*
* 门户网站公共js
* */
function addMeta(name,content){//手动添加mate标签
    var meta = document.createElement('meta');
    meta.content=content;
    meta.name=name;
    document.getElementsByTagName('head')[0].appendChild(meta);
}
addMeta('description','濉溪智慧党建服务平台是智侒信信息技术有限公司依托“互联网+”理念，打造集党建宣传、党员教育、党务工作、党建管理为一体的智慧化平台。智信软件产品助力党建工作创新发展。')
addMeta('keywords','党建信息平台，智慧党建，党建APP，互联网+党建，党建平台，党建网站，非公党建平台，濉溪党建平台，智信党建平台，肥西党建平台')