import * as React from 'react';
import Loader from 'react-loader-spinner';

export const FullPageLoader: React.FC<{}> = (props: any) => {
	const style: React.CSSProperties = {
		display: 'flex',
		height: '90vh',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'

	}
	return <div style={style}>
		<Loader type="Rings" height={500} width={500}/>
		</div>;
}
