import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Provide,
  Query,
  ALL,
  Put,
  Param,
  Del,
} from '@midwayjs/core';
import { UserDTO } from '../dto/user';
import { UserService } from '../service/user';

// 接口内容

@Provide()
@Controller('/user', { tagName: '用户管理' })
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/create', { summary: '创建用户' })
  async create(@Body(ALL) data: UserDTO) {
    return await this.userService.create(data.toEntity());
  }

  @Put('/edit', { summary: '编辑' })
  async edit(@Body(ALL) data: UserDTO) {
    const user = await this.userService.getById(data.id);
    return await this.userService.edit(user);
  }

  @Del('/:id', { summary: '删除' })
  async remove(@Param('id') id: string) {
    const user = await this.userService.getById(id);
    await this.userService.remove(user);
  }

  @Get('/:id', { summary: '根据id查询' })
  async getById(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @Get('/page', { summary: '分页查询' })
  async page(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return await this.userService.page(page, pageSize);
  }

  @Get('/list', { summary: '查询全部' })
  async list() {
    return await this.userService.list();
  }
}
