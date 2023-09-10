import axios from 'axios';

export const adminBaseUrl = axios.create({
  baseURL: 'https://codelevel.co/Lms/api/admin',
});

export const studentBaseUrl = axios.create({
  baseURL: 'https://codelevel.co/Lms/api/student',
});

export const teacherBaseUrl = axios.create({
  baseURL: 'https://codelevel.co/Lms/api/teacher',
});

export const parentsBaseUrl = axios.create({
  baseURL: 'https://codelevel.co/Lms/api/parents',
});


export const baseUrl = 'https://edu.kyanlabs.com/edu/api/'

export const userData = 'https://edu.kyanlabs.com/edu/api/getUserData'
