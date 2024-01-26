
import { useState } from "react";
import CryptoJS, { AES, enc } from "crypto-js";

const base64Encode = (str) => {
    return unescape(encodeURIComponent(str))
};

const base64Decode = (str) => {
  return decodeURIComponent(escape(atob(str)));
};




const useChangeUrl = () => {

  const Encoding = (text) => {
    
    const encrypted = CryptoJS.AES.encrypt(text, "testkey").toString()

    return encodeURIComponent(encrypted)
  };

  const Decoding = (text) => {
    const decodeUrl = decodeURIComponent(text)

    const decrypted = CryptoJS.AES.decrypt(decodeUrl,"testkey").toString(CryptoJS.enc.Utf8)

    return decrypted;
  };

  return { Encoding, Decoding };
};

export default useChangeUrl;
