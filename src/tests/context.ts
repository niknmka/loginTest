import { Helper } from '../helpers/helper'
import { LoginPage } from "../fixtures/loginPage"
import { RegistrationPage} from "../fixtures/registrationPage"


export class Context {
    public helper: Helper
    public loginPage: LoginPage
    public registrationPage: RegistrationPage

    constructor() {
        this.helper = new Helper()
        this.loginPage = new LoginPage(this)
        this.registrationPage = new RegistrationPage(this)
    }
}