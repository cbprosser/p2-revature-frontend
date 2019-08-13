import axios from 'axios';
import { environment } from '../environment';

export const tdClient = axios.create({
    baseURL: environment.context,
    withCredentials: true
});