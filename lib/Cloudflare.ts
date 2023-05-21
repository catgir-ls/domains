/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 */

// Constants
const BASE_URL = "https://api.cloudflare.com/client/v4";

// Types
import type { PartialCloudflareZone } from "../types/mod.ts";

// Cloudflare Class
class Cloudflare {
  private readonly headers: Record<string, string>;

  constructor(api_key: string) {
    this.headers = {
      "Authorization": `Bearer ${api_key}`,
      "Accept": "application/json"
    }
  }

  // TODO: Add support for multiple pages, currently only supports 50 domains
  public getDomains = async (): Promise<string[]> => {
    const response = await fetch(`${BASE_URL}/zones?per_page=50`, {
      headers: this.headers
    }), body = await response.json();

    // TODO: Error handling
    if(!body.success || !!body.errors.length)
      return body;

    return body.result
      .filter((result: PartialCloudflareZone) => result.status === "active")
      .map((result: PartialCloudflareZone) => result.name);
  }
}


export default Cloudflare;
