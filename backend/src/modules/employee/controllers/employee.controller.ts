import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateEmployeeService } from '../application/services/create-employee.service';
import { CreateEmployeeDto } from '../application/dto/create-employee.dto';

// 1. Import your custom Public decorator
import { Public } from 'src/common/decorators/roles.decorator';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly createEmployeeService: CreateEmployeeService) {}

  @Public() // 2. Add this right here! It tells the Guard to let this request through.
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<{ message: string }> {
    await this.createEmployeeService.execute(createEmployeeDto);

    return {
      message: 'Employee created successfully',
    };
  }
}
