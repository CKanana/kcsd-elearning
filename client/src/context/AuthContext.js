// AuthContext placeholder

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [user, setUser] = useState(null);

	useEffect(() => {
		setToken(localStorage.getItem('token'));
	}, []);

	const login = (token, userData) => {
		localStorage.setItem('token', token);
		setToken(token);
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ token, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
