/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Utils
import { Config, Logger, Webhook } from "@util";

// Lib
import { Cloudflare, DNS } from "@lib";

// Data
import Redis from "@redis";

// Types
import type { RedisConnectOptions } from "@types";

// Config
const config = Deno.env.get("CONFIG") ?? (
  Deno.env.get("ENVIRONMENT") === "development"
    ? "config.dev.toml"
    : "config.toml"
);

await Config.load(config);

Logger.log(`Loaded ${Object.keys(Config.get()).length} item(s) into the config!`);

// Redis
if(!await Redis.init(Config.get<RedisConnectOptions>("redis"))) {
  Logger.error("Unable to connect to the Redis instance - please check credentials!");

  Deno.exit();
}

Logger.log("Succesfully connected to Redis!");

// Variables
const cloudflare = new Cloudflare(
  Config.get<string>("cloudflare", "api_key")
);

const webhook = new Webhook(
  Config.get<string>("webhook", "url"),
  Config.get<string>("webhook", "message_id")
);

const domains = [
  ...Config.get("domains"),
  ...await cloudflare.getDomains()
].sort((a, b) => b.length - a.length);

Logger.log(`Checking ${domains.length} ${domains.length === 1 ? "domain" : "domains"}!`);

const result = await Promise.all(domains.map(DNS.isValidMX));
const status = Object.fromEntries(domains.map((domain: string, i: number) => [ domain, result[i] ]));

Logger.log(`${Object.keys(status).filter((key: string) => !!status[key]).length}/${Object.keys(status).length} domains are valid!`);

webhook.update(status);

if(await Redis.set("domains", JSON.stringify(status)) !== "OK") {
  Logger.error("Unable to cache domains - Redis returned non-OK response!");

  Deno.exit();
}

Logger.log("Succesfully cached domains!");