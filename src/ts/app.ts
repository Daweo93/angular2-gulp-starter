import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common'

@Component({
    selector: 'my-app',
    template: `
        <h1>Hello, {{ name }}</h1>
    `
})
class AppComponent {   
    public name = "You";
}
bootstrap(AppComponent);