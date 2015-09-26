import {Inject} from '../core/di/DIAnnotations';
import {Route} from '../core/routing/RouterAnnotations';

import {JsonResponse} from '../core/responses/JsonResponse';
import {TextResponse} from '../core/responses/TextResponse';

import {TestService} from '../services/TestService';

@Inject(TestService)
export class UsersController {

    constructor(testService) {
        this.testService = testService;
    }

    @Route('/users')
    findAll() {
        this.testService.getUsers();

        return JsonResponse.send({
            id: 10,
            name: 'Eduard Neculaesi'
        });
    }

    @Route('/users/:id')
    findOne(userId) {
        return TextResponse.send('One user with id ' + userId);
    }

    @Route('/users/:id/friends/:friendId')
    findFriend(userId, friendId) {
        return TextResponse.send(
            'A user with id ' + userId + ' has a friend with id ' + friendId
        );
    }

    @Route('/users/:id/friends')
    findFriends(id) {
        return TextResponse.send(
            'A user with id ' + id + ' has multiple friends'
        );
    }
}
