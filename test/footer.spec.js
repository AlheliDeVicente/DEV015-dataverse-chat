import { footer} from "../src/components/footer.js";
describe("footer component", ()=>{
  it("should verify that there are elements in the footer", ()=>{
    const footerComponent = footer()
    expect(footerComponent.querySelector("p")).toBeTruthy
  })
})