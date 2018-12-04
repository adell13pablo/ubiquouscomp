module.exports {}
 
/* PREGUNTAR SI PUEDO ACCEDER DESDE ESTA FUNCION A DATOS DEL SITIO DONDE LA LLAMO, O SI ME SALE MEJOR CREAR ESTA FUNCION COMO UNA
EN EL MISMO SITIO DONDE ESTA EL SERVIDOR Y NO COMO UNA FUNCION EXTERNA */

module.exports.fullfilsCondition = function(what, quantifier, text){

	if(what == "Luminosity"){

		if(quantifier == ">"){
			if(luminosity_local > text){
				return true;
			}else{ 
				return false;
			}

		}else if(quantifier == "<"){
			if(luminosity_local < text){
				return true;
			}else{
				return false;
			}

		}else if(quantifier == "="){
			if(luminosity_local == text){
				return true;
			}else{
				return false;
			}

		}

	}else if(what == "Temperature"){

		if(quantifier == ">"){
			if(temperature_local > text){
				return true;
			}else{ 
				return false;
			}

		}else if(quantifier == "<"){
			if(temperature_local < text){
				return true;
			}else{
				return false;
			}

		}else if(quantifier == "="){
			if(temperature_local == text){
				return true;
			}else{
				return false;
			}

		}

	}else if(what == "Acceleration"){

		if(quantifier == ">"){
			if(acceleration_local > text){
				return true;
			}else{ 
				return false;
			}

		}else if(quantifier == "<"){
			if(acceleration_local < text){
				return true;
			}else{
				return false;
			}

		}else if(quantifier == "="){
			if(acceleration_local == text){
				return true;
			}else{
				return false;
			}

		}

	}else if(what == "Date (dd/mm/yyyy)"){

		return compareDates(date_local, text, quantifier, false);

	}else if(what == "Time (hh:mm:ss)"){

		return compareTimes(time_local, text, quantifier);

	}else if(what == "Date-time (dd/mm/yyyy-hh:mm:ss)"){

		if(compareDates(date_time_local.substring(0,10), text.substring(0,10), quantifier, true) == true){

			if(quantifier == ">"){
				return true;
			}else if(quantifier == "<"){
				return true;
			}else{
				return compareTimes(date_time_local.substring(11), text.substring(11), "=");
			}
		}else if(compareDates(date_time_local.substring(0,10), text.substring(0,10), quantifier, true) == 2){
			return compareTimes(date_time_local.substring(11), text.substring(11), quantifier);
		}

	}else if(what == "Swipe right"){
		if(swipe_right_local == true){
			return true;
		}
	}

}


function compareDates(date1, date2, quantifier, isWithTime){

	if(quantifier == ">"){
		if(date1.substring(6) >= date2.substring(6)){
			if(date_local.substring(6) > date2.substring(6)){
				return true;
			}else{
				if(date1.substring(3,5) >= date2.substring(3,5)){
					if(date1.substring(3,5) > date2.substring(3,5)){
						return true;
					}else{
						if(date1.substring(0,2) > date2.substring(0,2)){
							return true;
						}else{
							if(isWithTime == true){
								return 2;
							}else{
								return false;
							}
						}
					}
				}else{
					return false;
				}
			}
			return true;
		}else{ 
			return false;
		}

	}else if(quantifier == "<"){
		if(date1.substring(6) <= date2.substring(6)){
			if(date1.substring(6) < date2.substring(6)){
				return true;
			}else{
				if(date1.substring(3,5) <= date2.substring(3,5)){
					if(date1.substring(3,5) < date2.substring(3,5)){
						return true;
					}else{
						if(date1.substring(0,2) < date2.substring(0,2)){
							return true;
						}else{
							if(isWithTime == true){
								return 2;
							}else{
								return false;
							}
						}
					}
				}else{
					return false;
				}
			}
			return true;
		}else{ 
			return false;
		}

	}else if(quantifier == "="){
		if(date1 == date2){
			return true;
		}else{ 
			return false;
		}

	}
}

function compareTimes(time1, time2, quantifier){

	if(quantifier == ">"){
		if(time1.substring(0,2) >= time2.substring(0,2)){
			if(time1.substring(0,2) > time2.substring(0,2)){
				return true;
			}else{
				if(time1.substring(3,5) >= time2.substring(3,5)){
					if(time1.substring(3,5) > time2.substring(3,5)){
						return true;
					}else{
						if(time1.substring(6) > time2.substring(6)){
							return true;
						}else{
							return false;
						}
					}
				}else{
					return false;
				}
			}
			return true;
		}else{ 
			return false;
		}

	}else if(quantifier == "<"){
		if(time1.substring(0,2) <= time2.substring(0,2)){
			if(time1.substring(0,2) < time2.substring(0,2)){
				return true;
			}else{
				if(time1.substring(3,5) <= time2.substring(3,5)){
					if(time1.substring(3,5) < time2.substring(3,5)){
						return true;
					}else{
						if(time1.substring(6) < time2.substring(6)){
							return true;
						}else{
							return false;
						}
					}
				}else{
					return false;
				}
			}
			return true;
		}else{ 
			return false;
		}

	}else if(quantifier == "="){
		if(time1 == time2){
			return true;
		}else{ 
			return false;
		}
	}

}

if (fullfilsCondition(paramenter1, parameter2, parameter3) == true){
	if(thereIsSecondCondition()){
		if(fullfilsCondition(parameter1_condition2, parameter2_condition2, parameter3_condition2) == true){
			execAction(action, where);
		}else{
			// Do nothing
		}
	}else{
		execAction();
	}
}










module.exports.execAction = function(action, where){
 
}