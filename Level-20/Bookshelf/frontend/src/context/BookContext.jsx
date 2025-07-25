import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
    };

    const addBook = async (book) => {
        const response = await axios.post('http://localhost:5000/api/books', book);
        setBooks([...books, response.data]);
    };

    const removeBook = async (id) => {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        setBooks(books.filter(book => book._id !== id));
    };

    const updateBook = async (id, updates) => {
        const response = await axios.put(`http://localhost:5000/api/books/${id}`, updates);
        setBooks(books.map(book => (book._id === id ? response.data : book)));
    };

    return (
        <BookContext.Provider value={{ books, addBook, removeBook, updateBook }}>
            {children}
        </BookContext.Provider>
    );
};

export const useBooks = () => useContext(BookContext);
