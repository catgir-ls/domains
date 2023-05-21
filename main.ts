/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Utils
import { Config, Webhook } from "@util";

// Lib
import { Cloudflare, DNS } from "@lib";

// Config
await Config.load(Deno.env.get("CONFIG") ?? "config.toml");

// Variables
const cloudflare = new Cloudflare(
  Config.get("cloudflare", "api_key")
);

const webhook = new Webhook(
  Config.get("webhook", "url"),
  Config.get("webhook", "message_id")
)

const main = async () => {
  const domains = [
    ...Config.get("domains"),
    ...await cloudflare.getDomains()
  ].sort((a, b) => b.length - a.length);

  const result = await Promise.all(domains.map(DNS.isValidMX));
  const status = Object.fromEntries(domains.map((domain: string, i: number) => [ domain, result[i] ]));

  webhook.update(status);
}

main();