/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Types

// deno-lint-ignore no-explicit-any
export type Ret = any;
export type Obj = Record<Ret, Ret>;

export type PartialCloudflareZone = {
  id: string,
  name: string,
  status: string
}

// Enums
export enum Color {
  TEXT_COLOR = "\x1b[38;2;160;129;226m",
  SUCCESS = "\x1b[38;2;159;234;121m",
  WARN = "\x1b[38;2;242;223;104m",
  ERROR = "\x1b[38;2;242;106;104m",
  RESET = "\x1b[0m"
}

// External Types
export type {
  RedisConnectOptions, 
  Redis as IRedis, 
  RedisValue, 
  SetOpts,
  SetWithModeOpts,
  SimpleString,
  BulkNil,
  Bulk
} from "https://deno.land/x/redis@v0.31.0/mod.ts";