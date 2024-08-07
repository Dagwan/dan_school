const signatureCanvas = document.getElementById('signature');
    const clearButton = document.getElementById('clear-signature');
    
    const ctx = signatureCanvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    let isDrawing = false;
    
    signatureCanvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - signatureCanvas.getBoundingClientRect().left, e.clientY - signatureCanvas.getBoundingClientRect().top);
    });
    
    signatureCanvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            ctx.lineTo(e.clientX - signatureCanvas.getBoundingClientRect().left, e.clientY - signatureCanvas.getBoundingClientRect().top);
            ctx.stroke();
        }
    });
    
    signatureCanvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });
    
    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    });

//referees forms
function showRefereeForms() {
    const refereeType = document.getElementById("refereeType").value;
    const refereeForms = document.getElementById("refereeForms");
        
    if (refereeType === "Primary School Teacher") {
        refereeForms.innerHTML = `
            <label for="refereeType">First referee details:</label>
            <input type="text" id="refereeFirstName" name="refereeFirstName" placeholder="Referee First Name *" required>
            <input type="text" id="refereeLastName" name="refereeLastName" placeholder="Referee Last Name *" required>
            <input type="email" id="refereeEmail" name="refereeEmail" placeholder="First Referee's Email Address *" required>
        `;
    } else if (refereeType === "Secondary School English Teacher") {
        refereeForms.innerHTML = `
            <label for="refereeType">First referee details:</label>
            <input type="text" id="refereeFirstName1" name="refereeFirstName1" placeholder="Referee First Name *" required>
            <input type="text" id="refereeLastName1" name="refereeLastName1" placeholder="Referee Last Name *" required>
            <input type="email" id="refereeEmail1" name="refereeEmail1" placeholder="First Referee's Email Address *" required>

            <label for="refereeType">Second referee details:</label>
            <input type="text" id="refereeFirstName2" name="refereeFirstName2" placeholder="Referee First Name *" required>
            <input type="text" id="refereeLastName2" name="refereeLastName2" placeholder="Referee Last Name *" required>
            <input type="email" id="refereeEmail2" name="refereeEmail2" placeholder="Second Referee's Email Address *" required>
                
        `;
    } else if (refereeType === "Secondary School Maths Teacher" || refereeType === "Secondary School Leader") {
        refereeForms.innerHTML = `
            <label for="refereeType">First referee details:</label>
            <input type="text" id="refereeFirstName1" name="refereeFirstName1" placeholder="Referee First Name *" required>
            <input type="text" id="refereeLastName1" name="refereeLastName1" placeholder="Referee Last Name *" required>
            <input type="email" id="refereeEmail1" name="refereeEmail1" placeholder="First Referee's Email Address *" required>
            
            <label for="refereeType">Second referee details:</label>
            <input type="text" id="refereeFirstName2" name="refereeFirstName2" placeholder="Referee First Name *" required>
            <input type="text" id="refereeLastName2" name="refereeLastName2" placeholder="Referee Last Name *" required>
            <input type="email" id="refereeEmail2" name="refereeEmail2" placeholder="Second Referee's Email Address *" required>
            
            <label for="refereeType">Third referee details:</label>
            <input type="text" id="refereeFirstName3" name="refereeFirstName3" placeholder="Referee First Name *" required>
            <input type="text" id="refereeLastName3" name="refereeLastName3" placeholder="Referee Last Name *" required>
            <input type="email" id="refereeEmail3" name="refereeEmail3" placeholder="Third Referee's Email Address *" required>

            `;
    } else {
        refereeForms.innerHTML = `
            <label for="refereeType">First referee details:</label>
            <input type="text" id="refereeFirstName" name="refereeFirstName" placeholder="Referee First Name *" required>
            <input type="text" id="refereeLastName" name="refereeLastName" placeholder="Referee Last Name *" required>
            <input type="email" id="refereeEmail" name="refereeEmail" placeholder="First Referee's Email Address *" required>
    `;
        }
        
        refereeForms.style.display = "block";
    }
    
    
    