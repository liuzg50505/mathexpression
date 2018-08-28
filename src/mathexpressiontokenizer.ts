namespace MathExpressionLzg {


    export class MathExpressionTokenizer extends Tokenizer{

        splitExpression(exp:string):Array<RangeItem> {
            let result:Array<RangeItem> = [];

            let prev:string = null;
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
                    if(c=='&'&&prev=='&'){
                        result.push(new RangeItem(i-1,i,"&&"));
                        pos = i+1;
                    }else if(c=='|'&&prev=='|'){
                        result.push(new RangeItem(i-1,i,"||"));
                        pos = i+1;
                    }else if(c=='+'||c=='-'||c=='*'||c=='/'||c=='%'){
                        result.push(new RangeItem(pos,i-1,exp.substr(pos,i-pos)));
                        result.push(new RangeItem(i,i,exp.substr(i,1)));
                        pos = i+1;
                    }
                }
                prev = c;
            }
            if(pos<exp.length){
                result.push(new RangeItem(pos,exp.length-1,exp.substr(pos)));
            }

            for (let range of result) {
                if(range.str[0]=='('&&range.str[range.str.length-1]==')'){
                    let subranges = this.splitExpression(range.str.substr(1,range.str.length-2));
                    if(subranges.length==1) continue;
                    range.subRanges = subranges;
                }
            }

            return result;
        }



        tokenize(exp: string): Array<RangeItem> {
            return this.splitExpression(exp);
        }

    }

}