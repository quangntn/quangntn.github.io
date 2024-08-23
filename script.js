
document.getElementById('convertButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const container = document.getElementById('jsonTree');
    container.innerHTML = ""; // Clear previous content
	let max = -1;
    try {
        let jsonData = JSON.parse(inputText);
		let n = 0;
		while(typeof(jsonData) != 'object' && n < 10){
			jsonData = JSON.parse(jsonData);			
			n ++;
		}
		
		let deep = 1;
		const maxDeep = 10;
		parseStringAttribute(jsonData, deep, maxDeep);
		
        // Create a JSON editor instance
        const editor = new JSONEditor(container, {
            mode: 'tree',
			modes: ['code', 'tree','view','text','preview'],
            mainMenuBar: true,
            navigationBar: true,
            statusBar: true
        });
        // Set the JSON data to the editor
        editor.set(jsonData);
		console.dir(max);
    } catch (error) {
        container.textContent = 'Invalid JSON: ' + error.message;
    }
	
	function parseStringAttribute(jsonData, deep, maxDeep){
		if(max < deep){
			max = deep;
		}
		if(typeof(jsonData) === 'object' &&  !(jsonData == null || jsonData == undefined)) {
			Object.keys(jsonData).forEach(function (key) {
				let val = jsonData[key];
				
				if(typeof(val)=== 'string' && val.indexOf('{')> -1){
					try {
						val = JSON.parse(val);						
					}
					catch(error){
						console.dir(error);
					}					
					if(typeof(val)=== 'object'){
						jsonData[key] = val;
						if(!(val == null || val == undefined)){							
							deep ++;
							if( deep <= maxDeep ){
								parseStringAttribute(val, deep, maxDeep);
							}
						}
					}
				}else if(typeof(val)=== 'object' && !(val == null || val == undefined)){										
					parseStringAttribute(val, 0, maxDeep);
				}
			});
		}
		
	}
});
