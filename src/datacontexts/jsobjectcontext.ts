namespace MathExpressionLzg {

    export class JsobjectContext extends DataContext{

        private jsobject:any;

        constructor(jsobject: any) {
            super();
            this.jsobject = jsobject;
        }

        getValue(name: string): any {
            if(name==""||name==null) return this.jsobject;
            return this.jsobject[name];
        }

    }
}