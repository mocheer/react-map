// set global
export class Global{
    constructor(name) { //构造函数
          this.name = name;
    }
    setGlobals(options){
        var global = typeof window !== "undefined" ? window : this;
        if (!global.document) {
            throw new Error(name + "requires a window with a document");
        }
        for (var key in options) {
            global[key] = options[key];
        }
    }
}
