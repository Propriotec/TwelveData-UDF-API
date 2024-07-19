export class V1ResolveSymbolQuery {
    constructor(
        public readonly symbol: string,
        public readonly exchange?: string | undefined,
    ) {}
}
