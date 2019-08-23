import axios from 'axios';
import { environment } from '../environment';

export const tdClient = axios.create({
    baseURL: "http://td-api.us-east-1.elasticbeanstalk.com",
   // baseURL: environment.context,
    withCredentials: true
});