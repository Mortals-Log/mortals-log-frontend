// @/utils/api

/* eslint-disable storybook/default-exports */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const RequestApi = async (endpoint: string, options?: RequestInit) => {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, options);

		if (!response.ok) {
			throw new Error(`API 오류: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('API 통신 중 에러가 발생했습니다:', error);
		throw error;
	}
};
