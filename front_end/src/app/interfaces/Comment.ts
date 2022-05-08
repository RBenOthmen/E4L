export interface Comment {
    taskManagerId: number,
    id: number,
    userId: number,
    comment: string,
    dateCreated: Date,
    state: boolean,
}