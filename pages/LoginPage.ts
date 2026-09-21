import {Locator,Page} from '@playwright/test';

export class LoginPage{

    readonly page:Page;
    readonly username:Locator;
    readonly password:Locator;
    readonly loginButton:Locator;

    constructor(page:Page){

        this.page=page;
        this.username=page.locator("#userEmail");
        this.password=page.locator("#userPassword");
        this.loginButton=page.locator("#login");
    }

    async login(username:string,password:string){

        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}