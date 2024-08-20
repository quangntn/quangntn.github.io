document.getElementById('convertButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const container = document.getElementById('jsonTree');
    container.innerHTML = ""; // Clear previous content

    try {
        let jsonData = JSON.parse(inputText);
		let n = 0;
		while(typeof(jsonData) != 'object' && n < 10){
			jsonData = JSON.parse(jsonData);
			n ++;
		}
        // Create a JSON editor instance
        const editor = new JSONEditor(container, {
            mode: 'preview',
			modes: ['code', 'tree','view','text','preview'],
            mainMenuBar: true,
            navigationBar: true,
            statusBar: true
        });

        // Set the JSON data to the editor
        editor.set(jsonData);
    } catch (error) {
        container.textContent = 'Invalid JSON: ' + error.message;
    }
});
