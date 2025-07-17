export class Pokemon {
  constructor({ id, name, types, image }) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.primaryType = types[0];
    this.image = image;
  }

  get formattedNumber() {
    return `#${String(this.id).padStart(3, '0')}`;
  }
}