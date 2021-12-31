import { get } from '../utils/request';

export function loadBanners() {
    return get('/banner');
}


export function loadRemdList() {
    return get('/personalized?limit=6');
}