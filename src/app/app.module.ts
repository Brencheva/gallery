import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { photoReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { PhotoEffects } from './store/effects';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ 'photo': photoReducer }),
    EffectsModule.forRoot([PhotoEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
