export class ProcessHelper {
  public static ParseArguments(): string[] {
    let [,, ...args] = process.argv;

    if (args.length === 1) {
      return args[0].split(',');
    }

    return args;
  }
}
