class TokenProvider {

  private tokenName = "tokenCookie";
  _token = "";
  
  private getCookie(name: string) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  private setCookie(name: string, value: any, options: any = {}): void {
    options = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }

  private deleteCookie(name: string): void {
    this.setCookie(name, "", {
      'max-age': -1
    })
  }

  constructor() {
    const cookieToken = this.getCookie(this.tokenName)
    if (cookieToken) {
      this._token = cookieToken;
    }
  }

  get token(): string | undefined {
    if (this._token) return this._token;
  }

  set token(newTokenValue: string) {
    this._token = newTokenValue;
    this.deleteCookie(this.tokenName);
    this.setCookie(this.tokenName, newTokenValue)
  }

  clearToken() {
    this._token = "";
    this.deleteCookie(this.tokenName);
  }
}

export const tokenProvider = new TokenProvider();
