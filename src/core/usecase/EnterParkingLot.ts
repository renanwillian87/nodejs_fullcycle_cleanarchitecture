import ParkedCar from "../entity/ParkedCar";
import ParkingLotRepository from "../repository/ParkingLotRepository";

export default class EnterParkingLot {
    parkingLoteRepository: ParkingLotRepository;

    constructor(parkingLoteRepository: ParkingLotRepository) {
        this.parkingLoteRepository = parkingLoteRepository;
    }

    async execute(code: string, plate: string, date: Date) {
        const parkingLot = await this.parkingLoteRepository.getParkingLot(code);
        const parkedCar = new ParkedCar(code, plate, date);
        if (!parkingLot.isOpen(parkedCar.date)) throw new Error('The parking lot is closed');
        if (parkingLot.isFull()) throw new Error('The parking lot is full');
        await this.parkingLoteRepository.saveParkedCar(parkedCar.code, parkedCar.plate, parkedCar.date);
        return parkingLot;
    }
}
