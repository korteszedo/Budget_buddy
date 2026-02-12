export declare function getGoalsByUserId(userId: number): Promise<any>;
export declare function addGoalForUser(userId: number, name: string, target: number, current: number, deadline: string | null): Promise<any>;
export declare function updateGoalProgressForUser(userId: number, goalId: number, current: number): Promise<any>;
export declare function deleteGoalForUser(userId: number, goalId: number): Promise<any>;
