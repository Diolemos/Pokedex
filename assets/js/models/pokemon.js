export class Pokemon {
  constructor({ id, name, types, image ,stats}) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.primaryType = types[0];
    this.image = image;
    this.stats = stats;
  }

  get formattedNumber() {
    return `#${String(this.id).padStart(3, '0')}`;
  }
}