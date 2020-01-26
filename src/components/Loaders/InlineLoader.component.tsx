import * as React from "react";
import Loader from "react-loader-spinner";

export const InlineLoader: React.FC<{}> = (props: any) => {
	const style: React.CSSProperties = {
		display: "inline-block",
		margin: 0,
		marginLeft: '5px'
	};
	return (
		<div style={style}>
			<Loader type="Circles" height={20} width={20} color="#ffffff" />
		</div>
	);
};
