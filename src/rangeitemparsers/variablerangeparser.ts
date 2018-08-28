namespace MathExpressionLzg {
    export class VariableRangeParser extends RangeItemParser {

        constructor() {
            super();
        }

        canParse(rangeItem: RangeItem): boolean {
            if(rangeItem.str.length==0) return false;
            for (let i = 0; i < rangeItem.str.length; i++) {
                let c = rangeItem.str.charCodeAt(i);
                if(c>=65&&c<=90||c>=97&&c<=122){

                }else if(c>=48&&c<=57){
                    if(i==0) return false;
                }else{
                    if(c==95) return false;
                    return false;
                }
            }
            return true;
        }

        parseRangeItem(rangeItem: RangeItem): ExpressionNode {
            return new VariableNode(rangeItem.str);
        }

    }
}