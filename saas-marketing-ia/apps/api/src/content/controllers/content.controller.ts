import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContentService } from '../services/content.service';
import { GenerateContentDto } from '../dto/generate-content.dto';

@Controller('content')
@UseGuards(AuthGuard('jwt'))
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Post('generate')
  async generate(@Body() dto: GenerateContentDto, @Request() req) {
    return this.contentService.generate(dto.type, dto.topic, req.user.userId);
  }

  @Get()
  async findAll(@Request() req) {
    return this.contentService.findAllByUser(req.user.userId);
  }
}
