import { postRequest, getRequest } from "./requests-http.js";

function isNotErrorStatus(res) {
  if (typeof res != "number") {
    console.error('res is is valid')//, res
    return res;
  } else {
    console.error('res is number : is error status :', res)
    return res;
  }
}

export async function getNews(){
  const urlSection='/top-headlines'
  const params = {country:"fr"}
  const result = await getRequest(params, urlSection);
  //console.log("# result", result)
  return isNotErrorStatus(result)
}