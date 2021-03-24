export {};

declare global {
  namespace NodeJS {
    interface ProcessVersions {
      pnp?: string;
    }
  }
}
