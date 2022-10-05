import { PlayerPenalty } from './player';
import { Timestamp } from "firebase/firestore";

export class Game {

    public id?: string;
    public date?: Timestamp;
    public goals_against:number = 0;
    public goals_for: number = 0;
    public shots_against:number = 0;
    public shots_for: number = 0;
    public location?: string;
    public opponent?: string;
    public win?: boolean;
    public tie?: boolean;
    public varsity?: boolean;
    public complete?: boolean;
    public groups?: string;
    public year?: string;
    public image: boolean = false;
}

export class GameStat {

    public playerId!: string;
    public first_name!: string;
    public last_name!: string;
    public jersey_number!: number;
    public goals!: number;
    public assists!: number;
    public points!: number;
    public plus_minus!: number;
    public penalties!: PlayerPenalty[];
    public faceoffs_won!: number;
    public faceoffs_taken!: number;
    public faceoffs_pct!: string;

}