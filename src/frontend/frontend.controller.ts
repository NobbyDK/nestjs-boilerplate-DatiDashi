import { Controller, Get } from '@nestjs/common';
import { CompanyProfileService } from '../company-profile/company-profile.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Frontend')
@Controller('frontend')
export class FrontendController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @Get('company-profile')
  async getCompanyProfile() {
    return await this.companyProfileService.getCompanyProfileData();
  }
}
