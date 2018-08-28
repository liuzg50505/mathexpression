namespace MathExpressionLzg {

    export class MathExpressionParser extends ExpressionParser {

        tokenizer:Tokenizer;
        rangeItemParsers:Array<RangeItemParser>;

        constructor() {
            super();
            this.tokenizer = new MathExpressionTokenizer();
            this.rangeItemParsers = [];
        }

        addRangeItemParser(rangeParser:RangeItemParser): void{
            this.rangeItemParsers.push(rangeParser);
        }

        private parseNode(range:RangeItem):ExpressionNode {
            if(range.subRanges.length>0) {
                return this.tokenizeAddLevelRanges(range.subRanges);
            }
            for (let rangeParser of this.rangeItemParsers) {
                if(rangeParser.canParse(range)){
                    return rangeParser.parseRangeItem(range);
                }
            }
            return new UnknownExpressionNode(range);
        }

        private buildNodeTree(nodes:Array<ExpressionNode>) : ExpressionNode{
            if(nodes.length==1) return nodes[0];

            let opNode = <OperationNode>nodes[nodes.length-2];
            let another = this.buildNodeTree(subArray(nodes,0,nodes.length-2));
            opNode.arguments.push(another);
            opNode.arguments.push(nodes[nodes.length-1]);


            return opNode;
        }

        private tokenizeMultiplyLevelRanges(ranges:Array<RangeItem>):ExpressionNode {
            let nodes:Array<ExpressionNode> = [];
            let pos = 0;
            for (let i = 0; i < ranges.length; i++) {
                let range = ranges[i];
                if(range.str=="*"||range.str=="/"||range.str=="%"){
                    let node = this.parseNode(ranges[i-1]);
                    nodes.push(node);
                    let operatorNode:OperationNode = null;
                    if(range.str=="*") {
                        operatorNode = new MultiplyNode();
                    }else if(range.str=="/"){
                        operatorNode = new DivideNode();
                    }else if(range.str=="%"){
                        operatorNode = new ModNode();
                    }
                    nodes.push(operatorNode);
                    pos = i+1;
                }
            }
            if(pos<ranges.length) {
                let node = this.parseNode(ranges[pos]);
                nodes.push(node);
            }

            return this.buildNodeTree(nodes);

        }

        private tokenizeAddLevelRanges(ranges:Array<RangeItem>) : ExpressionNode {
            let nodes:Array<ExpressionNode> = [];
            let pos = 0;

            for (let i = 0; i < ranges.length; i++) {
                let range = ranges[i];
                if(range.str=="+"||range.str=="-"){
                    if(i-pos>1) {
                        let node = this.tokenizeMultiplyLevelRanges(subArray(ranges,pos,i-pos));
                        nodes.push(node);
                    }else{
                        let node = this.parseNode(ranges[i-1]);
                        nodes.push(node);
                    }
                    let operatorNode:OperationNode = null;
                    if(range.str=="+") {
                        operatorNode = new AddNode();
                    }else{
                        operatorNode = new MinusNode();
                    }
                    nodes.push(operatorNode);
                    pos = i+1;
                }
            }
            if(pos<ranges.length) {
                if(ranges.length-1-pos>1) {
                    let node = this.tokenizeMultiplyLevelRanges(subArray(ranges,pos,ranges.length-pos));
                    nodes.push(node);
                }else{
                    let node = this.parseNode(ranges[pos]);
                    nodes.push(node);
                }
            }

            return this.buildNodeTree(nodes);
        }

        parseExpression(exp: string): ExpressionNode {
            let ranges = this.tokenizer.tokenize(exp);
            return this.tokenizeAddLevelRanges(ranges);
        }

        eval(exp: string, dataContext:DataContext|any): any {
            let node = this.parseExpression(exp);
            if(!(dataContext instanceof DataContext)) dataContext = new JsobjectContext(dataContext);
            return node.evaluate(dataContext);
        }
    }

}