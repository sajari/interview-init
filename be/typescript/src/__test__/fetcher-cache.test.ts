import FetcherCache from "../fetcher-cache";
import Entity from "../entity";
import FetcherBlackBox from "../fetcher-black-box";

class TestEntity<T> implements Entity<T> {
  id: string;
  item: T;
  constructor(id: string, item: T) {
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

const e1 = new TestEntity("first", "testing");
const e2 = new TestEntity("second", "this");
const e3 = new TestEntity("third", "works");
const fetcher = new FetcherCache<string>();
describe("test FetcherCache", () => {
  beforeEach(() => {
    fetcher.save(e1);
    fetcher.save(e2);
  });
  afterEach(() => {
    fetcher.clear();
  });

  test("test get gets successfully", async () => {
    const item = await fetcher.get("first");
    if (!item) {
      fail();
    }
    expect(item.get()).toBe(e1.item);
  });

  test("test get fails successfully", async () => {
    const item = await fetcher.get("third");
    expect(item).toBe(undefined);
  });

  test("test save pushes item correctly", async () => {
    fetcher.save(e3);
    const item = await fetcher.get("third");
    if (!item) {
      fail();
    }
    expect(item.get()).toBe(e3.item);
  });
});
