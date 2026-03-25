export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  status: 'available' | 'borrowed' | 'overdue';
  borrowerId?: string;
  category: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  avatarUrl: string;
  currentBookId?: string;
  status: 'reading' | 'returned' | 'late';
}

export interface Record {
  id: string;
  studentId: string;
  studentName: string;
  bookId: string;
  bookTitle: string;
  type: 'borrow' | 'return';
  timestamp: Date;
  details: string;
}
