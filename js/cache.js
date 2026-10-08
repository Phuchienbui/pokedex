// In-memory caches (Map) so the same resource is never requested twice.
// They store the request promise, so even parallel callers share one request.
export const nameListCache = new Map();
export const pageCache = new Map();
export const pokemonCache = new Map();
export const speciesCache = new Map();
export const evolutionCache = new Map();
