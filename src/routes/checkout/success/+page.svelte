<script lang="ts">
	import type { CourseDetail, PaymentConfirmation } from '$lib/types';
	import { formatCurrency } from '$lib/utils/format';

	let { data } = $props<{
		data: {
			orderNumber: string;
			confirmation: PaymentConfirmation;
			course: CourseDetail | null;
			usedFallback: boolean;
		};
	}>();

	const isSuccess = data.confirmation.status === 'paid';
</script>

<svelte:head>
	<title>결제 완료 | FastSaaS</title>
	<meta name="description" content="결제가 완료되었습니다. 수강을 시작해보세요." />
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="mx-auto max-w-3xl space-y-8 animate-fade-in">
	{#if isSuccess}
		<!-- Success State -->
		<div class="text-center space-y-6">
			<!-- Success Icon with Animation -->
			<div class="relative inline-block">
				<div class="w-32 h-32 rounded-full bg-gradient-to-br from-success to-success/60 flex items-center justify-center shadow-2xl animate-bounce-slow mx-auto">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<!-- Confetti decoration -->
				<div class="absolute -top-4 -left-4 text-4xl animate-pulse">🎉</div>
				<div class="absolute -top-4 -right-4 text-4xl animate-pulse" style="animation-delay: 150ms">🎊</div>
				<div class="absolute -bottom-2 left-0 text-3xl animate-pulse" style="animation-delay: 300ms">✨</div>
				<div class="absolute -bottom-2 right-0 text-3xl animate-pulse" style="animation-delay: 450ms">🎈</div>
			</div>

			<!-- Success Message -->
			<div class="space-y-3">
				<h1 class="text-4xl font-bold bg-gradient-to-r from-success to-success/70 bg-clip-text text-transparent">
					결제가 완료되었습니다!
				</h1>
				<p class="text-lg text-base-content/80">
					주문번호 <span class="font-mono font-bold text-primary">{data.orderNumber}</span>
				</p>
				<p class="text-base text-base-content/60">
					결제가 확인되었습니다. 이제 학습을 시작해보세요!
				</p>
			</div>

			<!-- CTA Button -->
			<a
				href="/mypage"
				class="btn btn-lg bg-gradient-to-r from-primary to-accent border-0 text-white hover:brightness-110 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 gap-2 inline-flex"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				마이페이지에서 학습 시작하기
			</a>
		</div>
	{:else}
		<!-- Error State -->
		<div class="text-center space-y-6">
			<div class="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center mx-auto">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<div class="space-y-2">
				<h1 class="text-3xl font-bold">결제 상태 확인 실패</h1>
				<p class="text-base text-base-content/70">
					주문번호 <span class="font-mono font-semibold">{data.orderNumber}</span>에 대한 결제 정보를 불러오지 못했습니다.
				</p>
				<p class="text-sm text-base-content/60">
					잠시 후 다시 시도하거나 고객센터에 문의해주세요.
				</p>
			</div>
			<a href="/support" class="btn btn-outline btn-lg gap-2 inline-flex">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
				고객센터 문의하기
			</a>
		</div>
	{/if}

	<!-- Order Details Card -->
	{#if data.course}
		<div class="card-modern overflow-hidden shadow-xl">
			<div class="bg-gradient-to-r from-primary/5 to-accent/5 p-4 border-b border-base-300">
				<h2 class="text-lg font-bold flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					주문 정보
				</h2>
			</div>
			<div class="p-6 space-y-4">
				<div class="grid md:grid-cols-2 gap-6">
					<div class="space-y-2">
						<p class="text-xs font-semibold text-base-content/60 uppercase">수강 강의</p>
						<p class="text-lg font-bold">{data.course.title}</p>
						<div class="flex items-center gap-2 text-sm text-base-content/70">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
							</svg>
							{data.course.instructor}
						</div>
					</div>
					<div class="space-y-2 text-right md:text-left">
						<p class="text-xs font-semibold text-base-content/60 uppercase">결제 금액</p>
						<p class="text-2xl font-bold text-primary">
							{formatCurrency(data.course.salePrice ?? data.course.originalPrice)}
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if data.usedFallback}
		<div role="alert" class="alert alert-warning shadow-md rounded-2xl">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
			</svg>
			임시 결제 확인 데이터입니다
		</div>
	{/if}
</section>

<style>
	@keyframes bounce-slow {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
	.animate-bounce-slow {
		animation: bounce-slow 2s ease-in-out infinite;
	}
</style>
