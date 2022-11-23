const API_URL = 'https://api.json-generator.com/templates/ZM1r0eic3XEy/data';
const token = 'wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu'
export function getJobs():Promise<Job[]> {
  return fetch(API_URL + `?access_token=${token}`).then((response) => {
    if (!response.ok) {
      return Promise.reject(`${response.status} -- ${response.statusText}`);
    }

    if (!response.headers.get('content-type')?.includes('application/json')) {
      return Promise.reject('Not JSON');
    }

    return response.json();
  });
}
