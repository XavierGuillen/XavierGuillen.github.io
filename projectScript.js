import { projects } from './ProjectData.js';

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    const project = projects.find(p => p.id === projectId);
    if (project) {
        updateProjectInfo(project);
        populateMediaGrid(project);
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

document.addEventListener('mousemove', function() {
    const closeButton = document.getElementById('close-btn');
    closeButton.classList.remove('hidden');
    clearTimeout(window.closeButtonTimeout);
    window.closeButtonTimeout = setTimeout(() => {
        closeButton.classList.add('hidden');
    }, 500); // Adjust the timeout duration as needed
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
}

function populateMediaGrid(project) {
    const videoWrapper = document.getElementById('video-wrapper');
    videoWrapper.innerHTML = ''; // Clear existing content
    project.media.forEach((media, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        videoWrapper.appendChild(slide);

        let container;
        if (media.type === 'video') {
            container = document.createElement('div');
            container.classList.add('video-container');
            const iframeContainer = document.createElement('div');
            iframeContainer.classList.add('responsive-iframe-container');
            const iframe = document.createElement('iframe');
            iframe.src = media.src.replace('vimeo.com', 'player.vimeo.com/video') + '?background=1&loop=1';
            iframe.frameBorder = '0';
            iframe.allow = 'autoplay; fullscreen';
            iframeContainer.appendChild(iframe);
            const overlayDiv = document.createElement('div');
            overlayDiv.classList.add('overlay-div');
            iframeContainer.appendChild(overlayDiv);
            container.appendChild(iframeContainer);

            // Attach event listener to each overlayDiv
            overlayDiv.addEventListener('click', function() {
                toggleFullScreen(container);
            });
        } else {
            container = document.createElement('div');
            container.classList.add('image-container');
            const img = document.createElement('img');
            img.src = media.src;
            container.appendChild(img);
        }
        slide.appendChild(container);

        // Create custom controls for each video
        if (media.type === 'video') {
            const controls = createCustomControls(index);
            container.appendChild(controls);
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            container.appendChild(overlay);

            // Initialize Vimeo player for each video
            initializeVimeoPlayer(container.querySelector('iframe'), index);
        }
    });
}

function createCustomControls(index) {
    const controls = document.createElement('div');
    controls.classList.add('custom-controls');

    // Removed the fullscreen button creation and addition
    return controls;
}

function initializeVimeoPlayer(iframe, index) {
    const vimeoPlayer = new Vimeo.Player(iframe);

    // Check if the fullscreen button exists before adding an event listener
    const fullscreenButton = document.getElementById(`fullscreen-button-${index}`);
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                iframe.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            } else {
                document.exitFullscreen();
            }
        });
    }
}

function toggleFullScreen(videoContainer) {
    const scrollContainer = document.getElementById('video-wrapper'); // Adjust this if your scroll container has a different ID

    if (!document.fullscreenElement) {
        // Disable scroll snap before entering fullscreen
        scrollContainer.style.scrollSnapType = 'none';

        if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen().then(() => {
                // Re-enable scroll snap after exiting fullscreen
                document.addEventListener('fullscreenchange', function restoreSnap() {
                    if (!document.fullscreenElement) {
                        scrollContainer.style.scrollSnapType = 'y mandatory';
                        document.removeEventListener('fullscreenchange', restoreSnap);
                    }
                });
            });
        } else if (videoContainer.mozRequestFullScreen) { /* Firefox */
            videoContainer.mozRequestFullScreen();
        } else if (videoContainer.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            videoContainer.webkitRequestFullscreen();
        } else if (videoContainer.msRequestFullscreen) { /* IE/Edge */
            videoContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}

function setupVideoControls() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const videos = document.querySelectorAll('iframe');
    videos.forEach(video => {
        if (isMobile) {
            // Assuming the iframe is from Vimeo and allows adding parameters
            video.src += "&controls=1";
        }
    });
}
