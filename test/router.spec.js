import {
  renderView,
  setRootEl,
  setRoutes,
  navigateTo,
  queryStringToObject
} from "../src/router.js";

describe('router', ()=>{
  describe('setRootEl', ()=>{
    it('assigns and returns the html root element', ()=>{
      const elementDom = document.createElement("div")
      const setElement = setRootEl(elementDom)
      expect(setElement).toEqual(elementDom)
    })
  })
  describe('setRoutes', ()=>{
    it("assigns and returns the routes object", ()=>{
      const ROUTES = {
        "/": () => document.createElement("div"),
        "/error": () =>document.createElement("p")
      }
      const settedroutes = setRoutes(ROUTES)
      expect(settedroutes).toEqual(ROUTES)
    })
  })
  describe("renderView", ()=>{
    it("returns the error view if the pathname wasn't found", ()=>{
      const elementDom = document.createElement("div")
      setRootEl(elementDom) 
      const ROUTES = {
        "/": () => document.createElement("div"),
        "/error": () => document.createElement('p')
      }
      setRoutes(ROUTES)
      renderView('/none')
      expect(elementDom.querySelector('p')).toBeTruthy()
    })
    it("returns the correct view for the pathname", ()=>{
      const elementDom = document.createElement("div")
      setRootEl(elementDom) 
      const ROUTES = {
        "/": () => document.createElement("div"),
        "/error": () => document.createElement('p')
      }
      setRoutes(ROUTES)
      renderView('/')
      expect(elementDom.querySelector('div')).toBeTruthy()
    })
  })
  describe("navigateTo", ()=>{
    it("sends you to the correct path and renders the correct view",()=>{
      const elementDom = document.createElement("div")
      setRootEl(elementDom) 
      const ROUTES = {
        "/": () => document.createElement("div"),
        "/error": () => document.createElement('p')
      }
      setRoutes(ROUTES)
      const pathname = "/"
      navigateTo(pathname)
      expect(elementDom.querySelector('div')).toBeTruthy()
    })
  })
  describe("queryStringToObject",()=>{
    it("should return an object when a queryString is given", ()=>{
      const queryString = "?id=Platon&gender=male"
      const queryObject = queryStringToObject(queryString)
      expect(queryObject).toEqual({id:"Platon", gender:"male"})
    })
  })
})