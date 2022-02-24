import { Entity } from "./entity";
import { Fetcher } from "./fetcher";

export class FetcherInMemory<T> implements Fetcher<T> {
  container: Map<string, Entity<T>>;
  constructor() {
    this.container = new Map();
  }
  get(id: string): Entity<T> {
    throw new Error("Method not implemented.");
  }
  save(entity: Entity<T>): Entity<T> {
    this.container.set(entity.getId(), entity);
    return entity;
  }
  list(): Entity<T>[] {
    return Array.from(this.container.values());
  }
  clear() {
    this.container.clear();
  }

}