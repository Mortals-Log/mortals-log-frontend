// @/const/icons

/* eslint-disable storybook/default-exports */

import * as Icons from '@assets/icons';
import { IconKey } from '@/types/icon';

export const ICON_CONFIG: Record<IconKey, { icon: React.FC<React.SVGProps<SVGSVGElement>>; label: string }> = {
	instagram: { icon: Icons.instagram, label: 'Instagram' },
	kakaotalk: { icon: Icons.kakaotalk, label: '카카오톡 오픈채팅' },
	youtube: { icon: Icons.youtube, label: 'YouTube' },
	melon: { icon: Icons.melon, label: 'Melon' },
	spotify: { icon: Icons.spotify, label: 'Spotify' },
	applemusic: { icon: Icons.applemusic, label: 'Apple Music' },
	bugs: { icon: Icons.bugs, label: 'BUGS!' },
	genie: { icon: Icons.genie, label: 'genie' },
	soundcloud: { icon: Icons.soundcloud, label: 'Sound Cloud' },
	cd: { icon: Icons.cd, label: 'CD 구매하기' },
	lp: { icon: Icons.lp, label: 'LP 바이닐 구매하기' },
	goods: { icon: Icons.goods, label: '굿즈 구매하기' },
	linktree: { icon: Icons.linktree, label: 'Linktree' },
	sing: { icon: Icons.sing, label: '노래방 신청' },
	lock: { icon: Icons.lock, label: 'CD 한정' },
} as const;
