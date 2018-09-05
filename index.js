import React from 'react';
import classNames from 'classnames';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
//import styles from './modal.scss';



@observer
class Modal extends React.PureComponent {
	
@observable isOpen = false;
@observable closing = false;
 
 
@action open = (e) => {
	if(e) { e.preventDefault(); }
	this.isOpen = true;
	this.closing = false;
}

@action close = (e) =>  {
	if(e) { e.preventDefault(); }
	
	if (this.timer) {
	clearTimeout(this.timer);
	this.timer = null	
}
	
this.closing = true;
	
this.timer = setTimeout(() => {
		this.isOpen = false;
		this.content = null;
}, 100);
}
	

@action setContent = (content) => {
	this.content = content;
}

	render() {

		let buttonType = 'default btn-sm';
		const btnClass = classNames({ [`btn-${buttonType}`]: true });


		const overlayClasses = classNames( 
			 { open: this.isOpen,
			   overlay: this.isOpen,
			   hide: this.closing,
			 }
		);
		const contentClasses = classNames( 
			 { 
				 contentBox: this.isOpen,
			   	 hide: this.closing,
			 }
		);
		

		
		return(
		<div id='modal' className={overlayClasses}>
			
		<button onClick={this.close} className={btnClass}> Close </button>
			
		<div className={contentClasses}>
			{this.content || null}
		</div>	
			
		</div>	

		);
	}
	
}

export default Modal;