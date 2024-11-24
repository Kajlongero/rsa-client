export const fetchPublicKey = async () => {
  try {
    const res = await fetch("http://localhost:3000/docs/public-key", {
      method: "GET",
    });

    const key = await res.text();

    return key;
  } catch (error) {
    console.log(error);
  }
};
