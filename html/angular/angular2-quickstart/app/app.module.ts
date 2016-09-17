import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

//So we're making a web app, so our root module (that's this file) needs to use the browser module. web app -> browser module. yeah.
@NgModule({
	
	imports: [BrowserModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})
//this is the class that is being inserted into main.ts
export class AppModule {}

