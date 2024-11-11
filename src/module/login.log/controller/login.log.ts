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
import { LoginLogDTO } from '../dto/login.log';
import { LoginLogService } from '../service/login.log';

@Provide()
@Controller('/login-log',{tagName:''})
export class LoginLogController {
  @Inject()
  loginLogService: LoginLogService;

  @Post('/', { summary: '新建' })
  async create(@Body(ALL) data: LoginLogDTO) {
    return await this.loginLogService.create(data.toEntity());
  }

  @Put('/', { summary: '编辑' })
  async edit(@Body(ALL) data: LoginLogDTO) {
    const loginLog = await this.loginLogService.getById(data.id);
    // update
    return await this.loginLogService.edit(loginLog);
  }

  @Del('/:id', { summary: '删除' })
  async remove(@Param('id') id: number) {
    const loginLog = await this.loginLogService.getById(id);
    await this.loginLogService.remove(loginLog);
  }

  @Get('/:id', { summary: '根据id查询' })
  async getById(@Param('id') id: string) {
    return await this.loginLogService.getById(id);
  }

  @Get('/page', { summary: '分页查询' })
  async page(@Query('page') page: number, @Query('size') size: number) {
    return await this.loginLogService.page(page, size);
  }

  @Get('/list', { summary: '查询全部' })
  async list() {
    return await this.loginLogService.list();
  }
}
