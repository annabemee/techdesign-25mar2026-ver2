/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  History, 
  Search, 
  Plus, 
  Filter, 
  ArrowRight, 
  RotateCcw, 
  ShoppingBasket, 
  AlertCircle,
  Settings,
  CheckCircle2,
  HelpCircle,
  LogOut,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_BOOKS, MOCK_STUDENTS, MOCK_RECORDS } from './constants';
import { Book, Student, Record as LibraryRecord } from './types';

type Page = 'home' | 'catalog' | 'students' | 'records' | 'checkout' | 'add-book' | 'add-student' | 'membership';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [records, setRecords] = useState<LibraryRecord[]>(MOCK_RECORDS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const stats = useMemo(() => ({
    totalStudents: students.length,
    checkedOut: books.filter(b => b.status === 'borrowed' || b.status === 'overdue').length,
    overdue: books.filter(b => b.status === 'overdue').length,
  }), [books, students]);

  const handleAddBook = (newBook: Book) => {
    setBooks(prev => [newBook, ...prev]);
    setCurrentPage('catalog');
  };

  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
    setCurrentPage('students');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage stats={stats} records={records} books={books.slice(0, 4)} onNavigate={setCurrentPage} />;
      case 'catalog': return <CatalogPage books={books} onAdd={() => setCurrentPage('add-book')} />;
      case 'students': return <StudentsPage students={students} onAdd={() => setCurrentPage('add-student')} />;
      case 'records': return <RecordsPage records={records} />;
      case 'add-book': return <AddBookForm onCancel={() => setCurrentPage('home')} onSubmit={handleAddBook} />;
      case 'add-student': return <AddStudentForm onCancel={() => setCurrentPage('home')} onSubmit={handleAddStudent} />;
      case 'membership': return <MembershipForm onCancel={() => setCurrentPage('home')} />;
      case 'checkout': return (
        <CheckoutPage 
          students={students} 
          books={books} 
          selectedStudent={selectedStudent}
          onSelectStudent={setSelectedStudent}
          onNavigate={setCurrentPage}
        />
      );
      default: return <HomePage stats={stats} records={records} books={books.slice(0, 4)} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body pb-24 md:pb-0 md:pl-20">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/60 backdrop-blur-md md:pl-20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center overflow-hidden border-2 border-primary/20">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs6d30pcGltsiwNZtd5tBXEoSQe0lyUYuNIajm_5qhYjM7ZVRb0klQ2apy8tapJ5VIZhgpKpnbu3eZZXo82kaXx9an7IWweTOjpjxzbGYhATuD3a7g8DNgliphmb_AJWoTldJt6lbpitijgOEgPzZfKO2ZMGtIB-YUx_mTlWEliqpnC1uLelCuLIKLhR8oQT1Nil_fNmZQQgzlCWZrDxCubmqjDxqI8aX7jVGlQhArZjS4veOzyvFEcGgM8jblZozSFEIa4wW45U" 
                alt="Teacher" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="font-headline font-black text-primary text-2xl tracking-tight">Scholastic Atelier</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
              <Search className="w-6 h-6 text-primary" />
            </button>
            <button 
              onClick={() => setCurrentPage('checkout')}
              className="hidden md:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
            >
              <ShoppingBasket className="w-4 h-4" />
              Student Checkout
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center py-8 bg-surface-container-low z-50 border-r border-outline/10">
        <div className="mb-12">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <nav className="flex flex-col gap-8">
          <NavIcon active={currentPage === 'home'} onClick={() => setCurrentPage('home')} icon={<Home />} label="Home" />
          <NavIcon active={currentPage === 'students'} onClick={() => setCurrentPage('students')} icon={<Users />} label="Students" />
          <NavIcon active={currentPage === 'catalog'} onClick={() => setCurrentPage('catalog')} icon={<BookOpen />} label="Books" />
          <NavIcon active={currentPage === 'records'} onClick={() => setCurrentPage('records')} icon={<History />} label="Records" />
          <NavIcon active={currentPage === 'membership'} onClick={() => setCurrentPage('membership')} icon={<FileText />} label="Apply" />
        </nav>
        <div className="mt-auto flex flex-col gap-6">
          <button className="p-3 rounded-full text-on-surface-variant hover:bg-white transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl border-t border-outline/10 px-4 pb-8 pt-3 flex justify-around items-center md:hidden z-50">
        <MobileNavItem active={currentPage === 'home'} onClick={() => setCurrentPage('home')} icon={<Home />} label="Home" />
        <MobileNavItem active={currentPage === 'students'} onClick={() => setCurrentPage('students')} icon={<Users />} label="Students" />
        <MobileNavItem active={currentPage === 'catalog'} onClick={() => setCurrentPage('catalog')} icon={<BookOpen />} label="Books" />
        <MobileNavItem active={currentPage === 'records'} onClick={() => setCurrentPage('records')} icon={<History />} label="Records" />
        <MobileNavItem active={currentPage === 'membership'} onClick={() => setCurrentPage('membership')} icon={<FileText />} label="Apply" />
      </nav>
    </div>
  );
}

