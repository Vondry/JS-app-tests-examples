export type TodoDescription = string;

export type Todo = {
    id: number
    description: TodoDescription
    completed: boolean
    created_at: Date
    updated_at: Date
}
