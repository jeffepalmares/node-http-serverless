/// <reference types="express" />
import { HttpResponse, InputRequest } from '../dtos';
import { GenericServerlessHandler } from './generic-serverless-handler';
import { GcpEvent, GcpResponse } from '../types/gcp';
export declare class GcpServerlessHandler extends GenericServerlessHandler<unknown, unknown> {
    private resp;
    protected handleHttpResponse(response: HttpResponse): unknown;
    protected getRawRequest(event: GcpEvent, response: GcpResponse): InputRequest;
}