function NavIcon({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`relative group p-3 rounded-2xl transition-all duration-300 ${active ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:bg-white'}`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      <span className="absolute left-full ml-4 px-2 py-1 bg-on-surface text-surface text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </button>
  );
}

function MobileNavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${active ? 'bg-primary text-white' : 'text-on-surface-variant'}`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}

// --- Pages ---

function HomePage({ stats, records, books, onNavigate }: { stats: any, records: LibraryRecord[], books: Book[], onNavigate: (p: Page) => void }) {
  return (
    <div className="space-y-10 pb-12">
      <section>
        <h1 className="font-headline font-extrabold text-4xl text-on-surface mb-2 tracking-tight">Welcome back, Professor.</h1>
        <p className="text-on-surface-variant font-medium">Your classroom library is thriving today. 4 new students added this week.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users />} title="Total Students" value={stats.totalStudents} subtitle="Active Readers" color="bg-surface-container-low" textColor="text-primary" />
        <StatCard icon={<BookOpen />} title="Checked Out" value={stats.checkedOut} subtitle="Books in hands" color="bg-primary" textColor="text-white" isPrimary />
        <StatCard icon={<History />} title="Overdue" value={stats.overdue} subtitle="Action required" color="bg-tertiary-container" textColor="text-tertiary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline font-bold text-2xl">Library Collection</h2>
              <button onClick={() => onNavigate('catalog')} className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {books.map(book => (
                <div key={book.id} className="group cursor-pointer">
                  <div className="aspect-[2/3] bg-stone-200 rounded-xl mb-3 overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 relative">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 book-spine-gradient" />
                  </div>
                  <h4 className="font-headline font-bold text-sm text-on-surface truncate">{book.title}</h4>
                  <p className="text-on-surface-variant text-xs">{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
          <div className="bg-surface-container-low rounded-3xl p-8">
            <h2 className="font-headline font-bold text-xl mb-8">Recent Activity</h2>
            <div className="space-y-8">
              {records.map(record => (
                <div key={record.id} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${record.type === 'return' ? 'bg-secondary-container text-secondary' : 'bg-primary-container text-primary'}`}>
                    {record.type === 'return' ? <RotateCcw className="w-5 h-5" /> : <ShoppingBasket className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">
                      {record.studentName} {record.type === 'return' ? 'returned' : 'checked out'} <span className="text-primary italic">{record.bookTitle}</span>
                    </p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mt-1">
                      {new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(-Math.floor((Date.now() - record.timestamp.getTime()) / (1000 * 60 * 60)), 'hour')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => onNavigate('records')} className="w-full mt-8 py-3 bg-surface-container-high rounded-xl font-bold text-sm text-on-surface-variant hover:bg-white transition-colors">
              See all history
            </button>
          </div>

          <div 
            onClick={() => onNavigate('add-book')}
            className="bg-tertiary text-on-tertiary p-8 rounded-3xl relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform duration-200"
          >
            <div className="relative z-10">
              <h3 className="font-headline font-bold text-2xl mb-2">Grow your collection</h3>
              <p className="text-sm opacity-80 mb-6">Catalog a new addition to the classroom bookshelf in seconds.</p>
              <div className="inline-flex items-center gap-2 bg-on-tertiary text-tertiary px-6 py-2 rounded-full font-bold text-sm">
                Add New Book <Plus className="w-4 h-4" />
              </div>
            </div>
            <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20 transform group-hover:scale-110 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, color, textColor, isPrimary }: { icon: React.ReactNode, title: string, value: number, subtitle: string, color: string, textColor: string, isPrimary?: boolean }) {
  return (
    <div className={`${color} p-8 rounded-3xl flex flex-col justify-between min-h-[220px] relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-transform duration-200 ${isPrimary ? 'shadow-xl' : ''}`}>
      <div className="z-10">
        <div className={`${textColor} mb-4 block`}>{React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8' })}</div>
        <h3 className={`font-headline font-bold text-xl mb-1 ${isPrimary ? 'text-white' : 'text-on-surface'}`}>{title}</h3>
        <p className={`text-sm ${isPrimary ? 'opacity-80 text-white' : 'text-on-surface-variant'}`}>{subtitle}</p>
      </div>
      <div className={`text-6xl font-headline font-black tracking-tighter z-10 ${textColor}`}>{value.toString().padStart(2, '0')}</div>
      {isPrimary && <BookOpen className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10" />}
    </div>
  );
}

function CatalogPage({ books, onAdd }: { books: Book[], onAdd: () => void }) {
  return (
    <div className="pb-12">
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-label text-[11px] font-semibold tracking-widest uppercase text-tertiary mb-2 block">Curated Collection</span>
            <h2 className="font-headline font-extrabold text-4xl lg:text-5xl text-on-surface tracking-tight">Library Catalog</h2>
            <p className="text-on-surface-variant mt-3 max-w-xl text-lg">Manage your classroom's literary treasures, track student loans, and discover new growth.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onAdd} className="bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-all">
              <Plus className="w-5 h-5" />
              <span>Add Book</span>
            </button>
            <button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-opacity-80 transition-all">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {books.map(book => (
          <div key={book.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-low transition-transform duration-300 group-hover:-translate-y-2 shadow-md">
              <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 book-spine-gradient" />
              <div className="absolute top-3 right-3">
                <span className={`backdrop-blur-sm text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter ${book.status === 'available' ? 'bg-primary-container/90 text-on-primary-container' : 'bg-tertiary-container/90 text-on-tertiary-container'}`}>
                  {book.status === 'available' ? 'In Library' : 'Borrowed'}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-headline font-bold text-on-surface leading-tight">{book.title}</h3>
              <p className="text-sm text-on-surface-variant">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentsPage({ students, onAdd }: { students: Student[], onAdd: () => void }) {
  return (
    <div className="pb-12">
      <section className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-headline font-extrabold text-4xl lg:text-5xl text-on-surface mb-2 tracking-tight">Classroom Roster</h1>
            <p className="text-on-surface-variant text-lg">Curating student literary journeys and borrowing trends for the Autumn Semester.</p>
          </div>
          <button onClick={onAdd} className="bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition-all">
            <Plus className="w-5 h-5" />
            <span>Add Student</span>
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-between h-32">
          <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Active Readers</span>
          <span className="font-headline font-bold text-3xl text-primary">{students.length} Students</span>
        </div>
        <div className="bg-tertiary-container p-6 rounded-xl flex flex-col justify-between h-32">
          <span className="text-xs uppercase tracking-widest text-on-tertiary-container font-bold">Return Rate</span>
          <span className="font-headline font-bold text-3xl text-tertiary">98% Weekly</span>
        </div>
        <div className="bg-secondary-container p-6 rounded-xl flex flex-col justify-between h-32">
          <span className="text-xs uppercase tracking-widest text-on-secondary-container font-bold">Engagement</span>
          <span className="font-headline font-bold text-3xl text-secondary">High</span>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-3xl p-2 md:p-4">
        <div className="hidden md:grid grid-cols-12 px-6 py-4 text-[11px] uppercase tracking-widest text-on-surface-variant font-bold">
          <div className="col-span-4">Student Identity</div>
          <div className="col-span-4">Current Selection</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>
        <div className="space-y-2">
          {students.map(student => (
            <div key={student.id} className="grid grid-cols-1 md:grid-cols-12 items-center bg-surface-container-lowest p-6 md:px-6 md:py-4 rounded-2xl hover:bg-white transition-all group">
              <div className="col-span-4 flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex-shrink-0 overflow-hidden border-2 border-primary/10">
                  <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-on-surface text-lg leading-tight">{student.name}</h3>
                  <span className="text-xs text-on-surface-variant">Grade {student.grade} • Section {student.section}</span>
                </div>
              </div>
              <div className="col-span-4 mb-4 md:mb-0">
                <div className="flex items-center gap-2">
                  <BookOpen className={`w-4 h-4 ${student.currentBookId ? 'text-tertiary' : 'text-outline-variant'}`} />
                  <span className={`font-medium ${student.currentBookId ? 'text-on-surface' : 'text-on-surface-variant italic'}`}>
                    {student.currentBookId ? MOCK_BOOKS.find(b => b.id === student.currentBookId)?.title : 'No current book'}
                  </span>
                </div>
              </div>
              <div className="col-span-2 mb-6 md:mb-0">
                <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${student.status === 'reading' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  {student.status}
                </span>
              </div>
              <div className="col-span-2 text-right">
                <button className="bg-primary text-white text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:shadow-lg transition-all active:scale-95">Manage</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecordsPage({ records }: { records: LibraryRecord[] }) {
  return (
    <div className="pb-12 max-w-4xl mx-auto">
      <section className="mb-12">
        <h2 className="font-headline font-extrabold text-4xl text-on-surface mb-2 tracking-tight">Records</h2>
        <p className="text-on-surface-variant text-lg">A chronological ledger of classroom literary exchanges.</p>
      </section>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow bg-surface-container-low rounded-xl px-4 py-3 flex items-center gap-3">
          <Filter className="w-5 h-5 text-outline" />
          <input className="bg-transparent border-none focus:ring-0 w-full text-on-surface placeholder:text-outline-variant" placeholder="Search by student or book title..." type="text" />
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg text-sm font-semibold">This Week</span>
          <span className="inline-flex items-center px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-lg text-sm font-semibold">All Categories</span>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="sticky top-20 bg-surface/90 backdrop-blur-sm py-2 z-10 mb-4">
            <span className="uppercase tracking-widest text-xs font-bold text-outline">Recent Transactions</span>
          </div>
          <div className="space-y-4">
            {records.map(record => (
              <div key={record.id} className="group flex items-center gap-6 p-5 rounded-2xl bg-surface-container-lowest transition-all duration-300 hover:bg-white hover:shadow-sm">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${record.type === 'return' ? 'bg-primary-container text-on-primary-container' : 'bg-tertiary-container text-on-tertiary-container'}`}>
                  {record.type === 'return' ? <RotateCcw className="w-6 h-6" /> : <ShoppingBasket className="w-6 h-6" />}
                </div>
                <div className="flex-grow">
                  <p className="text-on-surface leading-relaxed">
                    <span className="font-bold">{record.studentName}</span> {record.type === 'return' ? 'returned' : 'borrowed'} <span className="font-bold text-primary">{record.bookTitle}</span>
                  </p>
                  <p className="text-sm text-on-surface-variant mt-0.5">{record.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {record.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MembershipForm({ onCancel }: { onCancel: () => void }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-20"
      >
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="font-headline font-extrabold text-4xl text-on-surface mb-4">Application Received!</h2>
        <p className="text-on-surface-variant text-lg mb-8">Your membership application has been submitted for review. We'll notify you once it's approved.</p>
        <button onClick={onCancel} className="bg-primary text-white px-8 py-3 rounded-xl font-bold">
          Return Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-10">
        <span className="font-label text-[11px] font-semibold tracking-widest uppercase text-primary mb-2 block">Join the Atelier</span>
        <h2 className="font-headline font-extrabold text-4xl lg:text-5xl text-on-surface tracking-tight">Library Membership Form</h2>
        <p className="text-on-surface-variant mt-3 text-lg">Apply for a Scholastic Atelier membership to unlock full borrowing privileges and reading tracking.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }} className="bg-white border border-outline/10 p-10 rounded-[2.5rem] shadow-xl shadow-primary/5 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">First Name</label>
            <input required className="w-full bg-surface-container-lowest border-2 border-transparent rounded-2xl px-5 py-4 focus:border-primary focus:bg-white transition-all outline-none" placeholder="Julianne" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Last Name</label>
            <input required className="w-full bg-surface-container-lowest border-2 border-transparent rounded-2xl px-5 py-4 focus:border-primary focus:bg-white transition-all outline-none" placeholder="Moore" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Email Address</label>
          <input required type="email" className="w-full bg-surface-container-lowest border-2 border-transparent rounded-2xl px-5 py-4 focus:border-primary focus:bg-white transition-all outline-none" placeholder="julianne@example.com" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Grade Level</label>
            <select className="w-full bg-surface-container-lowest border-2 border-transparent rounded-2xl px-5 py-4 focus:border-primary focus:bg-white transition-all outline-none appearance-none">
              <option>Grade 1</option>
              <option>Grade 2</option>
              <option>Grade 3</option>
              <option>Grade 4</option>
              <option>Grade 5</option>
              <option>Grade 6</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Class Section</label>
            <input required className="w-full bg-surface-container-lowest border-2 border-transparent rounded-2xl px-5 py-4 focus:border-primary focus:bg-white transition-all outline-none" placeholder="e.g. 4-A" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70">Why do you want to join?</label>
          <textarea rows={4} className="w-full bg-surface-container-lowest border-2 border-transparent rounded-2xl px-5 py-4 focus:border-primary focus:bg-white transition-all outline-none resize-none" placeholder="Tell us about your favorite books..." />
        </div>

        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <input type="checkbox" required className="w-5 h-5 rounded border-primary text-primary focus:ring-primary" />
          <label className="text-sm text-on-surface-variant">I agree to the library terms and promise to handle books with care.</label>
        </div>

        <div className="pt-4 flex flex-col md:flex-row gap-4">
          <button type="submit" className="flex-grow bg-primary text-white font-bold py-5 rounded-[1.5rem] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-lg">
            Submit Application
          </button>
          <button type="button" onClick={onCancel} className="px-10 bg-surface-container-high text-on-surface-variant font-bold rounded-[1.5rem] hover:bg-surface-container-highest transition-all">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function AddBookForm({ onCancel, onSubmit }: { onCancel: () => void, onSubmit: (b: Book) => void }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Classic',
    coverUrl: 'https://picsum.photos/seed/book/400/600'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'available'
    });
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight">New Book Application</h2>
        <p className="text-on-surface-variant text-lg">Catalog a new addition to your classroom library.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container-low p-8 rounded-3xl space-y-6 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Book Title</label>
          <input 
            required
            value={formData.title}
            onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
            className="w-full bg-white border-2 border-outline/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all"
            placeholder="e.g. The Great Gatsby"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Author Name</label>
          <input 
            required
            value={formData.author}
            onChange={e => setFormData(f => ({ ...f, author: e.target.value }))}
            className="w-full bg-white border-2 border-outline/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all"
            placeholder="e.g. F. Scott Fitzgerald"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData(f => ({ ...f, category: e.target.value }))}
              className="w-full bg-white border-2 border-outline/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all"
            >
              <option>Classic</option>
              <option>Science</option>
              <option>Fantasy</option>
              <option>History</option>
              <option>Dystopian</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Cover Image Seed</label>
            <input 
              value={formData.coverUrl.split('/').pop()}
              onChange={e => setFormData(f => ({ ...f, coverUrl: `https://picsum.photos/seed/${e.target.value}/400/600` }))}
              className="w-full bg-white border-2 border-outline/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all"
              placeholder="e.g. mystery"
            />
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button type="submit" className="flex-grow bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all">
            Catalog Book
          </button>
          <button type="button" onClick={onCancel} className="px-8 bg-surface-container-high text-on-surface-variant font-bold rounded-2xl hover:bg-white transition-all">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function AddStudentForm({ onCancel, onSubmit }: { onCancel: () => void, onSubmit: (s: Student) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    grade: '4',
    section: 'A',
    avatarUrl: 'https://picsum.photos/seed/student/200/200'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'returned'
    });
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight">Student Registration</h2>
        <p className="text-on-surface-variant text-lg">Add a new reader to your classroom roster.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container-low p-8 rounded-3xl space-y-6 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Full Name</label>
          <input 
            required
            value={formData.name}
            onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
            className="w-full bg-white border-2 border-outline/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all"
            placeholder="e.g. Julianne Moore"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Grade</label>
            <input 
              required
              value={formData.grade}
              onChange={e => setFormData(f => ({ ...f, grade: e.target.value }))}
              className="w-full bg-white border-2 border-outline/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all"
              placeholder="e.g. 4"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Section</label>
            <input 
              required
              value={formData.section}
              onChange={e => setFormData(f => ({ ...f, section: e.target.value }))}
              className="w-full bg-white border-2 border-outline/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all"
              placeholder="e.g. A"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">Avatar Seed</label>
          <input 
            value={formData.avatarUrl.split('/').pop()}
            onChange={e => setFormData(f => ({ ...f, avatarUrl: `https://picsum.photos/seed/${e.target.value}/200/200` }))}
            className="w-full bg-white border-2 border-outline/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-0 transition-all"
            placeholder="e.g. happy"
          />
        </div>

        <div className="pt-4 flex gap-4">
          <button type="submit" className="flex-grow bg-primary text-white font-bold py-4 rounded-2xl shadow-lg hover:opacity-90 transition-all">
            Register Student
          </button>
          <button type="button" onClick={onCancel} className="px-8 bg-surface-container-high text-on-surface-variant font-bold rounded-2xl hover:bg-white transition-all">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function CheckoutPage({ students, books, selectedStudent, onSelectStudent, onNavigate }: { students: Student[], books: Book[], selectedStudent: Student | null, onSelectStudent: (s: Student) => void, onNavigate: (p: Page) => void }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAction = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onSelectStudent(null as any);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white">
          <CheckCircle2 className="w-16 h-16" />
        </motion.div>
        <h2 className="text-4xl font-headline font-black text-primary">Success!</h2>
        <p className="text-xl text-on-surface-variant">Your transaction has been recorded.</p>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight mb-2">Who are you?</h2>
            <p className="text-on-surface-variant text-lg">Tap your face to start borrowing books.</p>
          </div>
          <button onClick={() => onNavigate('home')} className="p-3 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-variant transition-colors">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {students.map(student => (
            <button 
              key={student.id}
              onClick={() => onSelectStudent(student)}
              className={`relative flex flex-col items-center p-4 rounded-[2rem] transition-all duration-300 ${selectedStudent?.id === student.id ? 'bg-primary-container ring-4 ring-primary scale-105 shadow-xl' : 'bg-surface-container-lowest hover:bg-surface-container-low active:scale-95'}`}
            >
              <div className={`w-24 h-24 rounded-full overflow-hidden mb-4 transition-all ${selectedStudent?.id === student.id ? 'border-4 border-on-primary-container shadow-inner' : 'opacity-80'}`}>
                <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className={`font-headline font-bold text-lg ${selectedStudent?.id === student.id ? 'text-on-primary-container' : 'text-on-surface'}`}>{student.name.split(' ')[0]} {student.name.split(' ')[1]?.[0]}.</span>
              {selectedStudent?.id === student.id && (
                <div className="absolute -top-2 -right-2 bg-primary text-white p-1 rounded-full shadow-md">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {selectedStudent && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {selectedStudent.currentBookId ? (
            <section className="mb-12">
              <div className="bg-tertiary-container rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-tertiary/10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-24 bg-tertiary rounded-lg shadow-lg flex items-center justify-center text-on-tertiary transform -rotate-3 overflow-hidden">
                    <img src={books.find(b => b.id === selectedStudent.currentBookId)?.coverUrl} alt="Current Book" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-2xl text-on-tertiary-container">Ready to return?</h3>
                    <p className="text-on-tertiary-container/80 text-lg">You are currently reading: <span className="font-bold">{books.find(b => b.id === selectedStudent.currentBookId)?.title}</span></p>
                  </div>
                </div>
                <button 
                  onClick={handleAction}
                  className="w-full md:w-auto px-10 py-5 bg-tertiary text-on-tertiary rounded-full font-headline font-extrabold text-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <RotateCcw className="w-6 h-6" />
                  Return my book
                </button>
              </div>
            </section>
          ) : (
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline font-extrabold text-3xl text-on-surface tracking-tight">Pick a new adventure</h2>
                <div className="flex gap-2">
                  <span className="px-4 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold">Fantasy</span>
                  <span className="px-4 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-bold">Science</span>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                {books.filter(b => b.status === 'available').map(book => (
                  <div key={book.id} className="group flex flex-col bg-surface-container-lowest rounded-[2rem] p-4 transition-all hover:shadow-xl hover:-translate-y-2">
                    <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-surface-container shadow-md">
                      <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-secondary shadow-sm">New</div>
                    </div>
                    <h4 className="font-headline font-bold text-lg text-on-surface mb-1 line-clamp-1">{book.title}</h4>
                    <p className="text-on-surface-variant text-sm mb-4">By {book.author}</p>
                    <button 
                      onClick={handleAction}
                      className="mt-auto w-full py-4 bg-primary text-white rounded-2xl font-headline font-bold text-lg shadow-md active:scale-90 transition-all"
                    >
                      Borrow
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      )}

      {/* Help FAB */}
      <button className="fixed bottom-28 right-6 w-14 h-14 bg-white text-primary rounded-full shadow-lg border border-primary/10 flex items-center justify-center active:scale-90 transition-transform">
        <HelpCircle className="w-8 h-8" />
      </button>
    </div>
  );
}
