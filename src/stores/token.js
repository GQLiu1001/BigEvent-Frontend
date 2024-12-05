// token.js
import { defineStore } from "pinia";
import { ref } from 'vue';

export const useTokenStore = defineStore('token', () => {
    const token = ref('');
    const setToken = (newToken) => {
        token.value = newToken;
        console.log("Token set in store:", token.value); // 调试输出
    };
    const removeToken = () => {
        token.value = '';
    };
    return {
        token, setToken, removeToken
    };

},
//参数持久化 刷新不会丢失
    {
        persist:true
    }
);
