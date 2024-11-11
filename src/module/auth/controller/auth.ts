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
// import { AuthDTO } from '../dto/auth';
import { AuthService } from '../service/auth';

@Provide()
@Controller('/auth', { tagName: '' })
export class AuthController {
  @Inject()
  authService: AuthService;

  @Post('/', { summary: '新建' })
  async create(@Body(ALL) data: AuthDTO) {
    return await this.authService.create(data.toEntity());
  }

  @Put('/', { summary: '编辑' })
  async edit(@Body(ALL) data: AuthDTO) {
    const auth = await this.authService.getById(data.id);
    // update
    return await this.authService.edit(auth);
  }

  @Del('/:id', { summary: '删除' })
  async remove(@Param('id') id: number) {
    const auth = await this.authService.getById(id);
    await this.authService.remove(auth);
  }

  @Get('/:id', { summary: '根据id查询' })
  async getById(@Param('id') id: string) {
    return await this.authService.getById(id);
  }

  @Get('/page', { summary: '分页查询' })
  async page(@Query('page') page: number, @Query('size') size: number) {
    return await this.authService.page(page, size);
  }

  @Get('/list', { summary: '查询全部' })
  async list() {
    return await this.authService.list();
  }

  @Get('/current/user')
  @NotAuth()
}
