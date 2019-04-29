export class ProcessHelper {
  public static ParseArguments(): string[] {
    const [,, ...args] = process.argv;

    if (args.length === 1) {
      return args[0].split(',');
    }

    return args.join(' ').split(',');
  }
}
