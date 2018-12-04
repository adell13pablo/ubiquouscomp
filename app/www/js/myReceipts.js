var socket = io.connect('http://localhost:3000');


function loadReceipts(){
	socket.emit('loadReceipts', {user: localStorage.getItem('actualUser')});

	socket.on('receiptsReady', (data)=>{

		var receipts = data.receipts;

		//console.log(receipts);

		for(i = 0; i < receipts.length; i++){

			var node = document.createElement("label");
			node.setAttribute("class", "switch");
			var inputCheckbox = document.createElement("input");
			inputCheckbox.setAttribute("type", "checkbox");
			inputCheckbox.setAttribute("onclick", "switchState(this)");
			inputCheckbox.setAttribute("id", receipts[i]._id); /* ID is the one of the receipt given */
			var span = document.createElement("span");
			span.setAttribute("class", "slider round");

			node.appendChild(inputCheckbox);
			node.appendChild(span);

			var mainNode = document.createElement("div");
			mainNode.setAttribute("class", "main_options");
			var title = null;
			if(receipts[i].secondCondition == "")
				title = document.createTextNode("IF "+receipts[i].firstCondition+" THEN "+receipts[i].action); /* Description is the one of the receipt given */
			else
				title = document.createTextNode("IF "+receipts[i].firstCondition+" AND "+receipts[i].secondCondition+" THEN "+receipts[i].action); /* Description is the one of the receipt given */
			mainNode.appendChild(title);
			mainNode.appendChild(node);

			document.getElementById("container").appendChild(mainNode);

			document.getElementById(receipts[i]._id).checked = receipts[i].active;

		}

		/* Make a loop with the data received as answer and execute this code for each of the elements received */

		


		console.log("receipts loaded");
	});
}

window.onload = loadReceipts;

function switchState(elem){
	var id = elem.id;
	console.log("id = "+id+"\nIs checked = "+elem.checked);

	socket.emit('updateReceiptState', {user: localStorage.getItem('actualUser'), receiptID: id, state: elem.checked});

}
