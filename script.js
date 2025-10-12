document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const jumpLinks = document.querySelectorAll('a[data-jump-to-tab]');

    // Function to open a specific tab
    function openTab(tabName) {
        // Hide all tab contents
        tabContents.forEach(tab => {
            tab.style.display = 'none';
        });

        // Deactivate all tab links
        tabLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show the target tab content and activate its link
        const targetContent = document.getElementById(tabName);
        const targetLink = document.querySelector(`.tab-link[data-tab-target="${tabName}"]`);
        
        if (targetContent) {
            targetContent.style.display = 'block';
        }
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }

    // Add click listeners to all tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabName = link.dataset.tabTarget;
            if (tabName) {
                openTab(tabName);
            }
        });
    });

    // Add click listeners to all jump links
    jumpLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const tabName = link.dataset.jumpToTab;
            const anchorId = link.dataset.jumpToAnchor;
            
            if (tabName) {
                // Switch to the correct tab first
                openTab(tabName);
            }

            // Then scroll to the anchor
            if (anchorId) {
                requestAnimationFrame(() => {
                    const anchorElement = document.getElementById(anchorId);
                    if (anchorElement) {
                        anchorElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            }
        });
    });

    // Open the default tab on page load
    const defaultOpen = document.getElementById('defaultOpen');
    if (defaultOpen) {
        // The click event will be handled by our new listener
        defaultOpen.click();
    }
});