'use client';

// @/views/Admin/DeployDialog
// 배포 버튼 + 배포 전 확인 창. 열면 "지금 사이트에서 달라지는 내용"을 보여주고, 확인한 뒤에만 배포를 요청한다.
// 배포 요청은 서버 라우트(/api/admin/deploy)를 거쳐 Vercel Deploy Hook 을 호출한다.

import { useEffect, useState } from 'react';
import { getImageUrl } from '@/apis/admin/images';
import { fetchContentRows } from '@/apis/content/fetch-content-rows';
import { getSupabasePublicClient } from '@/lib/supabase-browser';
import type { ContentRows } from '@/types/content-row';
import { cn } from '@/utils/cn';
import {
	BADGE_CLASS,
	BADGE_TONE_CLASS,
	PRIMARY_BUTTON_CLASS,
	SECONDARY_BUTTON_CLASS,
	type BadgeTone,
} from './admin-classes';
import { computeChanges, type ChangeItem, type ChangeKind, type ChangeSection } from './deploy-diff';

type Phase = 'closed' | 'loading' | 'review' | 'requesting' | 'done' | 'error';

const CHANGE_BADGES: Record<ChangeKind, { label: string; tone: BadgeTone }> = {
	added: { label: '새로 공개', tone: 'green' },
	changed: { label: '수정됨', tone: 'blue' },
	removed: { label: '사이트에서 내려감', tone: 'yellow' },
};

const getMessage = (error: unknown, fallback: string) => (error instanceof Error ? error.message : fallback);

const getImageSrc = (item: ChangeItem): string | null => {
	if (!item.image) return null;
	return item.image.isStored ? getImageUrl(item.image.path) : `/images/${item.image.path}`;
};

