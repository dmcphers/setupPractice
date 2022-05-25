import { emPage } from "./employeeManagerPO";
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";
const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

const page = new emPage(driver, "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html")

describe("Employee Manager Test", () => {
    test("create a new employee", async () => {
      await page.navigate();
      await page.createEmployee();
      await page.selectEmployeeByName("New Employee");
      await page.editEmployee({
        name: "test person",
        phone: "1234567890",
        title: "test result",
      });
      await page.saveChanges();
      await page.selectEmployeeByName("Dollie Berry");
      await page.selectEmployeeByName("test person");
      let employee = await page.getEmployeeInfo();
      expect(employee.name).toEqual("test person");
      expect(employee.phone).toEqual("1234567890");
      expect(employee.title).toEqual("test result");
      await driver.sleep(10000);
    })

    test("can edit an existing employee", async () => {
      await page.selectEmployeeByName("Bernice Ortiz");
      await page.editEmployee({ title: "Grand Poobah" });
      await page.saveChanges();
      await page.selectEmployeeByName("Phillip Weaver");
      await page.selectEmployeeByName("Bernice Ortiz");
      let employee = await page.getEmployeeInfo();
      expect(employee).toEqual({
        id: 1,
        name: "Bernice Ortiz",
        phone: "4824931093",
        title: "Grand Poobah",
      });
      await driver.sleep(10000);
    });

    afterAll(async () => {
      await driver.quit();
    })
})