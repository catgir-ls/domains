/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@catgir.ls>
 * 
 * TODO: Implement checking via HTTP request, as well as MX
 */

// Utils
import { Config } from "@util";

// DNS Class
class DNS {
  public static isValidMX = async (domain: string) => {
    const { exchange, preference } = Config.get("mx");

    const mx = await Deno.resolveDns(domain, "MX", {
      nameServer: { ipAddr: Config.get("nameserver"), port: 53 }
    });

    for(const record of mx) {
      if(record.preference === preference && record.exchange === exchange)
        continue;

      return false;
    }

    return true;
  }
}

export default DNS;