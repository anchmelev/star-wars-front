export interface ListRepose<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export class ApiError<T> extends Error {
  options?: T;

  constructor(message: string, options?: T) {
    super(message);
    this.options = options;
  }
}
