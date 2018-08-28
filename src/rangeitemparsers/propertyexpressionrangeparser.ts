namespace MathExpressionLzg {
    export class PropertyExpressionRangeParser extends RangeItemParser {

        expParser:ExpressionParser;

        constructor(expParser:ExpressionParser) {
            super();
            this.expParser = expParser;
        }

        canParse(rangeItem: RangeItem): boolean {
            if(rangeItem.str.length==0) return false;
            let c = rangeItem.str.charCodeAt(0);
            if(c>=65&&c<=90||c>=97&&c<=122){
                return true;
            }
            return false;
        }

        private splitExpression(exp:string):Array<PropertyPathNode> {
            let propPathlist:Array<string> = [];
            let pos = 0;
            let roundbrackets = 0;
            let squarebrackets = 0;
            let doublequote = 0;
            let singlequote = 0;

            for (let i = 0; i < exp.length; i++) {
                let c = exp.charAt(i);

                if(c=='('){
                    roundbrackets+=1;
                }else if(c==')'){
                    roundbrackets-=1;
                }else if(c=='['){
                    squarebrackets+=1;
                }else if(c==']'){
                    squarebrackets-=1;
                }else if(c=='"'){
                    if(doublequote==1) doublequote=0;
                    else doublequote=1;
                }else if(c=="'"){
                    if(singlequote==1) singlequote=0;
                    else singlequote=1;
                }

                if(roundbrackets==0&&squarebrackets==0&&singlequote==0&&doublequote==0){
                    if(c=='.'){
                        propPathlist.push(exp.substr(pos,i-pos));
                        pos = i+1;
                    }
                }
            }
            if(pos<exp.length){
                propPathlist.push(exp.substr(pos));
            }

            let result:Array<PropertyPathNode> = [];
            for (let proppath of propPathlist) {
                let propertyPathNodes = this.splitBracketsExpression(proppath);
                for (let node of propertyPathNodes) {
                    result.push(node);
                }
            }

            return result;
        }

        private splitBracketsExpression(exp:string):Array<PropertyPathNode> {
            let result:Array<PropertyPathNode> = [];

            let pos = 0;
            let roundbrackets = 0;
            let squarebrackets = 0;
            let doublequote = 0;
            let singlequote = 0;

            for (let i = 0; i < exp.length; i++) {
                let c = exp.charAt(i);

                if(c=='('){
                    roundbrackets+=1;
                }else if(c==')'){
                    roundbrackets-=1;
                }else if(c=='['){
                    squarebrackets+=1;
                }else if(c==']'){
                    squarebrackets-=1;
                }else if(c=='"'){
                    if(doublequote==1) doublequote=0;
                    else doublequote=1;
                }else if(c=="'"){
                    if(singlequote==1) singlequote=0;
                    else singlequote=1;
                }

                if(!(singlequote==0&&doublequote==0)) continue;

                if(pos==0){
                    if(c=='['){
                        pos = i+1;
                        result.push(
                            new PropertyPathNode(PropertyPathNodeMode.property)
                                .setPropName(exp.substr(0,i))
                        );
                        continue;
                    }else if(c=='('){
                        pos = i+1;
                        result.push(
                            new PropertyPathNode(PropertyPathNodeMode.property)
                                .setPropName(exp.substr(0,i))
                        );
                        continue;
                    }
                    continue;
                }

                if(roundbrackets==1&&squarebrackets==0&&c == '('){
                    pos = i+1;
                }else if(roundbrackets==0&&squarebrackets==0&&c==')'){
                    let paramsStr = exp.substr(pos,i-pos);
                    let argumentNodes = this.parseParameters(paramsStr);
                    result.push(
                        new PropertyPathNode(PropertyPathNodeMode.function)
                            .setArgumentNode(argumentNodes)
                    );
                }else if(roundbrackets==0&&squarebrackets==1&&c == '['){
                    pos = i+1;
                }else if(roundbrackets==0&&squarebrackets==0&&c==']'){
                    let indexStr = exp.substr(pos,i-pos);
                    let indexExpNode = this.expParser.parseExpression(indexStr);
                    result.push(
                        new PropertyPathNode(PropertyPathNodeMode.index)
                            .setIndexExpressionNode(indexExpNode)
                    );
                }
            }
            if(pos==0)
                result.push(
                    new PropertyPathNode(PropertyPathNodeMode.property)
                        .setPropName(exp)
                );
            return result;
        }

        private parseParameters(paramsStr: string):Array<ExpressionNode> {
            let result:Array<ExpressionNode> = [];
            let paramExpList:Array<string> = [];

            let pos = 0;
            let roundbrackets = 0;
            let squarebrackets = 0;
            let doublequote = 0;
            let singlequote = 0;

            for (let i = 0; i < paramsStr.length; i++) {
                let c = paramsStr.charAt(i);

                if(c=='('){
                    roundbrackets+=1;
                }else if(c==')'){
                    roundbrackets-=1;
                }else if(c=='['){
                    squarebrackets+=1;
                }else if(c==']'){
                    squarebrackets-=1;
                }else if(c=='"'){
                    if(doublequote==1) doublequote=0;
                    else doublequote=1;
                }else if(c=="'"){
                    if(singlequote==1) singlequote=0;
                    else singlequote=1;
                }

                if(!(singlequote==0&&doublequote==0)) continue;
                if(c==','){
                    paramExpList.push(paramsStr.substr(pos,i));
                    pos = i+1;
                }

            }
            if(pos<paramsStr.length){
                paramExpList.push(paramsStr.substr(pos));
            }

            for (let paramExpStr of paramExpList) {
                let paramNode = this.expParser.parseExpression(paramExpStr);
                result.push(paramNode);
            }

            return result;

        }

        parseRangeItem(rangeItem: RangeItem): ExpressionNode {
            return new PropertyExpressionNode(this.splitExpression(rangeItem.str));
        }

    }
}