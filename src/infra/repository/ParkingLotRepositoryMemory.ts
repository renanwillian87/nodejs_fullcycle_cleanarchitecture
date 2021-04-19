import ParkingLotAdapeter from "../../adapter/ParkingLotAdapter";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";

export default class ParkingLotRepositoryMemory implements ParkingLotRepository {
    
    parkingLots = [{ 
        code: "shopping", 
        capacity: 5, 
        open_Hour: 8, 
        close_Hour: 22, 
        occupiedSpaces: 0 
    }];

    parkedCars = [];
        
    getParkingLot(code: string): Promise<ParkingLot> {
        const parkingLotData = this.parkingLots.find(ParkingLot => ParkingLot.code === code);
        const occupiedSpaces = this.parkedCars.length;
        const parkingLot = ParkingLotAdapeter.create(
            parkingLotData.code, 
            parkingLotData.capacity, 
            parkingLotData.open_Hour, 
            parkingLotData.close_Hour, 
            occupiedSpaces)
        return Promise.resolve(parkingLot);
    }

    saveParkedCar(code: string, plate: string, date: Date): void {
        this.parkedCars.push({ code, plate, date });
    }
}