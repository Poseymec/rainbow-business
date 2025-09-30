import {defineStore} from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Array<{ id: number; name: string; price: number }>,
