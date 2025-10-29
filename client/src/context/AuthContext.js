// AuthContext placeholder

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	useEffect(() => {
		setToken(localStorage.getItem('token'));
		setUser(JSON.parse(localStorage.getItem('user')));
	}, []);

	const login = (token, userData) => {
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(userData));
		setToken(token);
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setToken(null);
		setUser(null);
	};

	const updateUser = (newUser) => {
		localStorage.setItem('user', JSON.stringify(newUser));
		setUser(newUser);
	};

	return (
		<AuthContext.Provider value={{ token, user, login, logout, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
};
