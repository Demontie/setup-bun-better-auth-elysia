import { randomUUIDv7 } from 'bun';

export abstract class Entity {
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(props: { id?: string; createdAt?: Date; updatedAt?: Date }) {
    this.id = props.id ?? randomUUIDv7();
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  abstract toJSON(): Record<string, any>;
}
