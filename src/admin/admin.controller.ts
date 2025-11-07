import { Controller, Get, Render } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Render('layouts/pages/admin')
  async getDashboard() {
    const stats = await this.adminService.getDashboardStats();
    return {
      title: 'Admin Dashboard',
      name: 'datidashi company',
      ...stats,
    };
  }

  @Get('users')
  @Render('layouts/pages/admin-users')
  async getUsers() {
    const users = await this.adminService.getAllUsers();
    return {
      title: 'User Management',
      name: 'datidashi company',
      users,
    };
  }
}
