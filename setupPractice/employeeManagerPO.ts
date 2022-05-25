import {
    Builder,
    By,
    Capabilities,
    until,
    WebDriver,
    WebElement,
  } from "selenium-webdriver";
  const chromedriver = require("chromedriver");
  
  // this is standard "boilerplate" code.
  //const driver: WebDriver = new Builder()
    //.withCapabilities(Capabilities.chrome())
    //.build();

export class emPage {
    driver: WebDriver; 
    url: string = 'https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html'
    header: By = By.css('.titleText')
      addEmployee: By = By.css('[name=addEmployee]')
      newEmployee: By = By.css('[name=employee11]')
      nameInput: By = By.css('[name="nameEntry"]')
      phoneInput: By = By.css('[name="phoneEntry"]')
      titleInput: By = By.css('[name="titleEntry"]')
      saveBtn: By = By.xpath('//button[@id="saveBtn"]')
      constructor(driver: WebDriver, url: string){
        this.driver = driver
        this.url = url
    }
    async navigate() {
        await this.driver.get(this.url)
        await this.driver.wait(until.elementLocated(this.header))
    }

    async createEmployee(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.addEmployee));
        return (await this.driver.findElement(this.addEmployee)).click();
    }

    async selectEmployeeByName(name: string): Promise<void> {
        await this.driver.wait(
          until.elementLocated(By.xpath(`//li[text()='${name}']`))
        );
        await this.driver.findElement(By.xpath(`//li[text()='${name}']`)).click();
        await this.waitForEmployeeToLoad(name);
        return;
      }

      async waitForEmployeeToLoad(name: string): Promise<void> {
        await this.driver.wait(until.elementLocated(By.id("employeeTitle")));
        let title = await this.driver.findElement(By.id("employeeTitle"));
        await this.driver.wait(until.elementTextIs(title, name));
        return;
      }

      async editEmployee(employeeInformation: EmployeeEdit): Promise<void> {
        await this.driver.wait(until.elementLocated(this.nameInput));
        if (employeeInformation.name) {
          await this.driver.findElement(this.nameInput).clear();
          await this.driver
            .findElement(this.nameInput)
            .sendKeys(employeeInformation.name);
        }
        if (employeeInformation.phone) {
          await this.driver.findElement(this.phoneInput).clear();
          await this.driver
            .findElement(this.phoneInput)
            .sendKeys(employeeInformation.phone);
        }
        if (employeeInformation.title) {
          await this.driver.findElement(this.titleInput).clear();
          await this.driver
            .findElement(this.titleInput)
            .sendKeys(employeeInformation.title);
        }
        return;
      }

      async saveChanges(): Promise<void> {
        return (await this.driver.findElement(this.saveBtn)).click();
      }

      async getEmployeeInfo(): Promise<Employee> {
        await this.driver.wait(until.elementLocated(this.nameInput));
        let name = await (
          await this.driver.findElement(this.nameInput)
        ).getAttribute("value");
        let phone = await (
          await this.driver.findElement(this.phoneInput)
        ).getAttribute("value");
        let title = await (
          await this.driver.findElement(this.titleInput)
        ).getAttribute("value");
        let id = parseInt(
          await (
            await (await this.driver.findElement(By.id("employeeID"))).getText()
          ).slice(4),
          10
        );
        return { name, phone, title, id };
      }
    
    /*
    async getElement(elementBy: By): Promise<WebElement> {
        await this.driver.wait(until.elementLocated(elementBy))
        let element = await this.driver.findElement(elementBy)
        await this.driver.wait(until.elementIsVisible(element))
       return element
    }

    async setInput(elementBy: By, keys: any): Promise<void> {
        let input = await this.getElement(elementBy)
        await input.clear()
        return input.sendKeys(keys);
    }

    async sendKeys(elementBy: By, keys) {
        await this.driver.wait(until.elementLocated(elementBy))
        return driver.findElement(elementBy).sendKeys(keys)
    }
    */

    /*
    async createEmployee() {
        return this.setInput(this.addEmployee, '\n')
    }

    async newbieEmployee() {
        return this.setInput(this.newEmployee, '\n')
    }

    async namingInput() {
        return this.setInput(this.nameInput, '\n')
    }
    
    async phoningInput() {
        return this.setInput(this.phoneInput, '\n')
    }

    async titlingInput() {
        return this.setInput(this.titleInput, '\n')
    }

    async saveInput(elementBy: By) {
        return this.setInput(this.saveBtn, '\n')
    }
    */



    //async doSearch(searchTerm: string) {
        //return this.setInput(this.searchBar, `${searchTerm}\n`)
    //}

    //async getText(elementBy: By) {
        //await this.driver.wait(until.elementLocated(elementBy))
        //return this.driver.findElement(elementBy).getText()
    //}

    //async getResults() {
        //return this.getText(this.results)
    //}
}

interface Employee {
    name: string;
    phone: string;
    title: string;
    id: number;
  }
  
  interface EmployeeEdit {
    /** the new value for the employee name */
    name?: string;
    /** the new value for the employee phone number */
    phone?: string;
    /** the new value for the employee title */
    title?: string;
  }