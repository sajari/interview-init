import Entity from "./entity";
import Fetcher from "./fetcher";

/**
 *
 *
 *
 *
 *
 *
 * You're free to read the implementation of FetcherBlackBox if you wish.
 *
 * However one shouldn't need to see it's implementation to complete the exercise
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * 
 * 
 *
 *
 *
 *
 */

const arbitraryDelay = 5;
export default class FetcherBlackBox<T> implements Fetcher<T> {
  container: Map<string, Entity<T>>;
  withDelay: boolean;
  constructor(withDelay = true) {
    this.container = new Map();
    this.withDelay = withDelay;
  }
  get(id: string): Promise<Entity<T> | undefined> {
    if (!this.withDelay) {
      return Promise.resolve(this.container.get(id));
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.container.get(id));
      }, arbitraryDelay);
    });
  }
  save(entity: Entity<T>): Entity<T> {
    this.container.set(entity.getId(), entity);
    return entity;
  }
  clear() {
    this.container.clear();
  }
}
