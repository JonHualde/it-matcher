import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MediaService } from './media.service';
// dtos
import { GetPictureDataDto } from './dtos/get-picture-data.dto';

@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @Get('picture-data')
  async getPictureData(@Body() body: GetPictureDataDto) {
    return this.mediaService.getPictureData(body);
  }
}
