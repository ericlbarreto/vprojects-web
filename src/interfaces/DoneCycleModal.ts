import { Av360 } from "./Av360";
import { CurrentCycle } from "./CurrentCycle"

export interface DoneCycleModal {
    setDoneCycle:Function
    currentCycle: CurrentCycle;
    av360Data?: { [key: number]: Av360 };
}