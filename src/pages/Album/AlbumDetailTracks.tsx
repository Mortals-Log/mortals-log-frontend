// @pages/Album/AlbumDetailTracks.tsx

import { MASTER_TRACKS } from '@/const/tracks';
import { Album } from '@/types/album';
import { GetTracks } from '@/utils/track';

const AlbumDetailTracks = ({ albumData }: { albumData: Album | undefined }) => {
	const rawTracks = albumData?.tracks || [];
	const trackIds = GetTracks(rawTracks);
	const isVinyl = !Array.isArray(rawTracks);

	return (
		<div>
			{trackIds.length > 0 ? (
				<div className="trackContainer">
					{isVinyl
						? Object.entries(rawTracks as Record<string, string[]>).map(([sideName, tracks]) => (
								<div key={sideName} className="sideGroup">
									<h3 className="sideTitle">{sideName}</h3>

									{GetTracks(tracks).map(trackId => {
										const track = MASTER_TRACKS[trackId];

										if (!track) return null;

										const trackIndex = trackIds.indexOf(trackId) + 1;

										return (
											<div key={trackId} className="trackWrapper">
												<p className="title">
													{String(trackIndex).padStart(2, '0')}. {track.title}
													{track.isLead && <span style={{ marginLeft: '8px' }}>TITLE</span>}
												</p>
											</div>
										);
									})}
								</div>
							))
						: trackIds.map((trackId, index) => {
								const track = MASTER_TRACKS[trackId];

								if (!track) return null;

								return (
									<div key={trackId} className="trackWrapper">
										<p className="title">
											{String(index + 1).padStart(2, '0')}. {track.title}
											{track.isLead && <span style={{ marginLeft: '8px' }}>TITLE</span>}
										</p>
									</div>
								);
							})}
				</div>
			) : (
				<p>수록곡 리스트와 가사 등의 정보는 데이터 준비 후 업데이트될 예정입니다.</p>
			)}
		</div>
	);
};

export default AlbumDetailTracks;
