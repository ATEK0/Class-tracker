export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    state: string;
    userType: string;
    address: string;
    birthdate: string;
}

export interface Student extends User {
    class_id: string;
    class: string;
    class_director: string;
    process: string;
    parentID: string;
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    parentAddress: string;
}


export interface Teacher extends User {
    contact: string;
    subjects: string[];
    classes: string[];
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
    label: string;
    id: string;
    name: string;
}

export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'initial' | 'inherit';
