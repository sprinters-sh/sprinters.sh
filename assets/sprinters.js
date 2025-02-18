function initCopyToClipboard() {
    const copySelector = '.btn-copy';
    const iconCopy = 'bi-copy'
    const iconCopied = 'bi-check-lg'

    const initCopyBtn = function(btn) {
        btn.title = "Copy to clipboard";
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the adjacent pre
            const pre = btn.parentElement.querySelector('pre');

            // Get the text content of the pre
            const textToCopy = pre.textContent;

            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    const i = btn.querySelector('i');

                    // Temporarily change button to show copied state
                    i.classList.remove(iconCopy);
                    i.classList.add(iconCopied);
                    i.title = "Copied!";

                    // Revert back after 2 seconds
                    setTimeout(() => {
                        i.classList.remove(iconCopied);
                        i.classList.add(iconCopy);
                        i.title = "Copy to clipboard";
                    }, 1000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    };

    document.querySelectorAll(copySelector).forEach(el => initCopyBtn(el));
    new MutationObserver(mutations => {
        mutations
            .flatMap(mutation => [...mutation.addedNodes])
            .filter(node => node.nodeType === 1) // Only element nodes
            .forEach(node => {
                if (node.matches(copySelector)) { initCopyBtn(node); }
                node.querySelectorAll(copySelector).forEach(el => initCopyBtn(el));
            });
    }).observe(document.body, {
        childList: true,
        subtree: true
    });
}

function initNewsletterForm() {
    let newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const form = e.target;

        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const email = document.getElementById('newsletter-email').value;

        // Create URL with JSONP callback
        const timestamp = new Date().getTime();
        const callbackName = `ml_callback_${timestamp}`;
        const baseUrl = 'https://sprinters.us16.list-manage.com/subscribe/post-json';
        const queryParams = new URLSearchParams({
            u: '9fdbd60c88530df7c7e182221',
            id: '1758545ed5',
            f_id: '00cbc2e1f0',
            EMAIL: email,
            c: callbackName
        });

        // Define callback function
        window[callbackName] = function(response) {
            if (response.result === 'success') {
                newsletterForm.classList.add('d-none');
                document.getElementById('newsletter-confirm').textContent = "Thanks for joining! We sent a confirmation email to " + email;
                document.getElementById('newsletter-confirm').classList.remove('d-none');
            }

            // Cleanup
            document.body.removeChild(script);
            delete window[callbackName];
        };

        // Create and append script element
        const script = document.createElement('script');
        script.src = `${baseUrl}?${queryParams.toString()}`;
        document.body.appendChild(script);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('h2[id],h3[id]').forEach(function(link) {
        link.addEventListener('click', function() {
            window.location.hash = `#${(this.getAttribute('id'))}`;
        });
    });

    initCopyToClipboard();
    initNewsletterForm();
});
