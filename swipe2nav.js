// Released under MIT License
var sensitivity = 50;
var timeout = false;
var movement = 0;
var clearMovementTimer = null;
var forceDisable = false;
var pinchZoomScale = 1;

// Modify movement variable and handle its reset
const handleMovement = function(direction)
{
    // Clear existing reset timer
    clearTimeout(clearMovementTimer);
    // Set up new reset timer
    clearMovementTimer = setTimeout(function() { movement = 0; }, 800);
    // Modify movement
    movement += direction;
}


// Return direction for `history.go()` function
const figureoutDirection = function(event)
{
    const deltaX = event.deltaX;
    const deltaY = event.deltaY;
    let direction = NaN;

    const isAtEdge = $el => $el.scrollLeft() <= 0 || $el.scrollLeft() + $el.outerWidth() >= $el[0].scrollWidth;

    // We start from the element under the mouse pointer (event.target),
    // and move up the DOM tree, looking for an element that is not at
    // the scroll edge (ie. can be scrolled leftward or rightward). If
    // such an element exists, then we want to fail the if condition below
    // and return NaN so that we scroll instead of going back. In this case,
    // at the end of the loop `el` will be the element that can be scrolled.
    let el = event.target;
    let atEdge = true;
    while(el !== null)
    {
        atEdge = isAtEdge($(el));
        if(!atEdge) break;
        el = el.parentElement;
    }

    // Check we are at either horizontal edge of the page
    if (atEdge)
    {
        // Check we are horizontal scrolling and not vertically
        if (Math.abs(deltaX) > 0 && Math.abs(deltaY) == 0)
        {
            // Go forwards
            if (deltaX > 0)
                direction = 1;

            // Go forwards
            else if (deltaX < 0)
                direction = -1;
        }
    }

    // If we just hit the edge of something being scrolled right
    // after this, we want a little timeout so the user has time
    // to stop scrolling at the leftmost/rightmost part.
    if(el && !isAtEdge($(el)))
    {
        timeout = true;
        // This timeout is a bit longer since it takes the user
        // a short while to realize that they're at the edge and
        // stop scrolling.
        setTimeout(() => {
            timeout = false;
        }, 2000);
        direction = NaN;
    }

    return direction;
}


// Main navigation function
const navigate = function(event)
{
    // Do nothing when forceDisable is true
    if (forceDisable) return;
    
    // Event is scroll event from jquery.mousewheel
    goDir = figureoutDirection(event);
    // If direction is set disable scroll navigation and go
    if (!isNaN(goDir))
    {
        handleMovement(goDir);
        if (Math.abs(movement) > sensitivity)
        {
            // Hands off mouse events
            $(document).off("wheel");
            // Check we are not waiting on timeout
            if (!timeout)
            {
                // Lock out timer
                timeout = true;
                // Navigate
                history.go(goDir);
                // Re-enable navigation after 500ms to prevent accidental gestures
                setTimeout(function() { enableNav() }, 500);
            }
        }
    }
}


// Temporary solution to https://github.com/totu/Swipe2Nav/issues/11
// Disable functionality in pinch-zoom state 
function handleResize() 
{
    pinchZoomScale = window.visualViewport.scale;
    forceDisable = (pinchZoomScale > 1);
}   

// Enable addon functionality
const enableNav = function()
{
    // Detect initial pinch zoom state
    handleResize();
    // Hook handle resize function to detect pinch zoom
    window.visualViewport.addEventListener('resize', handleResize);

    // Hook navigate function to mouse movement
    $(document).on('mousewheel', navigate);
    // Reset timeout boolean
    clearTimeout(clearMovementTimer);
    movement = 0;
    timeout = false;
}


// First run so we can get it working
enableNav();

// Just incase some pages are doing weird things
$(document).ready(function() {
    enableNav();
});
