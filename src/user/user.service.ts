import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, username: 'john_doe', email: 'johndoe@example.com' },
    { id: 2, username: 'bob_cock', email: 'bobcock@example.com' },
    { id: 3, username: 'jane_doe', email: 'janedoe@example.com' },
  ];

  findAll() {
    return this.users;
  }
}
