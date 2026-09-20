/**
 * LRU Cache - Hash Map + Doubly Linked List
 * Both get() and put() run in O(1) time.
 *
 * Matches LeetCode 146 interface (number keys/values, returns -1 on miss).
 */

class Node {
  key: number;
  value: number;
  prev: Node | null = null;
  next: Node | null = null;

  constructor(key: number = 0, value: number = 0) {
    this.key = key;
    this.value = value;
  }
}

export class LRUCache {
  private capacity: number;
  private map: Map<number, Node>;
  private head: Node; // dummy sentinel (most recently used side)
  private tail: Node; // dummy sentinel (least recently used side)

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();

    // Initialize sentinel nodes
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /** Remove a node from its current position in the list */
  private removeNode(node: Node): void {
    const prev = node.prev!;
    const next = node.next!;
    prev.next = next;
    next.prev = prev;
  }

  /** Insert a node right after the head sentinel (most recently used) */
  private addToHead(node: Node): void {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  /** Move an existing node to the head (mark as most recently used) */
  private moveToHead(node: Node): void {
    this.removeNode(node);
    this.addToHead(node);
  }

  /** Remove the least recently used node (the one before the tail sentinel) */
  private removeTail(): Node {
    const node = this.tail.prev!;
    this.removeNode(node);
    return node;
  }

  get(key: number): number {
    const node = this.map.get(key);
    if (!node) {
      return -1;
    }

    this.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const existing = this.map.get(key);

    if (existing) {
      // Update value and mark as most recently used
      existing.value = value;
      this.moveToHead(existing);
      return;
    }

    // New key
    const newNode = new Node(key, value);
    this.map.set(key, newNode);
    this.addToHead(newNode);

    if (this.map.size > this.capacity) {
      const lru = this.removeTail();
      this.map.delete(lru.key);
    }
  }
}