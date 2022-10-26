export class IntegrationErrorData {
    constructor(
        public url: string,
        public baseUrl: string,
        public errorCode: string,
        public statusCode: number,
        public errorMessage: string,
        public curl: string,
        public response: unknown,
        public originData?: string,
    ) {}
}
