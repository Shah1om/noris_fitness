document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        once: true
    });

    function submitForm(formId, url = '/submit_request') {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const messageDiv = document.getElementById('formMessage') || (() => {
                let div = document.createElement('div');
                div.id = 'formMessage';
                this.appendChild(div);
                return div;
            })();

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                messageDiv.innerHTML = `<div class="alert alert-success mt-3">${data.message}</div>`;
                this.reset();
                setTimeout(() => messageDiv.innerHTML = '', 5000);
            } catch (error) {
                messageDiv.innerHTML = `<div class="alert alert-danger mt-3">Ошибка. Попробуйте позже.</div>`;
            }
        });
    }

    submitForm('requestForm');
    submitForm('personalForm');
});