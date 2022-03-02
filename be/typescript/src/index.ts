import FetcherBlackBox from "./fetcher-black-box";
import FetcherCache from "./fetcher-cache";
import Entity from "./entity";
import Fetcher from "./fetcher";

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
const lUncachedFetcher = new FetcherBlackBox<string>();
//const lCachedFetcher = new FetcherCache<string>();

const uncachedFetcher = new FetcherBlackBox<string>(false);
//const cachedFetcher = new FetcherCache<string>();

const size = 500;
const identifierExtra =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);
async function testFetcher(name: string, fetcher: Fetcher<string>) {
  for (let i = 0; i < size; i++) {
    fetcher.save(
      new TestEntity(`${i.toString()}.${identifierExtra}`, `${i}th element`)
    );
  }
  console.time(name);

  const recursiveGetter = async (
    current: number,
    limit: number
  ): Promise<void> => {
    if (current === limit) {
      return Promise.resolve();
    }
    let result = await fetcher.get(`${current.toString()}.${identifierExtra}`);
    //console.log(result);
    result = await fetcher.get(`${current.toString()}.${identifierExtra}`);
    //console.log(result);
    result = await fetcher.get(`${current.toString()}.${identifierExtra}`);
    //console.log(result);
    if (((current / limit) * 100) % 10 === 0) {
      console.log(name, `${(current / limit) * 100}%`);
    }
    return await recursiveGetter(current + 1, limit);
  };
  const done = await recursiveGetter(0, size);
  console.timeEnd(name);
  fetcher.clear();
  return done;
}

console.log(process.pid);
console.log("With latency on fetch:");
testFetcher("Luncached", lUncachedFetcher)
  // .then(() => testFetcher("Lcached", lCachedFetcher))
  // .then(() => {
  //   console.log("-------", "Without latency on fetch:");
  //   return testFetcher("cached", cachedFetcher);
  // })
  .then(() => testFetcher("uncached", uncachedFetcher));

console.log("Started Timing...");
