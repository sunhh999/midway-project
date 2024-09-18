// import { Controller, Inject, Provide } from '@midwayjs/core';

// import {
//   ALL,
//   Body,
//   Controller,
//   // Del,
//   Get,
//   Inject,
//   // Param,
//   Post,
//   Provide,
//   // Put,
//   Query,
// } from '@midwayjs/core';
// import { UserService } from '../service/user.service';
// import { UserDTO } from '../dto/user';
// import { User } from '../entity/user';
// import { Validate } from '@midwayjs/validate';

// @Provide()
// @Controller('/user')
// export class UserController {
//   @Inject()
//   userService: UserService;

//   @Post('/')
//   @Validate()
//   async create(@Body(ALL) data: UserDTO) {
//     const user = new User();
//     user.name = data.name;
//     user.age = data.age;

//     return await this.userService.create(user);
//   }

// @Put('/')
// @Validate()
// async edit(@Body(ALL) data: UserDTO) {
//   const user = await this.userService.getById(data.id);
//   user.name = data.name;
//   user.age = data.age;
//   return await this.userService.edit(user);
// }

// @Del(':/id')
// async remove(@Param('id') id: number) {
//   const user = await this.userService.getById(id);
//   await this.userService.remove(user);
// }

// @Get('/:id')
// async getById(@Param('id') id: number) {
//   return await this.userService.getById(id);
// }

// @Get('/page')
// async page(@Query('page') page: number, @Query('pageSize') pageSize: number) {
//   return await this.userService.page(page, pageSize);
// }

// @Get('/list')
// async list() {
//   return await this.userService.list();
// }
// }
