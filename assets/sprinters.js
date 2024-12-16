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

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('h2[id],h3[id]').forEach(function(link) {
        link.addEventListener('click', function() {
            window.location.hash = `#${(this.getAttribute('id'))}`;
        });
    });

    initCopyToClipboard();
});