const ChangeCard = ({ item }: { item: ChangeItem }) => {
	const imageSrc = getImageSrc(item);
	const badge = CHANGE_BADGES[item.kind];

	return (
		<li className="flex gap-3 rounded-md border border-gray-200 bg-white p-3">
			{imageSrc && (
				<img
					src={imageSrc}
					alt=""
					onError={event => event.currentTarget.classList.add('hidden')}
					className="size-16 shrink-0 rounded bg-gray-100 object-cover"
				/>
			)}
			<div className="flex min-w-0 flex-1 flex-col gap-2">
				<div className="flex flex-wrap items-center gap-2">
					<span className={cn(BADGE_CLASS, BADGE_TONE_CLASS[badge.tone])}>{badge.label}</span>
					<span className="break-words text-base font-medium text-gray-700">{item.title}</span>
				</div>
				{item.fields.length > 0 && (
					<ul className="flex flex-col gap-1">
						{item.fields.map(field => (
							<li key={field.label} className="break-words text-sm text-gray-600">
								<span className="font-medium text-gray-700">{field.label}</span>{' '}
								<span className="text-gray-400 line-through">{field.before}</span> →{' '}
								<span className="text-gray-700">{field.after}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</li>
	);
};

const ChangeList = ({ sections }: { sections: ChangeSection[] }) => (
	<div className="flex flex-col gap-5">
		{sections.map(section => (
			<section key={section.name} className="flex flex-col gap-2">
				<h3 className="text-base font-semibold text-gray-700">
					{section.name} <span className="font-normal text-gray-500">{section.items.length}건</span>
				</h3>
				<ul className="flex flex-col gap-2">
					{section.items.map(item => (
						<ChangeCard key={`${item.kind}:${item.title}`} item={item} />
					))}
				</ul>
			</section>
		))}
	</div>
);

const DeployDialog = ({ accessToken }: { accessToken: string }) => {
	const [phase, setPhase] = useState<Phase>('closed');
	const [sections, setSections] = useState<ChangeSection[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const isOpen = phase !== 'closed';
	const changeCount = sections.reduce((sum, section) => sum + section.items.length, 0);

	const handleClose = () => {
		if (phase !== 'requesting') setPhase('closed');
	};

	useEffect(() => {
		if (phase === 'closed' || phase === 'requesting') return;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setPhase('closed');
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [phase]);

	const handleOpen = async () => {
		setPhase('loading');
		setErrorMessage(null);
		try {
			const [snapshot, current] = await Promise.all([
				import('@/generated/content-rows.json'),
				fetchContentRows(getSupabasePublicClient()),
			]);
			setSections(computeChanges(snapshot.default as unknown as ContentRows, current));
			setPhase('review');
		} catch (error) {
			setErrorMessage(getMessage(error, '변경 내용을 불러오지 못했습니다.'));
			setPhase('error');
		}
	};

	const handleDeploy = async () => {
		setPhase('requesting');
		setErrorMessage(null);
		try {
			const response = await fetch('/api/admin/deploy', {
				method: 'POST',
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			const body: { message?: string } | null = await response.json().catch(() => null);
			if (!response.ok) throw new Error(body?.message ?? `배포 요청에 실패했습니다 (${response.status}).`);
			setPhase('done');
		} catch (error) {
			setErrorMessage(getMessage(error, '배포 요청에 실패했습니다.'));
			setPhase('error');
		}
	};

	return (
		<>
			<button type="button" onClick={handleOpen} disabled={phase === 'loading'} className={PRIMARY_BUTTON_CLASS}>
				{phase === 'loading' ? '확인 중...' : '배포하기'}
			</button>

			{isOpen && phase !== 'loading' && (
				<div
					className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
					onClick={handleClose}>
					<div
						role="dialog"
						aria-modal="true"
						aria-labelledby="deploy-dialog-title"
						onClick={event => event.stopPropagation()}
						className="flex max-h-[90vh] w-full max-w-2xl flex-col gap-5 overflow-y-auto rounded-t-lg bg-white p-6 font-sans sm:rounded-lg">
						{phase === 'review' && (
							<>
								<div className="flex flex-col gap-2">
									<h2 id="deploy-dialog-title" className="text-xl font-semibold text-gray-700">
										사이트에 반영하기 전에 확인하십시오
									</h2>
									<p className="text-base text-gray-600">
										{changeCount > 0
											? `지금 사이트와 달라지는 내용이 ${changeCount}건 있습니다. 아래 내용이 맞으면 배포하십시오.`
											: '지금 사이트와 달라지는 내용이 없습니다. 비공개로 저장한 내용은 배포해도 나타나지 않습니다.'}
									</p>
								</div>

								{changeCount > 0 && <ChangeList sections={sections} />}

								<p className="rounded-md bg-gray-50 p-3 text-sm text-gray-500">
									배포하면 사이트를 새로 만듭니다. 1~2분 걸리고, 그동안 지금 사이트는 그대로 보입니다. 만드는 중 문제가
									생겨도 이전 사이트가 유지됩니다. 이 화면은 바뀌는 내용을 요약한 미리보기이고, 실제 페이지는 배포가
									끝난 뒤에 확인할 수 있습니다.
								</p>

								<div className="sticky bottom-0 -mx-6 -mb-6 flex flex-wrap justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">
									<button type="button" onClick={handleClose} className={SECONDARY_BUTTON_CLASS}>
										돌아가기
									</button>
									<button type="button" onClick={handleDeploy} className={PRIMARY_BUTTON_CLASS}>
										{changeCount > 0 ? '이 내용으로 배포하기' : '그래도 배포하기'}
									</button>
								</div>
							</>
						)}

						{phase === 'requesting' && (
							<div className="flex flex-col gap-2 py-6 text-center">
								<h2 id="deploy-dialog-title" className="text-xl font-semibold text-gray-700">
									배포를 요청하는 중입니다...
								</h2>
								<p className="text-base text-gray-500">잠시만 기다리십시오. 창을 닫지 마십시오.</p>
							</div>
						)}

						{phase === 'done' && (
							<>
								<div className="flex flex-col gap-2">
									<h2 id="deploy-dialog-title" className="text-xl font-semibold text-gray-700">
										배포를 시작했습니다
									</h2>
									<p className="text-base text-gray-600">현재 사이트를 새로 만드는 중입니다.</p>
								</div>
								<ol className="flex flex-col gap-2 text-base text-gray-600">
									<li>1. 사이트를 새로 만듭니다 (보통 1~2분).</li>
									<li>2. 완성되면 자동으로 사이트에 반영됩니다.</li>
									<li>3. 만드는 도중 문제가 생기면 지금 사이트가 그대로 유지됩니다.</li>
								</ol>
								<p className="text-sm text-gray-500">
									이 창은 닫아도 됩니다. 몇 분 뒤에 사이트를 새로고침하여 확인하십시오.
								</p>
								<div className="flex justify-end">
									<button type="button" onClick={handleClose} className={PRIMARY_BUTTON_CLASS}>
										확인
									</button>
								</div>
							</>
						)}

						{phase === 'error' && (
							<>
								<div className="flex flex-col gap-2">
									<h2 id="deploy-dialog-title" className="text-xl font-semibold text-gray-700">
										배포하지 못했습니다
									</h2>
									<p className="break-words text-base text-pink-600">{errorMessage}</p>
									<p className="text-sm text-gray-500">
										사이트는 그대로입니다. 잠시 뒤에 다시 시도하십시오. 계속 실패하면 로그인이 만료되었는지(로그아웃 후
										다시 로그인)와 Vercel 설정을 확인하십시오.
									</p>
								</div>
								<div className="flex flex-wrap justify-end gap-3">
									<button type="button" onClick={handleClose} className={SECONDARY_BUTTON_CLASS}>
										닫기
									</button>
									<button type="button" onClick={handleOpen} className={PRIMARY_BUTTON_CLASS}>
										다시 시도
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default DeployDialog;
