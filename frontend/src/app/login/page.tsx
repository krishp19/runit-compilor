'use client';

import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/redux/slices/authSlice';
import { FaLock, FaEnvelope, FaGithub, FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    setError('');
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Login failed');

        // Store in Redux
        dispatch(setAuth(data.access_token));

        // Store token in sessionStorage
        sessionStorage.setItem('access_token', data.access_token);

        // Redirect user to homepage or dashboard
        router.push('/');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, dispatch, router]
  );

  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-xl shadow-2xl transition-all hover:scale-[1.01]">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-white">Login to your account</h1>
          <p className="text-sm text-gray-400">Start coding with RunIt!</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-1">
                <FaEnvelope className="text-indigo-500" />
                <span>Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-1">
                <FaLock className="text-indigo-500" />
                <span>Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 transition-all text-sm"
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center px-3 py-1.5 border border-gray-600 rounded-lg text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 transition-all">
            <FaGithub className="h-4 w-4 mr-2" />
            GitHub
          </button>
          <button className="flex items-center justify-center px-3 py-1.5 border border-gray-600 rounded-lg text-sm font-medium text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 transition-all">
            <FaGoogle className="h-4 w-4 mr-2" />
            Google
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-indigo-500 hover:text-indigo-400 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
