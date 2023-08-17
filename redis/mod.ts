/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Dependencies
import { connect } from "@deps";

// Types
import {
  RedisConnectOptions, 
  IRedis, 
  RedisValue, 
  SetOpts, 
  SimpleString,
  SetWithModeOpts,
  BulkNil ,
  Bulk
} from "@types";

// Redis Class
class Redis {
  public static conn: IRedis | null = null;

  public static init = async (opts: RedisConnectOptions): Promise<boolean> => {
    if(this.conn)
      return true;

    try {
      this.conn = await connect(opts);

      return true;
    } catch {
      return false;
    }
  }

  public static set = (
    key: string,
    value: RedisValue,
    opts?: SetOpts | SetWithModeOpts
  ): Promise<SimpleString | BulkNil> => {
    if(!this.conn)
      throw "Redis is not initialized";

    // @ts-ignore Deno LSP being silly
    return <SimpleString | BulkNil>this.conn.set(key, value, opts);
  }

  public static get = (key: string): Promise<Bulk> => {
    if(!this.conn)
      throw "Redis is not initialized";

    // @ts-ignore Deno LSP being silly
    return <Bulk>this.conn.get(key);
  }
}

export default Redis;