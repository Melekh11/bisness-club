export class BaseAPI {
  public prefixUrl: string = "http://localhost:1502";

  constructor(servicePrefix: string) {
    this.prefixUrl += servicePrefix;
  }

  async handleErrors(response: Response) {
    if (!response.ok) {
      const resp = await response.json();
      throw Error(resp.detail);
    }
    return await response.json();
  }
}