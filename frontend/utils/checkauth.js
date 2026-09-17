import { getUrl } from "./getUrl";

export async function checkAuth(){
  const response = await fetch(`${getUrl()}/api/auth/check`, {
    method: "GET",
  });
  console.log(response);
  return response;
  
}