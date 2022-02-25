import FetcherBlackBox from './fetcher-black-box';
import FetcherCache from './fetcher-cache';
import Entity from './entity';
import Fetcher from './fetcher';
import BadFetcherCache from './bad-fetcher-cache';

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
const uncachedFetcher = new FetcherBlackBox<string>();
const cachedFetcher = new FetcherCache<string>(new FetcherBlackBox<string>());
const badFetcher = new BadFetcherCache(new FetcherBlackBox<string>());

const size = 100;
const identifierExtra = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
async function testFetcher(name: string, fetcher: Fetcher<string>) {
  for (let i = 0; i < size; i++) {
    fetcher.save(new TestEntity(`${i.toString()}${identifierExtra}`, `${i}th element`));
  }
  console.time(name);

  const recursiveGetter = async (current: number, limit: number): Promise<void> => {
    if (current === limit) {
      return Promise.resolve();
    }
    await fetcher.get(`${current.toString()}${identifierExtra}`);
    await fetcher.get(`${current.toString()}${identifierExtra}`);
    await fetcher.get(`${current.toString()}${identifierExtra}`);
    if ((current / limit)*100 % 10 === 0) {
      console.log(name, `${(current / limit)*100}%`);
    }
    return await recursiveGetter(current + 1, limit);
  };
  const done = await recursiveGetter(0, size);
  console.timeEnd(name)
  return done;
}

testFetcher('cached', cachedFetcher)
  .then(() => testFetcher('bad', badFetcher))
  .then(() => testFetcher('uncached', uncachedFetcher));

console.time('Started Timing...');