te// AuthContext placeholder

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(sessionStorage.getItem('token'));
	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

	useEffect(() => {
		setToken(sessionStorage.getItem('token'));
		setUser(JSON.parse(sessionStorage.getItem('user')));
	}, []);

	const login = (token, userData) => {
		sessionStorage.setItem('token', token);
		sessionStorage.setItem('user', JSON.stringify(userData));
		setToken(token);
		setUser(userData);
	};

	const logout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('user');
		setToken(null);
		setUser(null);
	};

	const updateUser = (newUser) => {
		sessionStorage.setItem('user', JSON.stringify(newUser));
		setUser(newUser);
	};

	return (
		<AuthContext.Provider value={{ token, user, login, logout, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
};
