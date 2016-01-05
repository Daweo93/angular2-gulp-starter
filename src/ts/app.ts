import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common'

class PersonDetails{
    name:string;
    age:number;
    job:string;
    
    constructor(name:string, age:number, job:string) {
        this.name = name;
        this.age = age;
        this.job = job;
    }
}
var personList = [
  new PersonDetails('Ja', 12, 'Front'),
  new PersonDetails('Ty', 22, 'Back'),
  new PersonDetails('On', 0, 'Solution'),
];
@Component({
    selector: 'my-app',
    template: `
        <h1>{{ listTitle }}</h1>

    `
})
class AppComponent {   
    public persons = personList;
    public listTitle = "Person list";
}

bootstrap(AppComponent);