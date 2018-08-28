namespace MathExpressionLzg {

    export class DictDataContext extends DataContext{

        private datadict:{[key:string] : any};

        constructor() {
            super();
            this.datadict = {};
        }

        registVariable(varName:string, value:any) {
            this.datadict[varName] = value;
        }

        getValue(name: string): any {
            return this.datadict[name];
        }

    }
}