import { InputRequest, HttpResponse } from '../dtos';
import { AwsContext, AwsHttpEvent, AwsHttpResponse } from '../types';
import { GenericServerlessHandler } from './generic-serverless-handler';
export declare class AwsServerlessHandler extends GenericServerlessHandler<AwsHttpEvent, AwsContext> {
    protected handleHttpResponse(response: HttpResponse): AwsHttpResponse;
    protected getRawRequest(event: AwsHttpEvent, context: AwsContext): InputRequest;
    private getBody;
}
