import {
  Inject,
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

// 1. Correct Imports
import type { IEmployeeRepository } from 'src/modules/employee/domain/repositories/employee.repository.interface';
import { EMPLOYEE_REPOSITORY } from 'src/modules/employee/domain/repositories/employee.repository.interface';
import { EmployeeId } from 'src/modules/employee/domain/value-objects/employee-id.vo'; // Needed for lookup

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,

    // 2. Correct Injection Token and Interface
    @Inject(EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: IEmployeeRepository,
  ) {}

  // Activate a new user account using only employee ID and password
  async activateUser(props: {
    employeeId: string;
    password: string;
  }): Promise<User> {
    // 3. FIX: Convert string to Value Object and look up strictly by ID
    const empIdVo = EmployeeId.create(props.employeeId);
    const employee = await this.employeeRepository.findById(empIdVo);

    console.log('employee exists : ', !!employee);

    if (!employee) {
      throw new BadRequestException(
        'Employee ID not found. Please contact HR to register as an employee first.',
      );
    }

    // Step 2: Check if this employee has already activated their account
    const existingUser = await this.userRepository.findByEmployeeId(
      props.employeeId,
    );

    if (existingUser) {
      throw new ConflictException(
        'This employee has already activated their account. Please use the login endpoint instead.',
      );
    }

    // Step 3: Create the new user with employee ID as the username
    const user = await User.create({
      plainPassword: props.password,
      employeeId: props.employeeId,
    });
    console.log('creating a new : ', user.employeeId);
    return await this.userRepository.save(user);
  }

  // Find user by username - in your system, username is the employee ID
  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findByUsername(username);
  }

  async updateLastLogin(user: User): Promise<User> {
    const updatedUser = user.updateLastLogin();
    return await this.userRepository.save(updatedUser);
  }

  async getEmployeeForUser(employeeId: string) {
    // 4. FIX: Stop retrieving all employees! Just look up the one you need.
    const empIdVo = EmployeeId.create(employeeId);
    return await this.employeeRepository.findById(empIdVo);
  }
}
