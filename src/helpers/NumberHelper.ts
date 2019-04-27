export class NumberHelper {
    public static IsNumber(value: string): boolean {
        return !/[^-\.\d]/.test(value);
    }
}