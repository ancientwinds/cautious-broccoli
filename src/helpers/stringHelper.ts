export class StringHelper {
  public static RemoveSpecificTrailingCharacters(stringToEvaluate: string, charactersToRemove: string): string {
    if (stringToEvaluate.endsWith(charactersToRemove)) {
        stringToEvaluate = stringToEvaluate.slice(0, charactersToRemove.length * -1);
    }

    return stringToEvaluate;
  }
}
