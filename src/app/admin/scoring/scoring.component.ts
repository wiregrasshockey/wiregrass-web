import { FormControl, Validators } from '@angular/forms';
import { Player, Season } from './../../shared/classes/player';
import { Game } from './../../shared/classes/game';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './scoring.component.html',
  styleUrls: ['./scoring.component.scss']
})
export class ScoringComponent implements OnInit {

  public showVarsity: boolean = true;
  public varsityGames: Game[] = [];
  public jvGames: Game[] = [];
  
  public players?: Player[];

  public selectedGame?: Game;
  public selectedPlayer?: Player;
  playerControl = new FormControl(null, Validators.required);

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection<Game>(`games`,ref => ref.orderBy('date','asc')).valueChanges({idField: 'id'}).subscribe({
      next: (g: Game[]) => {
        this.varsityGames = g.filter((game:Game) => game.varsity===true);
        this.jvGames = g.filter((game:Game) => game.varsity===false);
      }
    })

    this.firestore.collection<Player>(`players`, ref => ref.orderBy('jersey_number','asc')).valueChanges({idField:'id'}).subscribe({
      next: (p: Player[]) => {
        p = p.filter((player: Player) => {
          const season = player.seasons.find((s: Season)=>s.year === environment.CURRENT_SEASON);
          if(this.showVarsity){
            return season?.varsity === true;
          } else {
            return season?.jv === true;
          }
        })
        this.players = p;
      }
    })
  }

}
