<script lang="ts">
	let status = $state<string | null>(null);
	let loading = $state(false);

	const callAction = async (action: 'set' | 'clear') => {
		loading = true;
		status = null;
		try {
			const response = await fetch('/dev/mock-session', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ action })
			});
			const result = (await response.json()) as { message?: string };
			status = result.message ?? (action === 'set' ? '세션이 설정되었습니다.' : '세션이 삭제되었습니다.');
		} catch (error) {
			status =
				error instanceof Error ? error.message : '요청을 처리할 수 없습니다. 콘솔을 확인해주세요.';
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>Mock Session Helper | FastSaaS</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-3xl border border-base-300 bg-base-100 p-8 shadow-lg">
	<header class="space-y-3">
		<h1 class="text-3xl font-semibold">Mock Session Helper</h1>
		<p class="text-sm text-base-content/70 leading-relaxed">
			백엔드가 준비되지 않은 상태에서도 보호 페이지를 테스트할 수 있도록
			<code class="badge badge-sm badge-outline">sb-access-token</code> 쿠키를 설정하거나 제거합니다.
		</p>
	</header>

	<div class="grid gap-4 md:grid-cols-2">
		<button
			type="button"
			class="btn btn-primary btn-lg"
			onclick={() => callAction('set')}
			disabled={loading}
			class:loading={loading}
		>
			모의 로그인 쿠키 설정
		</button>
		<button
			type="button"
			class="btn btn-outline btn-error btn-lg"
			onclick={() => callAction('clear')}
			disabled={loading}
			class:loading={loading}
		>
			쿠키 제거
		</button>
	</div>

	{#if status}
		<div role="status" class="alert alert-info text-sm">
			{status}
		</div>
	{/if}

	<section class="space-y-4 rounded-2xl border border-base-300 bg-base-100 p-6">
		<h2 class="text-xl font-semibold">빠른 확인용 링크</h2>
		<p class="text-sm text-base-content/70">
			아래 링크는 목업 데이터가 자동으로 주입되는 경로들입니다. 보호 페이지는 위의 “모의 로그인” 버튼을 눌러
			세션을 설정한 뒤 이동하면 전체 UI를 확인할 수 있습니다.
		</p>
		<div class="grid gap-3 sm:grid-cols-2">
			<a class="btn btn-sm btn-outline justify-start" href="/">/ (랜딩)</a>
			<a class="btn btn-sm btn-outline justify-start" href="/courses">/courses</a>
			<a class="btn btn-sm btn-outline justify-start" href="/courses/mock-course-1">
				/courses/mock-course-1
			</a>
			<a class="btn btn-sm btn-outline justify-start" href="/checkout?courseId=mock-course-1">
				/checkout?courseId=mock-course-1
			</a>
			<a class="btn btn-sm btn-outline justify-start" href="/checkout/success?orderNumber=MOCK-ORDER">
				/checkout/success?orderNumber=MOCK-ORDER
			</a>
			<a class="btn btn-sm btn-outline justify-start" href="/login-test">/login-test</a>
			<a class="btn btn-sm btn-outline justify-start" href="/mypage">/mypage</a>
			<a class="btn btn-sm btn-outline justify-start" href="/learning/mock-lecture-1">
				/learning/mock-lecture-1
			</a>
		</div>
	</section>

	<section class="space-y-3 rounded-2xl border border-dashed border-base-300 bg-base-100 p-6 text-sm text-base-content/70">
		<h2 class="text-lg font-semibold text-base-content">추가 참고</h2>
		<ul class="list-disc space-y-2 pl-5">
			<li>
				모의 세션은 HTTP-only가 아니므로 브라우저 개발자 도구에서 <code>sb-access-token</code>을 바로 확인하고
				삭제할 수 있습니다.
			</li>
			<li>
				실제 백엔드가 붙으면 이 페이지 대신 Supabase 로그인 흐름으로 쿠키가 발급될 예정입니다.
			</li>
			<li>
				테마나 UI 점검 시 라이트/다크 전환을 함께 확인하면 대비가 올바르게 적용되었는지 빠르게 검증할 수 있습니다.
			</li>
		</ul>
	</section>
</section>
