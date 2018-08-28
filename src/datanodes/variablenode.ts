namespace MathExpressionLzg {

    export class VariableNode extends ExpressionNode{

        variableName:string;

        constructor(variableName: string) {
            super();
            this.variableName = variableName;
        }

        evaluate(context: DataContext): any {
            return context.getValue(this.variableName);
        }

    }

}