namespace MathExpressionLzg {

    export class CombinedContext extends DataContext{

        private dataContextList:Array<DataContext>;

        constructor() {
            super();
            this.dataContextList = [];
        }

        addDataContext(dataContext:DataContext):void {
            this.dataContextList.push(dataContext);
        }


        getValue(name: string): any {
            for (let dataContext of this.dataContextList) {
                let v:any = dataContext.getValue(name);
                if(v!=null) return v;
            }
            return null;
        }

    }
}