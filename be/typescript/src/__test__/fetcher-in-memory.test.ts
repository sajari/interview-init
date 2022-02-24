import { test, expect, describe, beforeEach, afterEach } from '@jest/globals';
import FetcherInMemory from '../fetcher-in-memory';
import Entity from '../entity';

class TestEntity<T> implements Entity<T> {
  id: string;
  item: T;
  constructor (id: string, item: T) {
    this.id = id;
    this.item = item;
  }
  getId() {
    return this.id;
  }
  get() {
    return this.item;
  }
}

const e1 = new TestEntity('first', "testing");
let fetcher: FetcherInMemory<string>;
describe('test FetcherInMemory', () => {
  beforeEach(() => {
    fetcher = new FetcherInMemory()
    fetcher.save(e1);
  })
  afterEach(() => {
    fetcher = undefined;
  })

  test('test get', () => {
    expect(fetcher.get('first').get()).toBe(e1.item);
  });
})
