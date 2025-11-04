<script lang="ts">
	import { authModalState } from '$lib/stores/ui';

	const openModal = () => {
		authModalState.open();
	};
</script>

<section class="mx-auto flex max-w-xl flex-col gap-6 rounded-box border border-base-200 bg-base-200 p-8 text-center shadow-sm">
	<h1 class="text-2xl font-semibold">로그인 모달 테스트</h1>
	<p class="text-sm text-base-content/70">
		아래 버튼을 눌러 로그인 모달이 정상적으로 열리는지 확인하세요. Google/Kakao 버튼은 실제 로그인 흐름을
		사용합니다.
	</p>
	<button type="button" class="btn btn-primary" onclick={openModal}>
		로그인 모달 열기
	</button>
</section>
