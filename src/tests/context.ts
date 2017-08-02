import { Helper } from '../helpers/helper'


export class Context {
    public helper: Helper
    constructor(){
        this.helper            = new Helper()
    }
}