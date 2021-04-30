export class UpdateUrlEvent {
    constructor(
        public readonly url: string,
        public readonly urlHash: string,
    ) {}
}