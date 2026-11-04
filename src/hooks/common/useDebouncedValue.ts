import { useEffect, useState } from 'react';

/** 값이 바뀐 뒤 delayMs 동안 더 바뀌지 않으면 그 값을 돌려준다. 검색창에서 글자를 칠 때마다 찾지 않고 입력이 멈춘 뒤에 찾는 데 쓴다. */
export const useDebouncedValue = <T>(value: T, delayMs = 250): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(value), delayMs);
		return () => clearTimeout(timer);
	}, [value, delayMs]);

	return debouncedValue;
};
