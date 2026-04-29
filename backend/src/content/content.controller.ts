import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Content')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate new content with AI' })
  @ApiResponse({ status: 201, description: 'Content generated successfully' })
  async generate(
    @Request() req,
    @Body() body: { title: string; type: any; prompt: string },
  ) {
    return this.contentService.generateContent({
      ...body,
      userId: req.user.userId,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all user content' })
  @ApiResponse({ status: 200, description: 'List of contents' })
  async findAll(@Request() req) {
    return this.contentService.findAllByUser(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific content' })
  @ApiResponse({ status: 200, description: 'Content details' })
  async findOne(@Request() req, @Param('id') id: string) {
    return this.contentService.findOne(id, req.user.userId);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update content status' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  async updateStatus(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { status: any },
  ) {
    return this.contentService.updateStatus(id, req.user.userId, body.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete content' })
  @ApiResponse({ status: 200, description: 'Content deleted' })
  async delete(@Request() req, @Param('id') id: string) {
    return this.contentService.delete(id, req.user.userId);
  }
}
