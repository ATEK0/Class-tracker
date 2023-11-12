export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    state: string;
    type: string;
}

export interface TeacherListType {
    id: string;
    name: string;
    surname: string;
}

export interface ClassListType {
    grade: string;
    id: string;
    label: string;
}

export interface SubjectListType {
    id: string;
    name: string;
}