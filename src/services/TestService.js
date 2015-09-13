import {Inject} from '../core/di/DIAnnotations';

import {TestRepository} from './TestRepository';

@Inject(TestRepository)
export class TestService {

    constructor(testRepository) {
        this.testRepository = testRepository;
    }

    getUsers() {
        this.testRepository.getUsers();
        console.log('Getting users from service!');
    }
}
