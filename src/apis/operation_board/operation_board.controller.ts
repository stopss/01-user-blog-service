import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Rules } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { OperationInputDto } from './dto/operation_board.input';
import { OperationBoardService } from './operation_board.service';

@Controller('operationboards')
@ApiTags('운영게시판')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OperationBoardController {
  constructor(private readonly operationBoardService: OperationBoardService) {
    this.operationBoardService = operationBoardService;
  }

  @Post()
  @ApiOperation({
    summary: '운영게시판 Create API',
    description: '운영게시판에 게시글을 작성합니다.',
  })
  @Rules('admin', 'gold')
  create(@Body() operationInputDto: OperationInputDto, @Req() req) {
    const user_id = req.user.userId;

    return this.operationBoardService.saveOperation(operationInputDto, user_id);
  }

  @Get()
  @ApiOperation({
    summary: '운영게시판 전체조회 API',
    description: '운영게시판 전체 게시글을 조회합니다.',
  })
  @Rules('admin', 'gold')
  getAll() {
    return this.operationBoardService.getAllOperation();
  }

  @Put(':id')
  @ApiOperation({
    summary: '운영게시판 Update API',
    description: '운영게시판에 게시글을 수정합니다.',
  })
  @Rules('admin', 'gold')
  update(
    @Param('id') id: string,
    @Body() operationInputDto: OperationInputDto,
    @Req() req,
  ) {
    const user_id = req.user.userId;
    return this.operationBoardService.updateOperation(
      id,
      operationInputDto,
      user_id,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: '운영게시판 Delete API',
    description: '운영게시판에 게시글을 삭제합니다.',
  })
  @Rules('admin', 'gold')
  delete(@Param('id') id: string, @Req() req) {
    const user_id = req.user.userId;
    return this.operationBoardService.deleteOperation(id, user_id);
  }

  @Get(':id')
  @ApiOperation({
    summary: '운영게시판 Detail API',
    description: '운영게시판 게시글을 조회합니다.',
  })
  @Rules('admin', 'gold')
  detail(@Param('id') id: string) {
    return this.operationBoardService.detailOperation(id);
  }
}
