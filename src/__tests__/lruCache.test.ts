import { LRUCache } from "../data-structures/lruCache";

describe("LRUCache", () => {
  test("exact sequence from Step 2 (capacity 2)", () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);
    expect(cache.get(1)).toBe(1); // returns 1, now order: 1, 2

    cache.put(3, 3); // evicts key 2
    expect(cache.get(2)).toBe(-1);

    cache.put(4, 4); // evicts key 1
    expect(cache.get(1)).toBe(-1);
    expect(cache.get(3)).toBe(3);
    expect(cache.get(4)).toBe(4);
  });

  test("capacity of 1", () => {
    const cache = new LRUCache(1);

    cache.put(1, 1);
    expect(cache.get(1)).toBe(1);

    cache.put(2, 2); // evicts 1
    expect(cache.get(1)).toBe(-1);
    expect(cache.get(2)).toBe(2);
  });

    test("updating an existing key", () => {
    const cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(1, 10); // order becomes: 1 (MRU), 2 (LRU)

    cache.put(3, 3);  // should evict 2

    expect(cache.get(2)).toBe(-1);
    expect(cache.get(1)).toBe(10);
    expect(cache.get(3)).toBe(3);
    });

  test("get on empty / missing key returns -1", () => {
    const cache = new LRUCache(2);
    expect(cache.get(99)).toBe(-1);
  });

  test("multiple updates keep most recent correct", () => {
    const cache = new LRUCache(3);

    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.get(2); // 2 becomes most recent → order: 2, 3, 1

    cache.put(4, 4); // should evict 1
    expect(cache.get(1)).toBe(-1);
    expect(cache.get(2)).toBe(2);
    expect(cache.get(3)).toBe(3);
    expect(cache.get(4)).toBe(4);
  });
});