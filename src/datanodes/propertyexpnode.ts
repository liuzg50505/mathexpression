namespace MathExpressionLzg {

    export enum PropertyPathNodeMode {
        property,
        index,
        function
    }

    export class PropertyPathNode {
        mode:PropertyPathNodeMode;
        propName:string;
        indexExpressionNode:ExpressionNode;
        argumentNodes:Array<ExpressionNode>;

        constructor(mode:PropertyPathNodeMode) {
            this.mode = mode;
            this.argumentNodes = [];
        }

        setArgumentNode(argumentNodes:Array<ExpressionNode>):PropertyPathNode {
            this.argumentNodes = argumentNodes;
            return this;
        }

        addArgumentNode(argumentNode:ExpressionNode):PropertyPathNode {
            if(this.argumentNodes==null) this.argumentNodes = [];
            this.argumentNodes.push(argumentNode);
            return this;
        }

        setPropName(propName:string):PropertyPathNode {
            this.propName = propName;
            return this;
        }

        setIndexExpressionNode(indexExpressionNode:ExpressionNode): PropertyPathNode{
            this.indexExpressionNode = indexExpressionNode;
            return this;
        }
    }

    export class PropertyExpressionNode extends ExpressionNode{

        propertyPathNodes: Array<PropertyPathNode>;

        constructor(propertyPathNodes: Array<MathExpressionLzg.PropertyPathNode>=[]) {
            super();
            this.propertyPathNodes = propertyPathNodes;
        }

        evaluate(context: DataContext): any {
            if(this.propertyPathNodes.length==0) return context.getValue(null);
            let firstNode = this.propertyPathNodes[0];
            let curvalue = context.getValue(firstNode.propName);
            for (let i=1; i<this.propertyPathNodes.length;i++) {
                let propPathNode = this.propertyPathNodes[i];
                if(propPathNode.propName!=null){
                    curvalue = curvalue[propPathNode.propName];
                    if(curvalue==null) return null;
                }else if(propPathNode.indexExpressionNode!=null){
                    let indexExpNode = propPathNode.indexExpressionNode;
                    let v = indexExpNode.evaluate(context);
                    if(v==null) return null;
                    curvalue = curvalue[v];
                    if(curvalue==null) return null;
                }else{
                    let func = <Function>curvalue;
                    let arr:Array<any> = [];
                    for (let argNode of propPathNode.argumentNodes) {
                        let v = argNode.evaluate(context);
                        arr.push(v);
                    }
                    curvalue = func.apply(this,arr);
                    if(curvalue==null) return null;
                }
            }

            return curvalue;
        }

    }

}