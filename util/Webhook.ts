/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Utils
import { Config } from "@util";

// Constants
const COLOR = 15487934;
const CHUNK_SIZE = 6;

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
      (domain: string) => `> ・ \`${domain}\` ${Config.get("emojis")[Number(!domains[domain])]}`
    );

    const chunked = [
      ...Array(Math.ceil(stringified.length / CHUNK_SIZE))
    ].map((_: string, i: number) => stringified.slice(CHUNK_SIZE * i, CHUNK_SIZE + CHUNK_SIZE * i));
    
    const embeds = [ ];

    for(const chunk of chunked)
      embeds.push({ 
        color: COLOR,
        fields: chunk.map((entry: string) => ({
          name: "\u200b",
          value: entry,
          inline: true
        }
      ))})

    // Append logo to first embed
    embeds[0] = {
      title: "> Domains >.<",
      url: "https://catgir.ls",
      description: `\`\`\`\n  ╱|、\n (˚ˎ 。7   there are \n  |、˜〵      ${Object.keys(domains).length} domains :3   \n  じしˍ,)ノ       \n\`\`\``,
      ...embeds[0]
    }

    // Append timestamp to final embed
    embeds[embeds.length - 1] = {
      timestamp: new Date(),
      ...embeds[embeds.length - 1]
    }

    // TODO: Error handling
    await fetch(`${this.webhook_url}/messages/${this.message_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: null, embeds })
    });
  }
}

export default Webhook;