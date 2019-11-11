import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { photoReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { PhotoEffects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ 'photo': photoReducer }),
    EffectsModule.forRoot([PhotoEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
