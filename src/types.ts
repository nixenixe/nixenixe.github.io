export interface MenuItemData {
    label: string;
    path: string;
}

export interface Task {
    id: string;
    taskDescription: string;
    time: number;
    done: boolean;
}

export interface SortType {
    by: "taskDescription" | "time";
    direction: "asc" | "desc";
}