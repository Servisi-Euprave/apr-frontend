export class ErrorInvalidCredentials extends Error {
  constructor(m: string) {
    super(m);
  }
}

export class ClientSideError extends Error {
  constructor(m: string) {
    super(m);
  }
}

export class ServerError extends Error {
  constructor(m: string) {
    super(m);
  }
}
