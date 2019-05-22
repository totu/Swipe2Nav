// Main navigation function
// Event is scroll event from jquery.mousewheel
// From that we can determine which direction we are scrolling
const navigate = function(event)
{
    const deltaX = event.deltaX;
    const deltaY = event.deltaY;
    let goDir = NaN;

    // Check for horizontal scrolling;
    if (Math.abs(deltaX) > 0) {

        // Check that we are not scrolling vertically and set direction
        if (deltaX > 0 && Math.abs(deltaY) == 0)
        {
            // Go forwards
            goDir = 1;
        }

        else if (deltaX < 0 && Math.abs(deltaY) == 0)
        {
            // Go forwards
            goDir = -1;
        }
    }

    // If something set direction then disable scroll nav and go
    // Disabling is done for 500ms so there wont be accidental navigations
    if (goDir != NaN)
    {
        $(document).off("wheel");
        history.go(goDir);
        setTimeout(function() {enableNav();}, 500);
    }
}

// Hook navigate function to mouse movement
const enableNav = function()
{
    $(document).on('mousewheel', navigate);
}

// First run so we can get it working
enableNav();