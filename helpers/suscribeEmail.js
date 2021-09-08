export const suscribeEmail = async (email) => {
  const res = await fetch("/api/subscribe", {
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const result = await res.json();

  console.log(result);
};
