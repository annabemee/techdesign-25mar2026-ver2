import { Book, Student, Record } from './types';

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPj4anQ27Uzp0p0gmtALKZYyt97EVkyFJ3ctNtjl-2TJ4T4r8UozrIIWY4gXGvOxmvUnFeEyFK5sIRqMA2_2ACqd5IUnvpSaxI67Fo8RNlEy8-eBqqQS1Wb9kSDPuCnkuanuQ9L5uxV32uADh-qcDN5KbIOxmeAqls6im0vTEpPtw9CR_L6pegnOZtj0tqBheohzCzVFMpQwr-mbeRqeaK0H4q4hHecEPDrFETchU5aTUXvo-x5frSgNEbMYUcYyZeosH5m-TMyJk',
    status: 'available',
    category: 'Classic',
  },
  {
    id: '2',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF6Qjt7mwQpZP22bSBGXLWVfTAz9FW4KPVtPccWPAoxa9wge67qG74KfmJbQLz9IO2ojy6c5y0V5iMvS44oeEUwcdmF6QFdiA3xvZusvBlidg4TwdLF3N9ckzrWGa43V5Fz90stvJb1RM6XtA8aREWjpyp3wdAnfGwNuGjUCXqt6oHIunL51hIFEBGsbX0kHwRHrUtXVuU8iWPLqWbkiuZwGqjq7icpZ-KQnJzG97HotRaWVE6xHmrYFa0dENQeA6ZwwNs94-Fyds',
    status: 'borrowed',
    borrowerId: 'student-2',
    category: 'Science',
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBc35R4vnW8V1b32A4z7NdDV9XRfxjENxPbYLf8-a43j1pAu7qG3FfaLMw2wI6rjK7D0Ucf5ATFYhC4M696--iqV_99NdJT-DXWdgooXxe3KZ_xGDnD2DfjP15_2aTYmjltmZBkdpSZXRIXdsbtude092BNzKqDfggpqrPxcGH-eZFFWkax2ZM7tiQmcQFChgDmSE179ZTEIUrLi3kIGQh_GrZmfBpAPKXmzvSrnYslBUkLU4lpWenjVtOAR6aJK1tioGsea7G2ic',
    status: 'available',
    category: 'Classic',
  },
  {
    id: '4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4e1n1zjd3BVK-TXTh-G-4fx9Abmn6lUbCllUdweTAPCk9Mu7A3WNCDKqGCZXGnsmTXmKqEYkyJ5DD532uEU-UeSul0ujqY5KYN_Js8qcnMnQM4twnOod4Tji7vY05lfSHtk6skCZ37QRiMHocpG2yknwH6bK3N2Xh7WnGm3dOS4ilNijWKnwSLUmPkoP5jH4Y3frE9zr_UPVLw0gIGM_R9gB2baBjtQvrRhHhAvpZOvVx_DLpaqFPHA08x-zggZTIctTeeH61zuE',
    status: 'borrowed',
    borrowerId: 'student-4',
    category: 'Fantasy',
  },
  {
    id: '5',
    title: '1984',
    author: 'George Orwell',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApR5gmqDNqULKKZwNYfmjKfQqgwyOUNAjwep3zJ1Hwj0NTfuuVxPXHZINxHzD0O7KeT0OH7TPBgBEQUDtXYW0KraECnbnmnDu3N6CuCBirIeGoT9sNFeOqIfDNU25y2bpgxX3oLFOXPUfprWGJbA-6Xnb6sue6GBQrlDs3PUAT9mQyTDxGIEDEhy-8uz8jYH1kFR1FUEbkmdEKQbiZd9yxrmYa0jAxFjD8-NP66ksSVLNVmdSIBeucjNahGJ-Izr6mk99WSLimZ30',
    status: 'available',
    category: 'Dystopian',
  },
  {
    id: '6',
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWyT4S8cceeMl4G6nWH4MUh8K4a94QidlwrAycqpoLLx7LKPon6PZI1WOcpDksXbE-HYwyQpCd1BsV8yoYRpiXQnWdPRx9ziY6IG8lEVRSU6wLhc9kDppjYb-sFVqvn-nTl_EXt8KdifBlSCb0G7RDDJcv_J9GtAn0ZmG6pubJZ-taw8vKtgAEloezgTOWccZOW3xnzILosrPvc-Zo_f3kL6v7ogxmT04bIdUE7OWk9UeeDe7F9MKpLr-1BBGXOd-yk9BW2gVwXGg',
    status: 'available',
    category: 'Children',
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'student-1',
    name: 'Julian Thorne',
    grade: '4',
    section: 'A',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmBAkT2fO7mlYFwdWpkpTiTV33C_QWCRITp7-avcc2QPJno9BTilht8Lqoj0rsLeETfc_zxjZdXdxaHjU7JVOxUM9EC9LD0DicQzndyBOBiQd71se7QXZcl_Hrk4rICIfIrrC47wi7MqMipOg-9wqihLr5bOm6Ru8RnMsiRBS18NhJLF61UeYGZHrcF8YxJbiy8Y6NwdQx6vL4jlZEdz6qV2EQaEyYK0o_xuDjINBS1PKSi_bV0vukcrtPiB99fEBdMjq0l4_k1qc',
    status: 'reading',
    currentBookId: '1',
  },
  {
    id: 'student-2',
    name: 'Leo Sterling',
    grade: '4',
    section: 'A',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmFmFpxdLJk0dN7i3MNC81KIzHo1K4JH7EL-CeURl6ANQqrwt-erqX30hO7xHxvwGoBWJ92uc10WSLM8fmNocA57sv3LbAd3dm92SLQH4nltiX0IFXY9KcklQ8ktnJp0T2e6YoH-p62mC9vgL45XV1vXqamaWTy_YzVYYHv2SxVjkxQN390X3SxkI5Bw8m4KFUxThEueL-YjNURfaKIsY1U6D_ldQoMCnBS1GgA4HzMs8sv__7A550yZeglpe4iOMatKETE0tPS0Y',
    status: 'reading',
    currentBookId: '2',
  },
  {
    id: 'student-3',
    name: 'Maya Angelou',
    grade: '4',
    section: 'A',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmLu7qbTdYIVD5otLBF4k1sEirz9W5wlJpumvPd-7JCvnDRfbgvKCJ4b2YZVs-Kqtchoz0UJVQ1bTnBDOzPqtkBuagDLHyZSGQBizlc12f2WEsnloUHhOw-kBeervNPCWSz4yqd4CjwqxQiUU3mGNB2cq94tF5iCZCRRijQde6pjl6JqthNnkzLdA8HFbpDnfkvEDTpKt62jW3ybFgqyPUrYnz2bA-HvwwwGZR-Hh-MxKJO2NGBG_6PKEhmKZJPHiHBPFOE_rdD2Q',
    status: 'returned',
  },
  {
    id: 'student-4',
    name: 'Chloe Wright',
    grade: '4',
    section: 'B',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPPZcwlpSwbhOrxscQkCxzq3Fj87o0gTqk8B6AcUwSCuKISaxb-HGxXQ44c_hsy1wXNB-OVPW-RSJLaidNiC2ntDE85jZr8RL3gfKeRytwhazsPoHDUKYTRozZ__qxy89_V_GLekNgeQF3In1A31KuSdwn_cQUSUYg5hAj3xYkBrB9hM_UozPJmYtEm69Mtfq2LgQHicJGTR2twYi833eeQSbc8hDLVyfKlQ_OftR_G39amLMefoCCgVl2vcR1MvC24ptw5UFdyv4',
    status: 'reading',
    currentBookId: '4',
  }
];

export const MOCK_RECORDS: Record[] = [
  {
    id: 'rec-1',
    studentId: 'student-1',
    studentName: 'Julianne Moore',
    bookId: '6',
    bookTitle: 'The Secret Garden',
    type: 'return',
    timestamp: new Date(),
    details: 'Hardcover Edition',
  },
  {
    id: 'rec-2',
    studentId: 'student-2',
    studentName: 'Leo Sterling',
    bookId: '2',
    bookTitle: 'A Brief History of Time',
    type: 'borrow',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    details: 'Reference Section',
  }
];
