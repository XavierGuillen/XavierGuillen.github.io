import { projects } from './ProjectData.js';

document.addEventListener("DOMContentLoaded", function() {
    const videoSlideshow = document.getElementById('video-slideshow');
    const headerMenuWrapper = document.getElementById('header-menu-wrapper');
    const projectInfoBtn = document.getElementById('project-info-btn');
    const projectTitle = document.getElementById('project-title');
    const projectDirector = document.getElementById('project-director');
    const projectCinematographer = document.getElementById('project-cinematographer');
    const projectProduction = document.getElementById('project-production');
    const videoCountIndicator = document.getElementById('video-count-indicator');
    const videoCountLink = document.getElementById('video-count-link');
    
    let currentIndex = parseInt(new URLSearchParams(window.location.search).get('index'), 10) || 0;

    function updateProjectInfo(project) {
        projectTitle.textContent = project.title;
        projectDirector.textContent = project.director;
        projectCinematographer.textContent = `DoP: ${project.cinematographer}`;
        projectProduction.textContent = `Prod. Co: ${project.productionCompany}`;
    
        const totalVideos = project.media.filter(media => media.type === 'video').length;
        videoCountIndicator.textContent = `1/${totalVideos}`;
        videoCountLink.href = `projectPage.html?id=${project.id}&index=${currentIndex}`;
    
        videoSlideshow.innerHTML = '';
    
        const firstVideo = project.media.find(media => media.type === 'video');
        if (firstVideo) {
            const iframe = document.createElement('iframe');
            iframe.src = firstVideo.src.replace('vimeo.com', 'player.vimeo.com/video') + '?autoplay=1&&muted=1&background=1&autopause=1';
            iframe.frameBorder = '0';
            iframe.allow = 'autoplay; fullscreen';
            iframe.style.pointerEvents = 'none';
        
            videoSlideshow.appendChild(iframe);

            iframe.onended = function() {
                currentIndex = (currentIndex + 1) % projects.length;
                updateProjectInfo(projects[currentIndex]);
            };
        }
    }

    updateProjectInfo(projects[currentIndex]); // Initialize the first project's video

    videoSlideshow.addEventListener('mousemove', function(event) {
        const rect = videoSlideshow.getBoundingClientRect();
        const x = event.clientX - rect.left;
        if (x < rect.width / 2) {
            videoSlideshow.classList.add('left-cursor');
            videoSlideshow.classList.remove('right-cursor');
        } else {
            videoSlideshow.classList.add('right-cursor');
            videoSlideshow.classList.remove('left-cursor');
        }
    });

    videoSlideshow.addEventListener('click', function(event) {
        if (headerMenuWrapper.classList.contains('header-menu-opened')) {
            event.stopPropagation(); // Prevent navigation if menu is open
            return; // Optionally, toggle the menu closed here if desired
        }
        // Handling click navigation within the slideshow
        const rect = videoSlideshow.getBoundingClientRect();
        const x = event.clientX - rect.left;
        if (x < rect.width / 2) {
            currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        } else {
            currentIndex = (currentIndex + 1) % projects.length;
        }
        updateProjectInfo(projects[currentIndex]);
    });
});

// Setting a cookie in client-side JavaScript
document.cookie = "name=value; SameSite=None; Secure";
