import { Observable } from 'rxjs';
import { GameStat } from './../shared/classes/game';
import { Player, PlayerStats, Season } from './../shared/classes/player';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../shared/classes/game';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  private selectedGame?: string;
  public game!: Game;
  public images!: any[];
  public gameStats!: GameStat[];
  public gameImageUrl?: Observable<any>

  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedGame = params['gameId'];
      this.firestore.doc<Game>(`games/${this.selectedGame}`).valueChanges({idField: 'id'}).subscribe({
        next: (g: any) => {
          this.game = g;
          const ref = this.storage.ref(`games/${this.game.id}/${this.game.id}.jpg`);
          ref.getDownloadURL().subscribe({
            next: (url) => {
              this.gameImageUrl = url;
            },
            error: (e) => console.error(e)
          });
        }
      })
      this.firestore.collection<Player>(`players`, ref => ref.orderBy('jersey_number', 'asc')).valueChanges({idField: 'id'}).subscribe({
        next: (p: Player[]) => {
          const gs:GameStat[] = [];
          p.forEach((player:Player)=>{
            let season:Season|undefined = player.seasons.find((s:Season)=>s.year===environment.CURRENT_SEASON);
            if(season){
              season.stats.forEach((ps:PlayerStats) => {
                const dateMatch = ps.date.toDate().toLocaleDateString() === this.game.date?.toDate().toLocaleDateString();
                const typeMatch = ps.varsity === this.game.varsity;
                if(dateMatch===true && typeMatch===true){
                  const stat: GameStat = new GameStat();
                  stat.playerId = player.id;
                  stat.first_name = player.first_name;
                  stat.last_name = player.last_name;
                  stat.jersey_number = player.jersey_number;
                  stat.goals = ps.goals;
                  stat.assists = ps.assists;
                  stat.points = ps.points;
                  gs.push(stat);
                }
              })
            }
          })
          this.gameStats = gs;
        }
      })
    });
  }

}
