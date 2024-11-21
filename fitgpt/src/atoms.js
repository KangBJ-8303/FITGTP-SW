// atoms.js
import { atom } from 'recoil';

export const userEmailState = atom({
  key: 'userEmailState',
  default: null, // 초기 값은 null (로그인 전)
});

export const userWorkoutRecordsState = atom({
  key: 'userWorkoutRecordsState',
  default: [], // 초기 값은 빈 배열
});
