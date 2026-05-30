const today = new Date();
const currentYearElement = document.getElementById("currentYear");
currentYearElement.textContent = today.getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('open');
    navLinks.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {

    //get hidden timestamp
    const timeStamp = new Date();
    const newTimeStamp = timeStamp.toLocaleDateString();
    const hiddenTime = document.querySelector('#timestamp');
    hiddenTime.value = newTimeStamp;

    //set modal object details
    const modalMapping = {
        'np-membership': 'np-dialog',
        'gold-membership': 'gold-dialog',
        'silver-membership': 'silver-dialog',
        'bronze-membership': 'bronze-dialog'
    };

    //open and close modal
    function GetModal(modalMapping) {

        const keys = Object.keys(modalMapping);

        keys.forEach((key) => {
            const button = document.getElementById(key);
            button.addEventListener('click', () => {
                const dialogID = modalMapping[key];
                const dialog = document.getElementById(dialogID);
                dialog.showModal();
            })
        });

        const closeButtons = document.querySelectorAll('dialog button');

        closeButtons.forEach((eachButton) => {
            eachButton.addEventListener('click', () => {
                const parentDialog = eachButton.closest('dialog');
                parentDialog.close();
            })
        });

        const closeModal = document.querySelectorAll('dialog');
        closeModal.forEach((modal) => {
            modal.addEventListener('click', (event) => {
                if (event.target === modal){
                    modal.close();
                }
            })
        });
    };

    GetModal(modalMapping);
});

//Thank you confirmation page
const params = new URLSearchParams(window.location.search);

const firstName = params.get('first');
const lastName = params.get('last');
const email = params.get('email');
const phone = params.get('phone');
const business = params.get('business');
const timestamp = params.get('timestamp');

document.querySelector('#form-recap').innerHTML = `
<p><b>Applicant Name:</b> ${firstName} ${lastName}</p>
<p><b>Email:</b> ${email}</p>
<p><b>Phone:</b> ${phone}</p>
<p><b>Business:</b> ${business}</p>
<p><b>Submitted On:</b> ${timestamp}</p>`;