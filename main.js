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
        projectCinematographer.textContent = `Cinematographer: ${project.cinematographer}`;
        projectProduction.textContent = `Prod. Co.: ${project.productionCompany}`;

        const totalVideos = project.videos.length;
        videoCountIndicator.textContent = `1/${totalVideos}`;
        videoCountLink.href = `projectPage.html?id=${project.id}&index=${currentIndex}`;

        videoSlideshow.innerHTML = '';
        const videoWrapper = document.createElement('div');
        videoWrapper.style.position = 'relative';
        videoWrapper.style.width = '100%';
        videoWrapper.style.height = '100%';

        const videoElement = document.createElement('video');
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';

        const sourceMP4 = document.createElement('source');
        sourceMP4.src = `videos/${project.videos[0].replace(/\..+$/, '.mp4')}`;
        sourceMP4.type = 'video/mp4';

        const sourceWebM = document.createElement('source');
        sourceWebM.src = `videos/${project.videos[0].replace(/\..+$/, '.webm')}`;
        sourceWebM.type = 'video/webm';

        videoElement.appendChild(sourceMP4);
        videoElement.appendChild(sourceWebM);
        videoWrapper.appendChild(videoElement);
        videoSlideshow.appendChild(videoWrapper);

        videoElement.onended = function() {
            currentIndex = (currentIndex + 1) % projects.length;
            updateProjectInfo(projects[currentIndex]);
        };
    }

    updateProjectInfo(projects[currentIndex]); // Initialize the first project's video

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
