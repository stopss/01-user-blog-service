import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
    description: '운영게시판 작성합니다.',
  })
  @Rules('admin', 'gold')
  create(@Body() operationInputDto: OperationInputDto, @Req() req) {
    const user_id = req.user.userId;
    
    return this.operationBoardService.saveNotice(operationInputDto, user_id);
  }
}