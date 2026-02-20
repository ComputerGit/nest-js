// import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
// import { UserService } from 'src/modules/user/application/services/user.service';

// // FIX 1: Using relative paths to guarantee the compiler finds the interface
// import type { IEmployeeRepository } from '../../employee/domain/repositories/employee.repository.interface';
// import { EMPLOYEE_REPOSITORY } from '../../employee/domain/repositories/employee.repository.interface';
// import { EmployeeId } from '../../employee/domain/value-objects/employee-id.vo'; // Needed for the optimized lookup

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UserService,
//     @Inject(EMPLOYEE_REPOSITORY)
//     private readonly employeeRepository: IEmployeeRepository,
//   ) {}

//   async validateUser(
//     username: string,
//     password: string,
//   ): Promise<{
//     userId: string;
//     employeeId: string;
//     role: string;
//   }> {
//     // Step 1: Find the user by their username
//     const user = await this.userService.findByUsername(username);

//     if (!user) {
//       throw new UnauthorizedException('Invalid username or password');
//     }

//     // Step 2: Check if the user's account is active
//     if (!user.canLogin()) {
//       throw new UnauthorizedException(
//         'Your account is not active. Please contact support.',
//       );
//     }

//     // Step 3: Verify the password matches
//     const isPasswordValid = await user.verifyPassword(password);

//     if (!isPasswordValid) {
//       throw new UnauthorizedException('Invalid username or password');
//     }

//     // Step 4: Update the last login timestamp
//     await this.userService.updateLastLogin(user);

//     // ==========================================
//     // FIX 2 & 3: Optimized Lookup and Encapsulation
//     // ==========================================

//     // Create the Value Object from the string
//     const empIdVo = EmployeeId.create(user.employeeId);

//     // Fetch ONLY the employee trying to log in, not the whole company
//     const employee = await this.employeeRepository.findById(empIdVo);

//     if (!employee) {
//       throw new UnauthorizedException('Employee data not found');
//     }

//     // Return the data that will be stored in the session
//     return {
//       userId: user.id.getValue(),
//       employeeId: user.employeeId,
//       // Safely access the private role property via getProps()
//       role: employee.getProps().role.getValue(),
//     };
//   }
// }
