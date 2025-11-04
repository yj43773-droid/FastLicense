import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { CourseListResponse, DifficultyLevel } from '$lib/types';
import { getMockCourses } from '$lib/mocks/courses';

/**
 * GET /api/courses
 * 강의 목록 조회 (필터/검색/정렬 지원)
 *
 * Query params:
 * - search: string (제목/강사명 검색)
 * - difficulty: DifficultyLevel | 'all'
 * - sort: 'latest' | 'popular' | 'priceAsc' | 'priceDesc'
 * - cursor: string (pagination)
 * - limit: number (default: 20)
 */
export const GET: RequestHandler = async ({ url, locals }) => {
	try {
		// Query params 파싱
		const search = url.searchParams.get('search');
		const difficulty = url.searchParams.get('difficulty') as DifficultyLevel | 'all' | null;
		const sort = url.searchParams.get('sort');
		const cursor = url.searchParams.get('cursor');
		const limit = parseInt(url.searchParams.get('limit') ?? '20', 10);

		// TODO: Supabase 연동
		// const { data, error } = await supabase
		//   .from('courses')
		//   .select('*')
		//   .eq('is_active', true)
		//   .ilike('title', search ? `%${search}%` : '%')
		//   .limit(limit);

		// 임시: 목업 데이터 반환
		const mockCourses = getMockCourses(limit);

		// 검색어 필터 (목업 데이터에 적용)
		let filteredCourses = mockCourses;
		if (search) {
			const searchLower = search.toLowerCase();
			filteredCourses = filteredCourses.filter(
				(course) =>
					course.title.toLowerCase().includes(searchLower) ||
					course.instructor.toLowerCase().includes(searchLower)
			);
		}

		// 난이도 필터
		if (difficulty && difficulty !== 'all') {
			filteredCourses = filteredCourses.filter((course) => course.difficulty === difficulty);
		}

		// 정렬
		if (sort === 'priceAsc') {
			filteredCourses.sort((a, b) => (a.salePrice ?? a.originalPrice) - (b.salePrice ?? b.originalPrice));
		} else if (sort === 'priceDesc') {
			filteredCourses.sort((a, b) => (b.salePrice ?? b.originalPrice) - (a.salePrice ?? a.originalPrice));
		}

		const response: CourseListResponse = {
			items: filteredCourses,
			nextCursor: cursor && filteredCourses.length >= limit ? `cursor_${Date.now()}` : null
		};

		return json(response);
	} catch (error) {
		console.error('Error fetching courses:', error);
		return json(
			{
				error: {
					code: 'INTERNAL_ERROR',
					message: '강의 목록을 불러오는 중 오류가 발생했습니다.'
				}
			},
			{ status: 500 }
		);
	}
};
