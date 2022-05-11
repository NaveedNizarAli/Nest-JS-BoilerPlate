import { UserService } from './user.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserDetails } from './user-details.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }

  @Get()
  @UseGuards(JwtGuard)
  getUsers(): Promise<User[]> {
    return this.userService.find();
  }

}
