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
      this.tenants.push(person);
    }
  }

  public getTenants(): Person[] {
    return this.tenants;
  }

  public abstract openDoor(key: Key): boolean;
  public abstract closeDoor(): void;
}

class MyHouse extends House {
  private key: Key;

  constructor(key: Key) {
    super();
    this.key = key;
  }

  public openDoor(personKey: Key): boolean {
    if (this.key.getSignature() === personKey.getSignature()) {
      this.door = true;
      return true;
    }
    return false;
  }

  public closeDoor(): void {
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
