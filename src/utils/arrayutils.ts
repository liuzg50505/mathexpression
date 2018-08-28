namespace MathExpressionLzg {

    export function subArray<T>(array: T[], startIndex:number, length:number):T[] {
        if(array==null) return null;
        let result:T[] = [];
        for (let i = startIndex; i < array.length && i < startIndex + length; i++) {
            result.push(array[i]);
        }
        return result;
    }

}