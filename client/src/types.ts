export interface User {
    id: string;
    email: string;
    name: string;
    surname: string;
    state: string;
    type: string;
}

export interface TeacherListType {
    forEach(arg0: (option: any) => void): unknown;
    id: string;
    name: string;
    surname: string;
}

export interface ClassListType {
    forEach(arg0: (option: any) => void): unknown;
    grade: string;
    id: string;
    label: string;
}

export interface SubjectListType {
    id: string;
    name: string;
}

export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'initial' | 'inherit';
