//工具装载
export class Utility{
    static loadAnimateCss(){
         $.fn.extend({
            animateCss: function (animationName,callback) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                    $(this).removeClass('animated ' + animationName);
                    if(callback){
                        callback();
                    }
                });
            }
        });
    }
    static loadExtend(){
        Number.prototype.toPercent = function(){
	        return (Math.round(this * 10000)/100).toFixed(2) + '%';
        }
    }
}