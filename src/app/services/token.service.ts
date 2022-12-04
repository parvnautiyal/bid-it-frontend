import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  user = new BehaviorSubject<boolean>(false);

  constructor() { }

  save(key: string, value: string) {
    sessionStorage.removeItem(key);
    sessionStorage.setItem(key, value);
  }

  setAccessToken(token: string) {
    this.save('accessToken', token);
  }

  getAccessToken() {
    return sessionStorage.getItem('accessToken');
  }

  setRefreshToken(token: string) {
    this.save('refreshToken', token);
  }

  getRefreshToken() {
    return sessionStorage.getItem('refreshToken');
  }

  setUser(userId: string, username: string) {
    let user = {
      'userId': userId,
      'username': username
    }
    this.user.next(true);
    this.save('user', JSON.stringify(user));
  }

  getUser() {
    let user: {
      userId: string,
      username: string
    } = JSON.parse(sessionStorage.getItem('user'));
    return user;
  }

  clearSession() {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('user');
    this.user.next(false);
  }
}
