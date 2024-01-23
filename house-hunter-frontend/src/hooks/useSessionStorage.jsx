import { useState } from "react"

const useSessionStorage = () => {
    
    const [ value, setValue ] = useState(null);

    const setItem = (key, value) => {
        sessionStorage.setItem(key, value);
        setValue(value);
    };

    const getItem = (key) => {
        const value = sessionStorage.getItem(key);
        setValue(value);
        return value;
    };

    const removeItem = (key) => {
        sessionStorage.removeItem(key);
        setValue(null);
    };

    return { value, setItem, getItem, removeItem};
}

export default useSessionStorage