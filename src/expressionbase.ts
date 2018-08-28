namespace MathExpressionLzg {

    export class RangeItem {
        start:number;
        end:number;
        str:string;
        subRanges:Array<RangeItem>;

        constructor(start: number, end: number, str: string) {
            this.start = start;
            this.end = end;
            this.str = str;
            this.subRanges = [];
        }
    }

    export abstract class DataContext {
        abstract getValue(name:string):any;
    }

    export class UnknownNodeException {
        unknownExpressionNode:UnknownExpressionNode;

        constructor(unknownExpressionNode: MathExpressionLzg.UnknownExpressionNode) {
            this.unknownExpressionNode = unknownExpressionNode;
        }
    }

    export abstract class ExpressionNode {
        arguments:Array<ExpressionNode>;

        constructor() {
            this.arguments = [];
        }

        abstract evaluate(context:DataContext):any;
    }

    export abstract class OperationNode extends ExpressionNode {
        op:string;

        constructor() {
            super();
            this.op = "";
        }
    }

    export class UnknownExpressionNode extends ExpressionNode{
        range:RangeItem;

        constructor(range?: MathExpressionLzg.RangeItem) {
            super();
            this.range = range;
        }

        evaluate(context: DataContext): any {
            throw new UnknownNodeException(this);
        }
    }


    export abstract class RangeItemParser {
        abstract canParse(rangeItem:RangeItem): boolean;
        abstract parseRangeItem(rangeItem:RangeItem): ExpressionNode;
    }

    export abstract class Tokenizer {
        abstract tokenize(exp:string): Array<RangeItem>;
    }

    export abstract class ExpressionParser {

        constructor() {
        }

        abstract eval(exp:string, dataContext:DataContext):any;

        abstract parseExpression(exp:string):ExpressionNode;

    }

}