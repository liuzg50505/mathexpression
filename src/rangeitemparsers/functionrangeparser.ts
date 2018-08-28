namespace MathExpressionLzg {
    export class FunctionRangeParser extends RangeItemParser {

        expParser:ExpressionParser;

        constructor(expParser:ExpressionParser) {
            super();
            this.expParser = expParser;
        }

        canParse(rangeItem: RangeItem): boolean {
            let idx1 = rangeItem.str.indexOf("(");
            let idx2 = rangeItem.str.lastIndexOf(")");
            return idx1 > 0 && idx2 == rangeItem.str.length - 1;
        }

        parseRangeItem(rangeItem: RangeItem): ExpressionNode {
            let idx1 = rangeItem.str.indexOf("(");
            let idx2 = rangeItem.str.lastIndexOf(")");
            let funcName = rangeItem.str.substr(0,idx1);
            let funcNode = new FunctionNode(funcName);

            let roundbrackets = 0;
            let squarebrackets = 0;
            let doublequote = 0;
            let singlequote = 0;

            let pos = idx1+1;

            for (let i = idx1+1; i < idx2; i++) {
                let c = rangeItem.str.charAt(i);

                if (c == '(') {
                    roundbrackets += 1;
                } else if (c == ')') {
                    roundbrackets -= 1;
                } else if (c == '[') {
                    squarebrackets += 1;
                } else if (c == ']') {
                    squarebrackets -= 1;
                } else if (c == '"') {
                    if (doublequote == 1) doublequote = 0;
                    else doublequote = 1;
                } else if (c == "'") {
                    if (singlequote == 1) singlequote = 0;
                    else singlequote = 1;
                }

                if (roundbrackets == 0 && squarebrackets == 0 && singlequote == 0 && doublequote == 0) {
                    if (c == ',') {
                        let argNode = this.expParser.parseExpression(rangeItem.str.substr(pos,i-pos));
                        funcNode.arguments.push(argNode);
                        pos = i+1;
                    }
                }
            }
            if(pos<idx2){
                let argNode = this.expParser.parseExpression(rangeItem.str.substr(pos,idx2-pos));
                funcNode.arguments.push(argNode);
            }
            return funcNode;
        }

    }
}