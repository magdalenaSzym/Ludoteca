import { Pageable } from "src/app/core/model/page/Pageable";
import { Borrow } from "./Borrow";

export class BorrowPage {
    content: Borrow[];
    pageable: Pageable;
    totalElements: number;
}