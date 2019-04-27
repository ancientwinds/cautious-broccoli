export class ArrayHelper {
    public static RemoveDupplicate(array: any[]): any[] {
        return Array.from(new Set(array));
    }
}