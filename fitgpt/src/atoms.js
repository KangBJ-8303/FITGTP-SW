import { atom } from 'recoil';

export const userEmailState = atom({
  key: 'userEmailState', // 고유한 key 값
  default: null, // 초기 값은 null (로그인 전)
});