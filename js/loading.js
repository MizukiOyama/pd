document.addEventListener("DOMContentLoaded", function() {
    var svgElement = document.getElementById('svgElement');
    if (svgElement) {
        svgElement.classList.add('active');
    } else {
        console.error('SVG element not found');
    }
});
