// Released under MIT License
var sensitivity = 25;
var timeout = false;
var movement = 0;
var clearMovementTimer = null;

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

    return direction;
}


// Main navigation function
const navigate = function(event)
{
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


// Enable addon functionality
const enableNav = function()
{
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