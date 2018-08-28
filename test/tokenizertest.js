
describe('tokenizerTest', function () {
    it('MathTokenizer.splitExpression',function () {
        var MathExpressionLzg=require("../dist/output");

        let tokenizer = new MathExpressionLzg.MathExpressionTokenizer();
        let r = tokenizer.splitExpression("a+y445*5/(sdf%33)");
        console.log(r);
    });

    it('MathExpressionParser.parseExpression',function () {
        var MathExpressionLzg=require("../dist/output");

        let parser = new MathExpressionLzg.MathExpressionParser();
        var node = parser.parseExpression("a+y445*5/(sdf%33)+34");

        console.log(node);
    });




});