/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Utils
import { Config } from "@util";

// Webhook Class
class Webhook {
  private readonly webhook_url: string;
  private readonly message_id: string;

  constructor(webhook_url: string, message_id: string) {
    this.webhook_url = webhook_url;
    this.message_id = message_id;
  }

  public update = async (domains: Record<string, boolean>) => {
    const stringified = Object.keys(domains).map(
      (domain: string) => `> ${Config.get("emojis")[Number(!domains[domain])]} \`${domain}\``
    ).join("\n");

    // TODO: Error handling
    await fetch(`${this.webhook_url}/messages/${this.message_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: null, embeds: [{
        author: {
          name: "catgir.ls domains",
          icon_url: "https://i.imgur.com/b7icfEk.jpg",
        },
        description: `${stringified}\n\n**Updated** <t:${Math.floor(new Date().getTime() / 1000)}:R>`,
        color: 15487934
      }] })
    });
  }
}

export default Webhook;