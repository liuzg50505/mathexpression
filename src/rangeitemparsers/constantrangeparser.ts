namespace MathExpressionLzg {
    export class ConstantRangeParser extends RangeItemParser {

        constructor() {
            super();
        }

        canParse(rangeItem: RangeItem): boolean {
            if(rangeItem.str.length==0) return false;
            if(rangeItem.str[0]=='"'&&rangeItem.str[rangeItem.str.length-1]=='"'){
                return true;
            }else if(rangeItem.str[0]=="'"&&rangeItem.str[rangeItem.str.length-1]=="'"){
                return true;
            }else{
                var n = Number(rangeItem.str);
                if (!isNaN(n)) return true;
            }
            return false;
        }

        parseRangeItem(rangeItem: RangeItem): ExpressionNode {
            if(rangeItem.str[0]=='"'&&rangeItem.str[rangeItem.str.length-1]=='"'){
                return new ConstValueNode(rangeItem.str.substr(1,rangeItem.str.length-2));
            }else if(rangeItem.str[0]=="'"&&rangeItem.str[rangeItem.str.length-1]=="'"){
                return new ConstValueNode(rangeItem.str.substr(1,rangeItem.str.length-2));
            }else{
                var n = Number(rangeItem.str);
                return new ConstValueNode(n);
            }
        }

    }
}