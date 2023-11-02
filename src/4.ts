class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected tenants: Person[] = [];

  public comeIn(person: Person) {
    if (this.door) {
      console.log("Adding new tenant");
      this.tenants.push(person);
    } else {
      console.log("The door is closed. Cannot add new tenant");
    }
  }

  public getTenants(): Person[] {
    return this.tenants;
  }

  public abstract openDoor(key: Key): void;
  public abstract closeDoor(): void;
}

class MyHouse extends House {
  private key: Key;

  constructor(key: Key) {
    super();
    this.key = key;
  }

  public openDoor(personKey: Key): void {
    if (this.key.getSignature() === personKey.getSignature()) {
      console.log("Opening the door");
      this.door = true;
    } else {
      console.log("Wrong key");
    }
  }

  public closeDoor(): void {
    console.log("Closing the door");
    this.door = false;
  }
}

const key = new Key();
const person = new Person(key);
const house = new MyHouse(key);

house.openDoor(person.getKey());
house.comeIn(person);
house.getTenants(); // масив жителів з одного об'єкту person

house.closeDoor();
house.comeIn(person); // не додається оскільки двері зачинені
export {};
