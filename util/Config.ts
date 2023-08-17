/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Dependencies
import { parse } from "@deps";

// Types
import type { Obj, Ret } from "@types";

// Config Class
class Config {
  private static config: Obj | null = null;

  public static load = async (path: string): Promise<void> => {
    this.config = parse(await Deno.readTextFile(path));
  };

  public static get = <T>(key?: string, value?: string): T | Ret => {
    if(!this.config || !key || (!key && !value))
      return this.config;

    let keys: string[] = key.split("."),
      _value: Ret = this.config[keys[0]];

    if(!value)
      return _value;

    if(keys.length === 1)
      return _value[value];

    keys = keys.slice(1);

    for(const entry of keys) {
      if(!_value[entry])
        throw `Unable to find ${entry}`;

      _value = _value[entry];
    }

    return <T>_value[value];
  }
}

export default Config;