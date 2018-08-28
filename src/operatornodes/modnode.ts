namespace MathExpressionLzg {

    export class ModNode extends OperationNode{
        constructor() {
            super();
            this.op = "%";
        }

        evaluate(context: MathExpressionLzg.DataContext): any {
            let arg1 = this.arguments[0];
            let arg2 = this.arguments[1];

            let v1 = arg1.evaluate(context);
            let v2 = arg2.evaluate(context);
            return v1%v2;
        }
    }


}