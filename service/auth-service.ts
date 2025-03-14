import { API } from './api';

export class AuthService {
  public async sendCode(phone: string) {
    try {
      return await API.post('/auth-user/send-sms', {
        phone,
      });
    } catch (e) {
      console.log('e: ', e);
    }
  }

  public async verifyCode(phone: string, code: string) {
    try {
      return await API.post('/auth-user/validate-code', {
        phone,
        code,
      });
    } catch (e) {
      console.log('e: ', e);
    }
  }
}
