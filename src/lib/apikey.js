export function getApiKey(){
  const apiKey = localStorage.getItem('apiKey')
  return apiKey
}
 
export function setApiKey(key){
  const apikey = localStorage.setItem('apiKey', key)
  return apikey
}

export function deleteApiKey(){
  localStorage.remove()
}