import React, { useState } from 'react';
import SearchBar from '../components/Searchbar';
import BookList from '../components/BookList';
import { useBooks } from '../context/BookContext';

export default function Home() {
    const { addBook } = useBooks();
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className="page">
            <h2>Search Books</h2>
            <SearchBar setSearchResults={setSearchResults} />
            <BookList books={searchResults} onAdd={addBook} isInCollection={false} />
        </div>
    );
}

