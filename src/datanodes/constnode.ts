namespace MathExpressionLzg {

    export class ConstValueNode extends ExpressionNode{

        value:any;

        constructor(value?: any) {
            super();
            this.value = value;
        }

        evaluate(context: DataContext): any {
            return this.value;
        }

    }

}