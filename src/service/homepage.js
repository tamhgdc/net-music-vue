import { get } from '../utils/request';

export const loadHomePageAPI = () => get('/homepage/block/page')

export const loadHomeDragBarAPI = () => get('/homepage/dragon/ball')