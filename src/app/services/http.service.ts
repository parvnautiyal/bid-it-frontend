import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Product} from "../models/product";
import {User} from "../models/user";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  registerUser(user: User) {
    return this.http.post(environment.AUTH + '/register', user, { observe: "response" });
  }

  login(username: string, password: string) {
    let credentials = {
      'username': username,
      'password': password
    };
    return this.http.post(environment.AUTH + '/login', credentials, { observe: "response" });
  }

  getNewAccessToken() {
    const token = this.tokenService.getRefreshToken();
    return this.http.post(environment.AUTH + '/token', { 'refreshToken': token }, {
      observe: "response"
    });
  }

  addAuction(product: Product) {
    let userId = this.tokenService.getUser().userId;
    return this.http.post(environment.USER + '/add-product', product, {
      observe: "response",
      params: new HttpParams().append('id', userId)
    });
  }

  getProducts() {
    return this.http.get<Product[]>(environment.USER + '/products', { observe: "response" });
  }

  getProduct(id: string) {
    return this.http.get<Product>(environment.USER + '/product/' + id, { observe: "response" });
  }

  addBid(json: {
    productId: string,
    userId: string,
    amount: string
  }) {
    return this.http.post(environment.USER + '/add-bid', json, { observe: "response" });
  }

  getCurrentPrice(id: string) {
    return this.http.get<number>(environment.USER + '/get-current', {
      observe: "response",
      params: new HttpParams().append('productId', id)
    });
  }

  finishAuction(id: string) {
    return this.http.get(environment.USER + '/finish', {
      observe: "response",
      responseType: "text",
      params: new HttpParams().append('productId', id)
    })
  }
}
