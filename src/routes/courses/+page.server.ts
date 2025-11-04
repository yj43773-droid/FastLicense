import { fetchCourses } from '$lib/api';
import { getMockCourses } from '$lib/mocks/courses';
import type { CourseSummary, DifficultyLevel } from '$lib/types';
import type { PageServerLoad } from './$types';

const isDifficulty = (value: string | null): value is DifficultyLevel | 'all' => {
	return value === 'beginner' || value === 'intermediate' || value === 'advanced' || value === 'all';
};

export const load: PageServerLoad = async ({ fetch, url, locals }) => {
	const search = url.searchParams.get('search') ?? '';
	const difficultyParam = url.searchParams.get('difficulty');
	const difficulty = isDifficulty(difficultyParam) ? difficultyParam : 'all';
	const sort = url.searchParams.get('sort') ?? 'popular';
	const cursor = url.searchParams.get('cursor');

	const result = await fetchCourses(fetch, {
		search: search || null,
		difficulty,
		sort,
		cursor,
		limit: 9,
		token: locals.accessToken ?? undefined
	});

	let courses: CourseSummary[] = getMockCourses(9);
	let nextCursor: string | null = null;
	let usedFallback = false;

	if (result.data?.items) {
		courses = result.data.items;
		nextCursor = result.data.nextCursor ?? null;
	} else {
		usedFallback = true;
	}

	return {
		courses,
		nextCursor,
		filters: {
			search,
			difficulty,
			sort
		},
		usedFallback,
		error: result.error ?? null
	};
};
