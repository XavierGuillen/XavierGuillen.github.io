import { projects } from './ProjectData.js';

document.addEventListener('DOMContentLoaded', function() {
    const filmsList = document.getElementById('films-list');
    const adsList = document.getElementById('ads-list');
    const musicList = document.getElementById('music-list');
    const otherList = document.getElementById('other-list');
    const topNavigation = document.getElementById('top-navigation');
    const headerMenuWrapper = document.getElementById('header-menu-wrapper');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const closeMenuContainer = document.getElementById('close-menu-container');

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        topNavigation.addEventListener('click', function(event) {
            toggleDropdownMenu();
            event.stopPropagation();
        });
    } else {
        headerMenuWrapper.addEventListener('mouseleave', function() {
            if (headerMenuWrapper.classList.contains('header-menu-opened')) {
                closeDropdownMenu();
            }
        });
    }

    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = project.title;
        listItem.onclick = () => {
            window.location.href = `projectPage.html?id=${project.id}`;
        };

        switch (project.category) {
            case 'film':
                filmsList.appendChild(listItem);
                break;
            case 'ad':
                adsList.appendChild(listItem);
                break;
            case 'music':
                musicList.appendChild(listItem);
                break;
            case 'other':
                otherList.appendChild(listItem);
                break;
        }
    });

    function openDropdownMenu() {
        const videoCountWrapperMobile = document.getElementById('video-count-wrapper-mobile');
        const closeBtnMobile = document.getElementById('close-btn-mobile');
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        dropdownMenu.style.display = 'flex';
        dropdownMenu.style.maxWidth = 'fit-content'; // Temporarily set to fit-content to get the correct width
        const scrollHeight = dropdownMenu.scrollHeight + 'px';
        const scrollWidth = dropdownMenu.scrollWidth + 'px'; // Store the calculated width
        dropdownMenu.style.maxHeight = '0';
        dropdownMenu.style.maxWidth = '0';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'scale(0.95)';
        setTimeout(() => {
            dropdownMenu.style.maxHeight = scrollHeight;
            dropdownMenu.style.maxWidth = scrollWidth; // Animate to the stored width
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.transform = 'scale(1)';
        }, 10); // Small delay to ensure the display change is registered
        headerMenuWrapper.classList.add('header-menu-opened');
        closeMenuContainer.style.display = 'block';
        if (isMobile) {
            videoCountWrapperMobile.style.display = 'none'; // Hide video-count-wrapper-mobile
            closeBtnMobile.style.display = 'none'; // Hide close-btn-mobile
        }
    }

    function closeDropdownMenu() {
        const videoCountWrapperMobile = document.getElementById('video-count-wrapper-mobile');
        const closeBtnMobile = document.getElementById('close-btn-mobile');
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        dropdownMenu.style.maxHeight = '0';
        dropdownMenu.style.maxWidth = '0';
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.transform = 'scale(0.95)';
        headerMenuWrapper.classList.remove('header-menu-opened');
        setTimeout(() => {
            dropdownMenu.style.display = 'none';
            closeMenuContainer.style.display = 'none';
            if (isMobile) {
                videoCountWrapperMobile.style.display = 'block'; // Show video-count-wrapper-mobile
                closeBtnMobile.style.display = 'block'; // Show close-btn-mobile
            }
        }, 100); // Match this timeout to the transition duration
    }

    function toggleDropdownMenu() {
        if (headerMenuWrapper.classList.contains('header-menu-opened')) {
            closeDropdownMenu();
        } else {
            openDropdownMenu();
        }
    }

    topNavigation.addEventListener('mouseenter', function(event) {
        if (!headerMenuWrapper.classList.contains('header-menu-opened')) {
            toggleDropdownMenu();
        }
        event.stopPropagation();
    });

    if (isMobile) {
        document.addEventListener('click', function(event) {
            if (!dropdownMenu.contains(event.target) && !topNavigation.contains(event.target) && headerMenuWrapper.classList.contains('header-menu-opened')) {
                toggleDropdownMenu();
                event.stopPropagation();
            }
        });
    }

    closeMenuContainer.addEventListener('click', function() {
        toggleDropdownMenu(); // This will close the menu
    });

    // Add event listeners to close the menu when hovering over the about or contact buttons
    document.getElementById('about-btn').addEventListener('mouseenter', closeDropdownMenu);
    document.getElementById('contact-btn').addEventListener('mouseenter', closeDropdownMenu);
});
