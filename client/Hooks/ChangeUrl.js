
import { useState } from "react";
import CryptoJS, { AES, enc } from "crypto-js";



function decrypt(ciphertext, key) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}



const useChangeUrl = () => {

  const Encoding = (text) => {
    
    const encrypted = CryptoJS.AES.encrypt(text, "testkey").toString()


    return encrypted.toString(CryptoJS.enc.Hex);
  };

  const Decoding = (text) => {
    if (!text) {
      console.error("Decoding: Input text is undefined");
      return ""; // 또는 다른 기본값을 반환할 수 있음
    } 


    const decryptedText = decrypt(CryptoJS.enc.Hex.parse(text), "testkey");
    return decryptedText.toString(CryptoJS.enc.Utf8);
  };

  return { Encoding, Decoding };
};

export default useChangeUrl;
