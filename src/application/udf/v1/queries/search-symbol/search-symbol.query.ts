export class V1SearchSymbolQuery {
    constructor(
        public readonly symbol: string,
        public readonly exchange?: string,
    ) {}
}
