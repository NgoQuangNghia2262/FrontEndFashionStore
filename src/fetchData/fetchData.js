export async function fetchData(coursAPI, data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(coursAPI, data);
      const result = await response.json();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
