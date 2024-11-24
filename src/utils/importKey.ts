// Function to convert a binary string to an ArrayBuffer
function str2ab(str: string): Uint8Array {
  const buffer = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    buffer[i] = str.charCodeAt(i);
  }
  return buffer;
}

export const importPublicKey = (key: string) => {
  // Decode the base64-encoded PEM string
  const pem = atob(
    key
      .replace("-----BEGIN PUBLIC KEY-----", "")
      .replace("-----END PUBLIC KEY-----", "")
      .trim()
  );

  const buff = str2ab(pem);

  // Function to convert a binary string to an ArrayBuffer
  function str2ab(str: string) {
    const buffer = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      buffer[i] = str.charCodeAt(i);
    }
    return buffer;
  }

  // Import the public key using the Web Crypto API
  return window.crypto.subtle.importKey(
    "spki", // The format of the key to be imported (SubjectPublicKeyInfo)
    buff, // The public key data
    {
      name: "RSA-OAEP", // The algorithm the imported key will be used with
      hash: "SHA-256", // The hash function to be used with the algorithm
    },
    true, // Whether the key is extractable
    ["encrypt"] // The intended use for the key (encryption in this case)
  );
};
