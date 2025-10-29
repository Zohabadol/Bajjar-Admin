 
import Cookies from 'js-cookie'; 
import { Toastify } from '../../components/toastify';
/* Set token */
export const setToken = async (token) => {
    Cookies.set('bajjar-admin', token, { expires: 7, path: '/' }); 
    return true;
};

/* Get token */
export const getToken = () => {
    if (typeof window !== 'undefined') {
        return Cookies.get('bajjar-admin'); 
    }
};

/* Remove token */
export const removeToken = () => {
    Cookies.remove('bajjar-admin');
    return true;
};


/* Phone number valid check */
export const isValidPhone = () => {
    const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/i;
    return regex;
};

/* E-mail valid check */
export const isValidEmail = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex;
};

/* Global network error handeller */
export const networkErrorHandeller = (error) => {
   

    if (
        (error ||
        error.response ||
        error.response.data ||
        error.response.data.errors) 
    ) {
    // return Toastify.Error(error.response.data.message ||error.response.data.error[0]);
    return Toastify.Error(error.response.data.error[0]);
    // alert("dddd")
    
    
    } else {
        return Toastify.Error("Something going wrong, Try again.");
    }
};


