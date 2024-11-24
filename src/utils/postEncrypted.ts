export const postDataEncrypted = async (
  encrypted: unknown,
  fileInfo: Record<string, unknown>
) => {
  try {
    const res = await fetch("http://localhost:3000/docs/upload", {
      method: "POST",
      body: JSON.stringify({
        info: {
          ...fileInfo,
        },
        data: encrypted,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};
