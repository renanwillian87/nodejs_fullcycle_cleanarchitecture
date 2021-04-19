import ParkingLotAdapeter from "../../adapter/ParkingLotAdapter";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";
import database from "../database/database";

export default class ParkingLotRepositorySQL implements ParkingLotRepository {

    async getParkingLot(code: string): Promise<ParkingLot> {
        const parkingLotData = await database.oneOrNone('select *, (select count(*) from example.parked_car pc where pc.code = pl.code)::int as occupied_space from example.parking_lot pl where pl.code = $1', [code]);
        return ParkingLotAdapeter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_Hour, parkingLotData.close_Hour, parkingLotData.occupied_space);
    }

    async saveParkedCar(code: string, plate: string, date: Date): Promise<void> {
        await database.none('insert into example.parked_car (code, plate, date) values ($1, $2, $3)', [code, plate, date])
    }
}