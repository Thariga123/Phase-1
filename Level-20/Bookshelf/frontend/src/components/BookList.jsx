import React from 'react';
import BookCard from './BookCard';

export default function BookList({ books, onAdd, onRemove, onUpdate, isInCollection }) {
    return (
        <div className="book-list">
            {books.map(book => (
                <BookCard
                    key={book.id || book._id}
                    book={book}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                    isInCollection={isInCollection}
                />
            ))}
        </div>
    );
}
