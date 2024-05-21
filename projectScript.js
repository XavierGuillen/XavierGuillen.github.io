// projectScript.js
import { projects } from './ProjectData.js';

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    const project = projects.find(p => p.id === projectId);
    if (project) {
        updateProjectInfo(project);
    } else {
        console.error('Project not found');
        // Handle the case where the project is not found
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index'); // Get the index parameter from the URL

    const closeButton = document.getElementById('close-btn');
    if (closeButton) {
        closeButton.href = `index.html?index=${index}`; // Set the href to include the index
    }
});

function updateProjectInfo(project) {
    const projectTitle = document.getElementById('project-title');
    const projectDirector = document.getElementById('project-director');
    const projectCinematographer = document.getElementById('project-cinematographer');
    const projectProduction = document.getElementById('project-production');

    projectTitle.textContent = project.title;
    projectDirector.textContent = `${project.director}`;
    projectCinematographer.textContent = `DoP: ${project.cinematographer}`;
    projectProduction.textContent = `Prod. Co: ${project.productionCompany}`;

    const videoGrid = document.getElementById('video-grid');
    videoGrid.innerHTML = ''; // Clear existing content

    videoGrid.classList.add('video-grid'); // Add the CSS class

    project.videos.forEach(videoUrl => {
        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('video-wrapper'); // Add the CSS class

        const iframe = document.createElement('iframe');
        iframe.src = videoUrl.replace('vimeo.com', 'player.vimeo.com/video') + '?autoplay=1&loop=1&muted=1&background=1';
        iframe.frameBorder = '0';
        

        videoWrapper.appendChild(iframe);
        videoGrid.appendChild(videoWrapper);
    });
}






