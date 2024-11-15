export type Snomed = {
    conceptId?: string;
    active?: boolean;
    definitionStatus?: string;
    moduleId?: string;
    effectiveTime?: string;
    fsn?: Fsn;
    pt?: Fsn;
    id?: string;
    idAndFsnTerm?: string;
}

export type Fsn = {
    term?: string;
    lang?: string;
}