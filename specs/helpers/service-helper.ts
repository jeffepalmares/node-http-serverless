import { Service } from 'typedi';

@Service()
export class LogicTestHelper {
    doSomething(): string {
        return 'doneByLogic';
    }
}
