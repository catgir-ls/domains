/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Types
import { Color } from "@types";

// Logger Class
class Logger {
  public static getTime = (): string => new Date().toLocaleTimeString().split(" ")[0];

  public static log = (str: string): void =>
    console.log(`${Color.TEXT_COLOR}catgir.ls >.< ${Color.RESET}| ${Color.SUCCESS}${this.getTime()} ${Color.RESET}| ${str}`);

  public static warn = (str: string): void =>
    console.log(`${Color.TEXT_COLOR}catgir.ls >.< ${Color.RESET}| ${Color.WARN}${this.getTime()} ${Color.RESET}| ${str}`);

  public static error = (str: string): void =>
    console.log(`${Color.TEXT_COLOR}catgir.ls >.< ${Color.RESET}| ${Color.ERROR}${this.getTime()} ${Color.RESET}| ${str}`);
}

export default Logger;