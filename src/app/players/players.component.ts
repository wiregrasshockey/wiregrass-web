import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SeasonStats } from './../shared/classes/season-stats';
import { Player, PlayerStats, Season } from './../shared/classes/player';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  private playerId!: string;
  public player!: Player;

  public seasonStats!: SeasonStats;
  public playerStats?:PlayerStats[];
  public profileImageUrl?: string;
  
  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore,
    private storage: AngularFireStorage) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerId = params['playerId'];
      this.firestore.doc<Player>(`players/${this.playerId}`).valueChanges({idField: 'id'}).subscribe({
        next: (p: any) => {
          this.player = p;
          this.playerStats = this.player.seasons.find((s:Season)=>s.year=environment.CURRENT_SEASON)?.stats;
          const ref = this.storage.ref(`players/${this.player.id}/${this.player.id}.jpg`);
          ref.getDownloadURL().subscribe({
            next: (url) => {
              this.profileImageUrl = url;
            }
          });
        }
      })
      this.firestore.collection<SeasonStats>(`season_totals`).valueChanges({idField: 'id'}).subscribe({
        next: (stats: any) => {
          this.seasonStats = new SeasonStats();
          stats.forEach((e: SeasonStats) => {
            this.seasonStats.goals_for += e.goals_for;
            this.seasonStats.assists_for += e.assists_for;
            this.seasonStats.points_for += e.points_for;
          });
        }
      })
    });
  }

  getPlayerStatus():string{
    if(this.player.seasons[0].varsity && this.player.seasons[0].jv){
      return '2 Way';
    }else if(this.player.seasons[0].jv && !this.player.seasons[0].varsity){
      return 'JV';
    }else{
      return 'Varsity';
    } 
  }

  getBarWidth(num1: number, num2: number): string {
    let num: number = num1/num2*100;
    let val = num.toPrecision(2);
    console.log(val);
    return val.toString()+'%';
  }

}
