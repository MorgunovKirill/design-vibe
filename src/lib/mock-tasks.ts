export type TaskCategory = 'Design' | 'Front-end'
export type TaskStatus = 'To Start' | 'In Progress' | 'Done'

export interface Task {
  id: string
  title: string
  category: TaskCategory
  dueDate: string
  status: TaskStatus
}

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Build design for Dashboard in Figma', category: 'Design', dueDate: 'December 12, 2023', status: 'To Start' },
  { id: '2', title: 'Build components for Card, Notification and Button', category: 'Front-end', dueDate: 'December 12, 2023', status: 'To Start' },
  { id: '3', title: 'Build components for Card, Notification and Button', category: 'Front-end', dueDate: 'December 12, 2023', status: 'To Start' },
  { id: '4', title: 'Build design for Dashboard in Figma', category: 'Design', dueDate: 'December 12, 2023', status: 'In Progress' },
  { id: '5', title: 'Build design for Dashboard in Figma', category: 'Design', dueDate: 'December 12, 2023', status: 'Done' },
]
