import { Timestamp } from 'firebase/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Game } from './../shared/classes/game';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-players',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  public selectedTeam?: string;
  public varsityGames: Game[] = [];
  public jvGames: Game[] = [];
  public showCompleted: boolean = true;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedTeam = params['team'];
      this.firestore.collection<Game>(`games`,ref => ref.orderBy('date','asc')).valueChanges({idField: 'id'}).subscribe({
        next: (g: Game[]) => {
          this.varsityGames = g.filter((game:Game) => game.varsity===true);
          this.jvGames = g.filter((game:Game) => game.varsity===false);
        }
      })
    });
  }

  // test(){
  //   this.firestore.collection<Game>(`games`).valueChanges({idField: 'id'}).subscribe({
  //     next: (g: Game[]) => {
  //       g.forEach((game:Game)=>{
  //         if(game.year === undefined){
  //           game.complete = false;
  //           game.goals_against = 0;
  //           game.goals_for = 0;
  //           game.tie = false;
  //           game.varsity = true;
  //           game.win = false;
  //           game.year = environment.CURRENT_SEASON;
  //           this.firestore.doc(`games/${game.id}`).update(game);
  //         }
  //       })
  //     }
  //   })
  // }

}
