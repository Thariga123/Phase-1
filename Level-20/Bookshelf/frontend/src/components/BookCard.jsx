import React from 'react';

export default function BookCard({ book, onAdd, onRemove, onUpdate, isInCollection }) {
    const handleCategoryChange = (e) => {
        onUpdate(book._id, { category: e.target.value });
    };

    const handleRatingChange = (e) => {
        onUpdate(book._id, { rating: Number(e.target.value) });
    };

    const handleNotesChange = (e) => {
        onUpdate(book._id, { notes: e.target.value });
    };

    return (
        <div className="book-card">
            <img src={book.thumbnail} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.authors?.join(', ')}</p>
            {isInCollection ? (
                <>
                    <select value={book.category} onChange={handleCategoryChange}>
                        <option value="Want to Read">Want to Read</option>
                        <option value="Currently Reading">Currently Reading</option>
                        <option value="Read">Read</option>
                    </select>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={book.rating || ''}
                        placeholder="Rate 1-5"
                        onChange={handleRatingChange}
                    />
                    <textarea
                        value={book.notes || ''}
                        placeholder="Add your notes here..."
                        onChange={handleNotesChange}
                    />
                    <button onClick={() => onRemove(book._id)}>Remove</button>
                </>
            ) : (
                <button onClick={() => onAdd(book)}>Add</button>
            )}
        </div>
    );
}
