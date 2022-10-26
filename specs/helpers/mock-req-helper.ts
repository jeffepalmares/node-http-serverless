import { AwsHttpEvent } from '../../src/serverless-handler/types';

export class MockRequestHelper {
    static getAwsRequest(): AwsHttpEvent {
        return {
            body: {},
            headers: {},
            httpMethod: 'GET',
            path: '/users',
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            pathParameters: {},
            queryStringParameters: {},
            requestContext: {
                accountId: '123456',
                apiId: '12345',
                authorizer: {},
                domainName: 'localhost',
                domainPrefix: '',
                extendedRequestId: '12345',
                httpMethod: 'GET',
                identity: {
                    accessKey: '',
                    accountId: '123456',
                    apiKey: '',
                    apiKeyId: '',
                    caller: '',
                    cognitoAuthenticationProvider: '',
                    cognitoAuthenticationType: '',
                    cognitoIdentityId: '',
                    cognitoIdentityPoolId: '',
                    principalOrgId: '',
                    sourceIp: '127.0.0.1',
                    user: '',
                    userAgent: 'test',
                    userArn: '',
                },
                operationName: '',
                path: '/test',
                protocol: 'http',
                requestId: '1234567890',
                requestTime: '',
                requestTimeEpoch: 1,
                resourceId: '',
                resourcePath: '',
                stage: 'test',
            },
        };
    }
}
