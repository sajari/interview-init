import Entity from "./entity";

/**
 * A Fetcher that can get, list, save and clear an Entity
 */
export default interface Fetcher<T> {
  /**
   * Return an Entity based on the passed in id
   * @param id
   * @return the entity or null
   */
  get(id: string): Promise<Entity<T> | undefined>;

  /**
   * Saves an entity via the Fetcher
   * @param entity
   * @return
   */
  save(entity: Entity<T>): Entity<T>;

  /**
   * Will clear all entities in the Fetcher
   */
  clear(): void;
}
