import { Timestamp } from "firebase/firestore";

export class Player {
    
    public id!: string;
    public first_name!: string;
    public last_name!: string;
    public jersey_number!: number;
    public seasons!: Season[];
    public currentSeasonStats!: PlayerStats;
    public image?: string;
}

export class Season {

    public year!: string;
    public jv!: boolean;
    public varsity!: boolean;
    public stats!: PlayerStats[];
    
}

export class PlayerPenalty {

    public type: string = "";
    public length?: string;

}

export class PlayerStats {

    public goals!: number;
    public assists!: number;
    public points!: number;
    public varsity!: boolean;
    public date!: Timestamp;
    public plus_minus!: number;
    public penalties!: PlayerPenalty[];
    public faceoffs_won!: number;
    public faceoffs_taken!: number;
    public game!: string;

}