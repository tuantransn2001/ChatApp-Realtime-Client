import axios from "axios";
import { API_STUFF } from "../ts/enums/api_enums";
class RestFullAPIRequest {
  public static URL: string = API_STUFF.default_URL;
  public static token: string = API_STUFF.default_URL;

  public static async createInstance(access_token: string | null) {
    return await axios.create({
      baseURL: RestFullAPIRequest.URL,
      headers: {
        "Content-Type": "application/json",
        "Acess-Control-Allow-Origin": "*",
        token: access_token,
        Accept: "application/json",
      },
    });
  }
}

export default RestFullAPIRequest;
