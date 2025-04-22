import { Customer } from "src/app/customer/model/Customer";
import { Game } from "src/app/game/model/Game";

export class Borrow {
    id: number;
    game: Game;
    customer: Customer;
    startDate: Date;
    finishDate: Date;
}