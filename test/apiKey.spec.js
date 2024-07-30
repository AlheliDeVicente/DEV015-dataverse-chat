import { getApiKey, setApiKey } from "../src/lib/apikey.js"
describe ('getApiKey', ()=>{
  it('should return the apiKey Value', ()=>{
    localStorage.setItem('prueba', 'thisIsATest')
    const apiValue = getApiKey()
    expect(apiValue).toEqual('thisIsATest')
  })
})
describe('setApiKey', ()=>{
  it('should set correctly the apiKey', ()=>{
    setApiKey('this is a test')
    const settedApi = localStorage.getItem('apiKey')
    expect(settedApi).toEqual('this is a test')
  })
})