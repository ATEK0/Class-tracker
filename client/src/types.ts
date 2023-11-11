export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    state: string;
    type: string;
}

export interface TeacherList {
    id: string;
    name: string;
}

export interface ClassList {
    id: string;
    name: string;
    grade: string;
}

export interface SubjectListType {
    id: string;
    name: string;
}