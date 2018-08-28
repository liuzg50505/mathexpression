namespace MathExpressionLzg {

    export function getDefaultExpressionParser() {
        let tokenizer = new MathExpressionTokenizer();
        let parser = new MathExpressionParser();
        parser.tokenizer = tokenizer;
        parser.addRangeItemParser(new ConstantRangeParser());
        // parser.addRangeItemParser(new VariableRangeParser());
        // parser.addRangeItemParser(new FunctionRangeParser(parser));
        parser.addRangeItemParser(new PropertyExpressionRangeParser(parser)); //这个包含了各种属性，各种函数，各种表达式

        return parser;
    }

}