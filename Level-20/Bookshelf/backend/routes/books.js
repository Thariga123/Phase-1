import React, { useState } from 'react';
import BookList from '../components/BookList';
import { useBooks } from '../context/BookContext';

export default function MyBooks() {
    const { books, removeBook, updateBook } = useBooks();
    const [filter, setFilter] = useState('All');

    const filteredBooks = filter === 'All' ? books : books.filter(book => book.category === filter);

    return (
        <div className="page">
            <h2>My Books</h2>
            <div className="filter-section">
                <label>Filter by Category: </label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Want to Read">Want to Read</option>
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Read">Read</option>
                </select>
            </div>
            <BookList books={filteredBooks} onRemove={removeBook} onUpdate={updateBook} isInCollection={true} />
        </div>
    );
}
