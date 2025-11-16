import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  async getDashboardStats() {
    return await this.adminService.getDashboardStats();
  }

  @Get('users')
  async getUsers() {
    return await this.adminService.getAllUsers();
  }

  @Get('products')
  async getProducts() {
    return await this.adminService.getAllProducts();
  }

  @Get('pricings')
  async getPricings() {
    return await this.adminService.getAllPricings();
  }

  @Get('features')
  async getFeatures() {
    return await this.adminService.getAllFeatures();
  }

  @Get('about')
  async getAbout() {
    return await this.adminService.getAllAbout();
  }

  @Get('members')
  async getMembers() {
    return await this.adminService.getAllMembers();
  }
}
