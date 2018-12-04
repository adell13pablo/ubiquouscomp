var socket = io.connect('http://localhost:3000');

function createNewReceipt(){

	var trigger1 = $('#trigger1 :selected').text();

	var trigger1_cuantifier = $('#trigger1-cuantifier :selected').text();

	var trigger1_value = $('#trigger1-value').val();

	var trigger2 = $('#trigger2 :selected').text();

	var trigger2_cuantifier = $('#trigger2-cuantifier :selected').text();

	var trigger2_value = $('#trigger2-value').val();

	var action = $('#actionChosen :selected').text();

	var action_where = $('#actionChosen-where :selected').text();

	var action_value = $('#actionInput').val();

	/*console.log("trigger 1 value: "+trigger1);
	console.log("trigger 1 cuantifier value: "+trigger1_cuantifier);
	console.log("trigger 1 input value: "+trigger1_value);
	console.log("trigger 2 value: "+trigger2);
	console.log("trigger 2 cuantifier value: "+trigger2_cuantifier);
	console.log("trigger 2 input value: "+trigger2_value);
	console.log("action value: "+action);
	console.log("action-where value: "+action_where);
	*/
	/* GET 1st TRIGGER */
	var isTrigger1 = 0;
	var trigger1_select_1 = "";
	var trigger1_select_2 = "";
	var trigger1_select_3 = "";

	if(trigger1 == "Swipe right"){
		trigger1_select_1 = trigger1;
		isTrigger1 = 1;

	}else if(trigger1 == "Temperature"){
		if((trigger1_cuantifier == "Select option:") || (trigger1_cuantifier == "Left") || (trigger1_cuantifier == "Right") || (trigger1_cuantifier == "Middle") || (trigger1_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger1_select_1 = trigger1;
			trigger1_select_2 = trigger1_cuantifier;
			trigger1_select_3 = trigger1_value;
			isTrigger1  = 1;
		}

	}else if(trigger1 == "Button pressed"){
		trigger1_select_1 = trigger1;
		isTrigger1 = 1;

	}else if(trigger1 == "Luminosity"){
		if((trigger1_cuantifier == "Select option:") || (trigger1_cuantifier == "Left") || (trigger1_cuantifier == "Right") || (trigger1_cuantifier == "Middle") || (trigger1_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger1_select_1 = trigger1;
			trigger1_select_2 = trigger1_cuantifier;
			trigger1_select_3 = trigger1_value;
			isTrigger1  = 1;
		}

	}else if(trigger1 == "Acceleration"){
		if((trigger1_cuantifier == "Select option:") || (trigger1_cuantifier == "Left") || (trigger1_cuantifier == "Right") || (trigger1_cuantifier == "Middle") || (trigger1_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger1_select_1 = trigger1;
			trigger1_select_2 = trigger1_cuantifier;
			trigger1_select_3 = trigger1_value;
			isTrigger1  = 1;
		}

	}else if(trigger1 == "Date (dd/mm/yyyy)"){
		if((trigger1_cuantifier == "Select option:") || (trigger1_cuantifier == "Left") || (trigger1_cuantifier == "Right") || (trigger1_cuantifier == "Middle") || (trigger1_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger1_select_1 = trigger1;
			trigger1_select_2 = trigger1_cuantifier;
			trigger1_select_3 = trigger1_value;
			isTrigger1  = 1;
		}

	}else if(trigger1 == "Time (hh:mm:ss)"){
		if((trigger1_cuantifier == "Select option:") || (trigger1_cuantifier == "Left") || (trigger1_cuantifier == "Right") || (trigger1_cuantifier == "Middle") || (trigger1_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger1_select_1 = trigger1;
			trigger1_select_2 = trigger1_cuantifier;
			trigger1_select_3 = trigger1_value;
			isTrigger1  = 1;
		}

	}else if(trigger1 == "Date-time (dd/mm/yyyy-hh:mm:ss)"){
		if((trigger1_cuantifier == "Select option:") || (trigger1_cuantifier == "Left") || (trigger1_cuantifier == "Right") || (trigger1_cuantifier == "Middle") || (trigger1_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger1_select_1 = trigger1;
			trigger1_select_2 = trigger1_cuantifier;
			trigger1_select_3 = trigger1_value;
			isTrigger1  = 1;
		}

	}
	/*OPTIONAL TRIGGERS*/
	else if(trigger1 == "Swipe left"){
		trigger1_select_1 = trigger1;
		isTrigger1 = 1;

	}else if(trigger1 == "Shake"){
		trigger1_select_1 = trigger1;
		isTrigger1 = 1;

	}else if(trigger1 == "Preasure"){
		if((trigger1_cuantifier == "Select option:") || (trigger1_cuantifier == "Left") || (trigger1_cuantifier == "Right") || (trigger1_cuantifier == "Middle") || (trigger1_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger1_select_1 = trigger1;
			trigger1_select_2 = trigger1_cuantifier;
			trigger1_select_3 = trigger1_value;
			isTrigger1  = 1;
		}

	}else if(trigger1 == "switch"){
		if((trigger1_cuantifier == "Select option:") || (trigger1_cuantifier == ">") || (trigger1_cuantifier == "<") || (trigger1_cuantifier == "=")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger1_select_1 = trigger1;
			trigger1_select_2 = trigger1_cuantifier;
			isTrigger1  = 1;
		}

	}else{
		/*ERROR*/
		window.alert("You must select a valid trigger");
		console.log("ERROR");
	}

	/* GET 2nd TRIGGER */
	var isTrigger2 = 0;
	var trigger2_select_1 = "";
	var trigger2_select_2 = "";
	var trigger2_select_3 = "";

	if(trigger2 == "Select option:"){
		console.log("No second trigger chosen");
	}else if(trigger2 == "Swipe right"){
		trigger2_select_1 = trigger2;
		var isTrigger2 = 1;

	}else if(trigger2 == "Temperature"){
		if((trigger2_cuantifier == "Select option:") || (trigger2_cuantifier == "Left") || (trigger2_cuantifier == "Right") || (trigger2_cuantifier == "Middle") || (trigger2_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger2_select_1 = trigger2;
			trigger2_select_2 = trigger2_cuantifier;
			trigger2_select_3 = trigger2_value;
			isTrigger2 = 1;
		}

	}else if(trigger2 == "Button pressed"){
		trigger2_select_1 = trigger2;
		isTrigger2 = 1;

	}else if(trigger2 == "Luminosity"){
		if((trigger2_cuantifier == "Select option:") || (trigger2_cuantifier == "Left") || (trigger2_cuantifier == "Right") || (trigger2_cuantifier == "Middle") || (trigger2_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger2_select_1 = trigger2;
			trigger2_select_2 = trigger2_cuantifier;
			trigger2_select_3 = trigger2_value;
			isTrigger2 = 1;
		}

	}else if(trigger2 == "Acceleration"){
		if((trigger2_cuantifier == "Select option:") || (trigger2_cuantifier == "Left") || (trigger2_cuantifier == "Right") || (trigger2_cuantifier == "Middle") || (trigger2_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger2_select_1 = trigger2;
			trigger2_select_2 = trigger2_cuantifier;
			trigger2_select_3 = trigger2_value;
			isTrigger2 = 1;
		}

	}else if(trigger2 == "Date (dd/mm/yyyy)"){
		if((trigger2_cuantifier == "Select option:") || (trigger2_cuantifier == "Left") || (trigger2_cuantifier == "Right") || (trigger2_cuantifier == "Middle") || (trigger2_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger2_select_1 = trigger2;
			trigger2_select_2 = trigger2_cuantifier;
			trigger2_select_3 = trigger2_value;
			isTrigger2 = 1;
		}

	}else if(trigger2 == "Time (hh:mm:ss)"){
		if((trigger2_cuantifier == "Select option:") || (trigger2_cuantifier == "Left") || (trigger2_cuantifier == "Right") || (trigger2_cuantifier == "Middle") || (trigger2_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger2_select_1 = trigger2;
			trigger2_select_2 = trigger2_cuantifier;
			trigger2_select_3 = trigger2_value;
			isTrigger2 = 1;
		}

	}else if(trigger2 == "Date-time (dd/mm/yyyy-hh:mm:ss)"){
		if((trigger2_cuantifier == "Select option:") || (trigger2_cuantifier == "Left") || (trigger2_cuantifier == "Right") || (trigger2_cuantifier == "Middle") || (trigger2_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger2_select_1 = trigger2;
			trigger2_select_2 = trigger2_cuantifier;
			trigger2_select_3 = trigger2_value;
			isTrigger2 = 1;
		}

	}
	/*OPTIONAL TRIGGERS*/
	else if(trigger2 == "Swipe left"){
		trigger2_select_1 = trigger2;
		isTrigger2 = 1;

	}else if(trigger2 == "Shake"){
		trigger2_select_1 = trigger2;
		isTrigger2 = 1;

	}else if(trigger2 == "Preasure"){
		if((trigger2_cuantifier == "Select option:") || (trigger2_cuantifier == "Left") || (trigger2_cuantifier == "Right") || (trigger2_cuantifier == "Middle") || (trigger2_value == "")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger2_select_1 = trigger2;
			trigger2_select_2 = trigger2_cuantifier;
			trigger2_select_3 = trigger2_value;
			isTrigger2 = 1;
		}

	}else if(trigger2 == "switch"){
		if((trigger2_cuantifier == "Select option:") || (trigger2_cuantifier == ">") || (trigger2_cuantifier == "<") || (trigger2_cuantifier == "=")){
			window.alert("Values selected are not valid");
			console.log("Values selected are not valid");
		}else{
			trigger2_select_1 = trigger2;
			trigger2_select_2 = trigger2_cuantifier;
			isTrigger2 = 1;
		}
	}

	/* Get Action to do */
	isValidAction = 0;
	var action_select_1 = "";
	var action_select_2 = "";

	if(action == "Turn on"){
		if((action_where == "Light 1") || (action_where == "Light 2")){
			action_select_1 = action;
			action_select_2 = action_where;
			isValidAction = 1;
		}else{
			window.alert("Action values selected are not valid");
			console.log("Action values selected are not valid");
		}
	}else if(action == "Turn off"){
		if((action_where == "Light 1") || (action_where == "Light 2")){
			action_select_1 = action;
			action_select_2 = action_where;
			isValidAction = 1;
		}else{
			window.alert("Action values selected are not valid");
			console.log("Action values selected are not valid");
		}
	}else if(action == "Change color"){
		if((action_where == "RGB-LED Red") || (action_where == "RGB-LED Blue") || (action_where == "RGB-LED Purple")){
			action_select_1 = action;
			action_select_2 = action_where;
			isValidAction = 1;
		}else{
			window.alert("Action values selected are not valid");
			console.log("Action values selected are not valid");
		}
	}else if(action == "Play sound"){
		if((action_where == "Noise 1") || (action_where == "Noise 2") || (action_where == "Noise 3")){
			action_select_1 = action;
			action_select_2 = action_where;
			isValidAction = 1;
		}else{
			window.alert("Action values selected are not valid");
			console.log("Action values selected are not valid");
		}
	}else if(action == "Send email"){
		if(action_value == ""){
			window.alert("You must introduce a valid email value");
			console.log("You must introduce a valid email value");
		}else{
			action_select_1 = action;
			action_select_2 = action_value;
			isValidAction = 1;
		}
	}else{
		/* ERROR */
		window.alert("You must select a valid action");
		console.log("ERROR");
	}


	if(isValidAction == 1 && isTrigger1 == 1){

		var text1 = "";
		var text2 = "";

		/* GET TRIGGER 1*/
		if(trigger1_select_2 == ""){
			text1 = "IF "+trigger1_select_1+"";
		}else{
			if(trigger1_select_3 == ""){
				text1 = "IF "+trigger1_select_1+" "+trigger1_select_2+"";
			}else{
				text1 = "IF "+trigger1_select_1+" "+trigger1_select_2+" "+trigger1_select_3+"";
			}
		}

		if(isTrigger2 == 0){
			
			window.alert(text1+" THEN "+action_select_1+ " "+action_select_2+"");
			var description = text1+" THEN "+action_select_1+ " "+action_select_2+"";
			
		}else{
			/* GET TRIGGER 2 */
			if(trigger2_select_2 == ""){
				text2 = " AND "+trigger2_select_1+" THEN "+action_select_1+ " "+action_select_2+"";
			}else{
				if(trigger2_select_3 == ""){
					text2 = " AND "+trigger2_select_1+" "+trigger2_select_2+" THEN "+action_select_1+ " "+action_select_2+"";
				}else{
					text2 = " AND "+trigger2_select_1+" "+trigger2_select_2+" "+trigger2_select_3+" THEN "+action_select_1+ " "+action_select_2+"";
				}
			}

			window.alert(text1+text2);
			var description = text1 + text2;

		}

		socket.emit('newReceipt',{user: localStorage.getItem('actualUser'), description: description});
		
	}else{
		return;
	}
}
