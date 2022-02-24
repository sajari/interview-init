export interface Entity<T> {
  getId(): string;
  get(): T;
}