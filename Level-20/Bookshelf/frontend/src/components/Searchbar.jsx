import React, { useState } from 'react';
import axios from 'axios';

export default function SearchBar({ setSearchResults }) {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        if (!query) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/books/search?q=${query}`);
            const formattedResults = response.data.map(item => ({
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors || [],
                thumbnail: item.volumeInfo.imageLinks?.thumbnail || ''
            }));
            setSearchResults(formattedResults);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books..."
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
    );
}


