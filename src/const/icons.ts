// @const/sns_icon.ts

/* eslint-disable storybook/default-exports */

import * as Icons from '@assets/icons';
import { IconKey } from '@/types/icon';

export const ICON_CONFIG: Record<IconKey, { icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string }> = {
	instagram: { icon: Icons.instagram, label: 'Instagram' },
	kakaotalk: { icon: Icons.kakaotalk, label: '카카오톡 오픈채팅' },
	youtube: { icon: Icons.youtube, label: 'YouTube' },
	applemusic: { icon: Icons.applemusic, label: 'Apple Music' },
	spotify: { icon: Icons.spotify, label: 'Spotify' },
	soundcloud: { icon: Icons.soundcloud, label: 'Sound Cloud' },
	linktree: { icon: Icons.linktree, label: 'Linktree' },
	cd: { icon: Icons.cd, label: 'CD 구매하기' },
	lp: { icon: Icons.lp, label: 'LP 바이닐 구매하기' },
	goods: { icon: Icons.goods, label: '굿즈 구매하기' },
	sing: { icon: Icons.sing, label: '노래방 신청' },
} as const;
