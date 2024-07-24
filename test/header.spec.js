import { header} from "../src/components/header.js";
import {setRoutes, setRootEl} from "../src/router.js";

describe("header component", ()=>{
  it("should return almost all the elemnts in header", ()=>{
    const headerComponent = header()
    expect(headerComponent.querySelector("img")).toBeTruthy()
    expect(headerComponent.querySelector("h1")).toBeTruthy()
    expect(headerComponent.querySelector("button")).toBeTruthy()
    expect(headerComponent.querySelectorAll("div")).toBeTruthy
  })
  it("should navigate to groupchat when clicking the button", ()=>{
    const elementDom = document.createElement("div")
    setRootEl(elementDom) 
    const headerComponent = header()
    const grpChatBttn = headerComponent.querySelector("#groupChat")
    const ROUTES = {
      "/": () => document.createElement("div"),
      "/chatGrupal": () => document.createElement('p'),
    }
    setRoutes(ROUTES)
    grpChatBttn.click()
    expect(elementDom.querySelector('p')).toBeTruthy()
  })
  it("should navigate to apikey when clicking the button", ()=>{
    const elementDom = document.createElement("div")
    setRootEl(elementDom) 
    const headerComponent = header()
    const apiKeyButton = headerComponent.querySelector("#APIKey")
    const ROUTES = {
      "/": () => document.createElement("div"),
      "/apiKey": () => document.createElement("h3")
    }
    setRoutes(ROUTES)
    apiKeyButton.click()
    expect(elementDom.querySelector('h3')).toBeTruthy()
  })
  it("should navigate to home when clicking the logo", ()=>{
    const elementDom = document.createElement("div")
    setRootEl(elementDom) 
    const headerComponent = header()
    const logoImage = headerComponent.querySelector("#logo")
    const ROUTES = {
      "/": () => document.createElement("div"),
    }
    setRoutes(ROUTES)
    logoImage.click()
    expect(elementDom.querySelector('div')).toBeTruthy()
  })
})