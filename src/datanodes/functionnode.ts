namespace MathExpressionLzg {

    export class FunctionNode extends ExpressionNode{

        funcName:string;

        constructor(funcName?: string) {
            super();
            this.funcName = funcName;
        }

        evaluate(context: DataContext): any {
            let func = <Function>context.getValue(this.funcName);
            let arr:Array<any> = [];
            for (let arg of this.arguments) {
                arr.push(arg.evaluate(context));
            }
            return func.apply(this,arr);
        }

    }

}