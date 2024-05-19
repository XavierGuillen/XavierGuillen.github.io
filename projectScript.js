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
    // Updating existing elements in the HTML
    const projectInfoBtn = document.getElementById('project-info-btn');
    const projectTitle = document.getElementById('project-title');
    const projectDirector = document.getElementById('project-director');
    const projectCinematographer = document.getElementById('project-cinematographer');
    const projectProduction = document.getElementById('project-production');

    projectTitle.textContent = project.title;
    projectDirector.textContent = `${project.director}`;
    projectCinematographer.textContent = `DoP: ${project.cinematographer}`;
    projectProduction.textContent = `Prod. Co: ${project.productionCompany}`;

    // Appending videos to the grid
    const videoGrid = document.getElementById('video-grid');
    videoGrid.innerHTML = ''; // Clear existing content

    // Change grid layout if there are more than four videos
    if (project.videos.length > 4) {
        videoGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else {
        videoGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }

    project.videos.forEach(videoFile => {
        const videoElement = document.createElement('video');
        videoElement.src = `videos/${videoFile}`;
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.style.objectFit = 'cover';
        videoElement.controls = false;
        videoElement.preload = 'auto';  // Advise the browser to preload the video
    
        videoElement.onended = function() {
            this.play();  // Ensure the video loops by playing it again when it ends
        };

        videoElement.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                videoElement.requestFullscreen().catch(err => {
                    console.log(`Error attempting to enable full-screen mode: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });

        document.addEventListener('fullscreenchange', function() {
            if (!document.fullscreenElement && videoElement.paused) {
                videoElement.play();
                videoElement.controls = false;
            }
        });

        videoGrid.appendChild(videoElement);

        videoElement.preload = 'auto';

    });
    
}