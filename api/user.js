// import { BASE_PATH } from "../helpers/constats";

// export const registerApi = async (formData) => {
//   try {
//     const url = `${BASE_PATH}/auth/local/register`;
//     const params = {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     };
//     const response = await fetch(url, params);
//     const result = await response.json();
//     return result;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

// export const loginApi = async (identifier, password) => {
//   try {
//     console.log({ identifier, password });
//     const url = `${BASE_PATH}/auth/local`;
//     const params = {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({ identifier, password }),
//     };
//     const response = await fetch(url, params);
//     const result = await response.json();
//     return result;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };
