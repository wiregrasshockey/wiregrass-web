import { Season } from './../shared/classes/player';
import { Router } from '@angular/router';
import { SeasonStats } from '../shared/classes/season-stats';
import { Player } from '../shared/classes/player';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-players',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  public selectedTeam!: string;
  //public varsity!: any;
  //public jv!: any;
  public players: Player[] = [];
  public varsityStats!: SeasonStats;
  public jvStats!: SeasonStats;

  constructor(private router: Router, private firestore: AngularFirestore) {
    
  }

  ngOnInit(): void {
    this.getTeam('varsity');
    this.getStats();
  }

  getStats(){
    this.firestore.collection<SeasonStats>('season_totals').valueChanges().subscribe({
      next: (stats) => {
        stats.forEach((s: SeasonStats) => {
          if(s.varsity){
            this.varsityStats = s;
          } else {
            this.jvStats = s;
          }
        })
      }
    })
  }

  getTeam(name:string){
    this.selectedTeam = name;
    this.players = [];
    this.firestore.collection<Player>(`players`, ref => ref.orderBy('jersey_number','asc')).valueChanges({idField:'id'}).subscribe({
      next: (p: Player[]) => {
        p = p.filter((player: Player) => {
          const season = player.seasons.find((s: Season)=>s.year === environment.CURRENT_SEASON);
          if(this.selectedTeam === 'varsity'){
            return season?.varsity === true;
          } else {
            return season?.jv === true;
          }
        })
        this.players = p;
      }
    })
  }

  viewProfile(id: string){
    this.router.navigate([`players/${id}`]);
  }

}
