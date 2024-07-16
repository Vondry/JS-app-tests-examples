import type { Todo } from '../models/Todo';

export const GET_TODOS: Todo[] = [
    {
        id: 1,
        description: 'Finish the project report 📈',
        completed: true,
        created_at: new Date('2023-07-01T09:00:00Z'),
        updated_at: new Date('2023-07-10T10:00:00Z')
    },
    {
        id: 2,
        description: 'Book ✈️ tickets',
        completed: false,
        created_at: new Date('2023-06-15T08:30:00Z'),
        updated_at: new Date('2023-06-16T11:45:00Z')
    },
    {
        id: 3,
        description: 'Buy groceries 🥦🥕🥬🍅',
        completed: false,
        created_at: new Date('2023-07-10T14:00:00Z'),
        updated_at: new Date('2023-07-10T14:30:00Z')
    }
] as const;
