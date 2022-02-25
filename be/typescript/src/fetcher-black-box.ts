import Entity from "./entity";
import Fetcher from "./fetcher";

const arbitraryDelay = 20;
export default class FetcherBlackBox<T> implements Fetcher<T> {
  container: Map<string, Entity<T>>;
  constructor() {
    this.container = new Map();
  }
  get(id: string): Promise<Entity<T> | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.container.get(id));
      }, arbitraryDelay);
    })
  }
  save(entity: Entity<T>): Entity<T> {
    this.container.set(entity.getId(), entity);
    return entity;
  }
  clear() {
    this.container.clear();
  }

}