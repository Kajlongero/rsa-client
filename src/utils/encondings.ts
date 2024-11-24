export const encryptText = async (data: string, publicKey: CryptoKey) => {
  const encodedData = new TextEncoder().encode(data);
  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encodedData
  );
  return window.btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
};

export const encryptFile = async (file: ArrayBuffer, publicKey: CryptoKey) => {
  let blocks;

  function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  if (file.byteLength <= 128) {
    blocks = [file];
  } else {
    blocks = [];

    for (let i = 0; i < file.byteLength; i += 128) {
      blocks.push(file.slice(i, i + 128));
    }
  }

  const encryptedBlocks = [];

  for (const block of blocks) {
    try {
      const encrypted = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        block
      );
      encryptedBlocks.push(arrayBufferToBase64(encrypted));
    } catch (error) {
      console.error(`Error encriptando bloque: ${error}`);
    }
  }

  console.log(encryptedBlocks);

  return encryptedBlocks;
};
