import { RouteMetadata } from '../../core';

class ControllerDecorator {
    static Controller =
        (path: string) =>
        <T>(constructor: T) => {
            RouteMetadata.registerController(constructor, path);
        };
}

export const { Controller } = ControllerDecorator;
