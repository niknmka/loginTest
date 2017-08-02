import { Helper } from '../helpers/helper'
import { LoginPage } from "../fixtures/loginPage"


export class Context {
    public helper: Helper = new Helper()
    public loginPage: LoginPage = new LoginPage()
}