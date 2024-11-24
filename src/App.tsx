import React from "react";
import { fetchPublicKey } from "./utils/fetchPublicKey";
import { importPublicKey } from "./utils/importKey";
import { encryptFile, encryptText } from "./utils/encondings";
import { postDataEncrypted } from "./utils/postEncrypted";

function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const input = inputRef.current as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", async (event) => {
        console.log("Load finished", event);

        const publicKey = await fetchPublicKey();
        const cryptoKey = await importPublicKey(publicKey as string);

        const encryptedFiles = await encryptFile(
          reader.result as ArrayBuffer,
          cryptoKey
        );
        const sendFile = await postDataEncrypted(encryptedFiles, {
          filename: file.name,
        });
      });

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center mx-auto">
      <h3>Archivo protegido por encriptacion</h3>

      <form className="mt-4" onSubmit={handleSubmit}>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Sube tu archivo
        </label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          ref={inputRef}
        />
        <div className="w-full mt-8">
          <button type="submit" className="w-full bg-[#3a3a3a]">
            Subir archivo
          </button>
        </div>
      </form>
    </main>
  );
}

export default App;
