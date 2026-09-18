// @/components/Placeholder

interface PlaceholderProps {
	contentName?: string;
	message?: string;
}

const Placeholder = ({ contentName, message }: PlaceholderProps) => {
	return (
		<div className="py-20 text-center font-sans text-md font-normal text-gray-300">
			{message ? message : `${contentName}은(는) 데이터 준비 후 업데이트될 예정입니다.`}
		</div>
	);
};

export default Placeholder;
