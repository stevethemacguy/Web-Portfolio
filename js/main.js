$(document).ready(function() 
{
    //If we're using the dark theme...
    //change the logo
    $(".dark").find(".sdunnLogo").attr("src", "images/sdunnLogo-teal.png");

    $(".dark").find(".sdunnLogo").hover(function() {
        $(this).attr("src", "images/smileLogo-white.png");
    }, function()
    {
        $(this).attr("src", "images/sdunnLogo-teal.png");
    });

    //If we're using the light theme...
    $(".sdunnLogo").hover(function() {
        $(this).attr("src", "images/smileLogo-orange.png");
    }, function()
    {
        $(this).attr("src", "images/sdunnLogo-black.png");
    });
});