import Entity from "./entity";
import Fetcher from "./fetcher";

/**
 * Please implement a cached version of the Fetcher interface
 */
export default class FetcherCache<T> implements Fetcher<T> {
  async get(id: string): Promise<Entity<T> | undefined> {
    throw Error("method not implemented " + id);
  }
  save(entity: Entity<T>): Entity<T> {
    throw Error("method not implemented " + entity);
  }
  clear() {
    throw Error("method not implemented");
  }
}
