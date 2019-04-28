export class DateTimeHelper {
  public static GetLocalTimeForOffset(offsetInHours: number): number {
    const currentOffsetInMiliseconds: number = new Date().getTimezoneOffset() * 60 * 1000;
    const offsetInMiliseconds: number = offsetInHours * 60 * 60 * 1000;

    return Date.now() + currentOffsetInMiliseconds + offsetInMiliseconds;
  }

  public static FormatDateTime(epochDateTime: number): string {
    return new Date(epochDateTime).toISOString().slice(0, 16).replace('T', ' ');
  }
}
