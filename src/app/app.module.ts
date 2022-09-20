import { PhotoAttributionComponent } from './photo-attribution/photo-attribution.component';
import { GamesComponent } from './games/games.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScheduleComponent } from './schedule/schedule.component';
import { TeamsComponent } from './teams/teams.component';
import { HttpClientModule } from '@angular/common/http';
import { ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamsComponent,
    PlayersComponent,
    ScheduleComponent,
    GamesComponent,
    PhotoAttributionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AdminModule
  ],
  providers: [
    ScreenTrackingService,UserTrackingService,
    { provide: BUCKET, useValue: environment.firebase.storageBucket }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
