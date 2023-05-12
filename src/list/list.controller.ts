import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ListService } from './list.service';
import { ListDto } from './dto';

@Controller('api/v1/lists')
export class ListController {
  constructor(private list: ListService) {}

  @Get()
  getLists(): Promise<any> {
    return this.list.getLists();
  }

  @Post()
  createList(@Body() dto: ListDto): Promise<any> {
    return this.list.createList(dto);
  }

  @Delete(':id')
  async deleteList(@Param('id') id: string): Promise<any> {
    return await this.list.deleteList(id);
  }

  @Patch(':id')
  // eslint-disable-next-line prettier/prettier
  updateList(@Param('id') id: string, @Body() dto: ListDto): Promise<any> {
    return this.list.updateList(id, dto);
  }
}
