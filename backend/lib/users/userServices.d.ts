export declare function loginUser(email: string, password: string): Promise<any>;
export declare function registerUser(name: string, email: string, password: string): Promise<any>;
export declare function getUserById(userId: number): Promise<any>;
export declare function getUsersForAdmin(): Promise<any>;
export declare function updateUserForRole2(userId: number, name?: string, email?: string, password?: string): Promise<any>;
export declare function deleteUserForRole2(userId: number): Promise<any>;
