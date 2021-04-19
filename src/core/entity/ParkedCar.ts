export default class ParkedCar {
    code: string;
    plate: string;
    date: Date;

    constructor(code: string, plate: string, date: Date) {
        if (!/[A-Z]{3}-[0-9]{4}/.test(plate)) throw new Error('Inválid plate');
        this.code = code;
        this.plate = plate;
        this.date = date;
    }

}