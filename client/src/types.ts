export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    userType: string;
    address: string;
    birthdate: string;
}

export interface Student extends User {
    classId: string;
    className: string;
    classHeadTeacher: string;
    pNumber: string;
    parentID: string;
    parentName: string;
    parentPhone: string;
    parentEmail: string;
    parentAddress: string;
    classType: string;
}


export interface Teacher extends User {
    contact: string;
    subjects: string[];
    classes: string[];
    state: string;
}


export interface TeacherListType {
    forEach(arg0: (option: any) => void): unknown;
    id: string;
    name: string;
    surname: string;
    teacher_id: number;
}

export interface ClassListType {
    forEach(arg0: (option: any) => void): unknown;
    grade: string;
    id: string;
    label: string;
}

export interface ClassTypeList {
    id: string;
    label: string;
    is_archived: number;
}

export interface SubjectListType {
    label: string;
    id: string;
    name: string;
}

export type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'initial' | 'inherit';
