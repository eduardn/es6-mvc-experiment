import {Inject} from '../core/di/DIAnnotations';
import {Route} from '../core/routing/RouterAnnotations';

import {BaseController} from './BaseController';

import {TestService} from '../services/TestService';

@Inject(TestService)
export class UsersController extends BaseController {

    constructor(testService, response) {
        super(response);
        this.testService = testService;
    }

    @Route('/users')
    findAll() {
        this.testService.getUsers();
        this.response.write('All users');
    }

    @Route('/users/:id')
    findOne(userId) {
        this.response.write('One user with id ' + userId);
    }

    @Route('/users/:id/friends/:friendId')
    findFriend(userId, friendId) {
        this.response.write('A user with id ' + userId + ' has a friend with id ' + friendId);
    }

    @Route('/users/:id/friends')
    findFriends(id) {
        this.response.write('A user with id ' + id + ' has multiple friends');
    }
}
