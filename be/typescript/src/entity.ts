export default interface Entity<T> {
  getId(): string;
  get(): T;
}
