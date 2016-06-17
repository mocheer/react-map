import assign from 'object-assign';
//工具装载
export default class Utility{
    // static loadAnimateCss(){
    //      $.fn.extend({
    //         animateCss: function (animationName,callback) {
    //             var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    //             $(this).addClass('animated ' + animationName).one(animationEnd, function() {
    //                 $(this).removeClass('animated ' + animationName);
    //                 if(callback){
    //                     callback();
    //                 }
    //             });
    //         }
    //     });
    // }
    static loadExtend(){
        Number.prototype.toPercent = function(){
	        return (Math.round(this * 10000)/100).toFixed(2) + '%';
        }
        //Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，
        //以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
        if(Object.assign===undefined){
            Object.prototype.assign = assign;
        } 
    }
}