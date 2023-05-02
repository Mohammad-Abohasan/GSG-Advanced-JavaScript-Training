class Room {
    #isBooked;
    constructor(floorNum, roomNum, price, isBooked) {
        this.floorNum = floorNum;
        this.roomNum = roomNum;
        this.price = price;
        this.#isBooked = isBooked;
    }

    printRoom() {
        return (`Room: [floor num: ${this.floorNum}, room num: ${this.roomNum}, price: ${this.price}, is booked: ${this.#isBooked ? 'yes' : 'no'}]`);
    }

    book() {
        this.#isBooked = true;
    }

    get isBooked() {
        return this.#isBooked;
    }
}

class RoomWithView extends Room {
    constructor(floorNum, roomNum, price, isBooked, view, numOfBeds) {
        super(floorNum, roomNum, price, isBooked);
        this.view = view;
        this.numOfBeds = numOfBeds;
    }
}

class SleepingRoom extends Room {
    constructor(floorNum, roomNum, price, isBooked, personCapacity) {
        super(floorNum, roomNum, price, isBooked);
        this.personCapacity = personCapacity;
    }
}

class Hotel {
    #minFloor;
    #maxFloor;
    constructor(address, numOfRooms, minFloor, maxFloor, rooms) {
        this.address = address;
        this.numOfRooms = numOfRooms;
        this.#minFloor = minFloor;
        this.#maxFloor = maxFloor;
        this.rooms = rooms;
    }

    printAdvertisement() {
        return (`Hotel: [\n\taddress: ${this.address}, \n\tnum of rooms: ${this.numOfRooms}, \n\tmin floor: ${this.#minFloor}, \n\tmax floor: ${this.#maxFloor}, \n\tRooms: [${this.#listRooms()}\n\t]`);
    }

    #listRooms() {
        let listRooms = '';
        for (let i = 0; i < this.rooms.length; i++) {
            listRooms += '\n\t' + this.rooms[i].printRoom();
        }
        return listRooms;
    }

    listBookedRooms() {
        let bookedRooms = '';
        for (let i = 0; i < this.rooms.length; i++) {
            this.rooms[i].isBooked && (bookedRooms += (bookedRooms != '' ? '\n' : '') + this.rooms[i].printRoom());
        }
        return bookedRooms;
    }
}

console.log('===== testing =====');
const roomTest = new SleepingRoom(5, 'Ten', 3000, false, 6);
console.log(roomTest);
console.log(roomTest.printRoom());
console.log(roomTest.isBooked);
roomTest.book();
console.log(roomTest.isBooked);
console.log(roomTest.printRoom());
console.log('===== End testing =====');


const merryLandHotel = new Hotel('Amman', 4, 1, 2, [
    new SleepingRoom(1, 'One', 1500, true, 5),
    new SleepingRoom(1, 'Two', 1500, false, 5),
    new RoomWithView(2, 'Three', 2700, false, 'Mountain', 2),
    new RoomWithView(2, 'Four', 2700, false, 'City', 4)
]);

console.log(merryLandHotel.printAdvertisement());
console.log('Before book room number Four: ');
console.log(merryLandHotel.listBookedRooms());
merryLandHotel.rooms[3].book();
console.log('After booked room number Four: ');
console.log(merryLandHotel.listBookedRooms());