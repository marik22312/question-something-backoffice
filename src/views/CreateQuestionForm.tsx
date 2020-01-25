import * as React from 'react';
import { IQuestion } from '../interfaces';

interface Props {
	questions: IQuestion[];
	isLoading: boolean;
}
export class CreateQuestionForm extends React.Component <Props, {}> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	render() {
             if (this.props.isLoading) {
               return <div>Loading...</div>;
             }
             return (
               <div>
                 {this.props.questions.map(question => {
                   return <div>{question.question}</div>;
                 })}
               </div>
             );
           }
}