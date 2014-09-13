$(document).ready(function() 
{
    var mainLogo = $(".sdunnLogo");
    var body = $("body");
    $(".toggleTheme").click(function()
    {
        body.toggleClass("dark");

        //Change logo to black or teal based on light/dark theme
        if(body.hasClass("dark"))
        {
            $(this).text("Light Theme");
            mainLogo.attr("src", "images/sdunnLogo-teal.png");
        }
        else
        {
            $(this).text("Dark Theme");
            mainLogo.attr("src", "images/sdunnLogo-black.png");
        }
    });

    mainLogo.hover(function()
    {
        //On hover change logo to white/orange based on light/dark theme
        if(body.hasClass("dark"))
        {
            mainLogo.attr("src", "images/smileLogo-white.png");
        }
        else
        {
            mainLogo.attr("src", "images/smileLogo-orange.png");
        }

    }, function()
    {
        //Revert back to original logo colors when mouse leaves
        if(body.hasClass("dark"))
        {
            mainLogo.attr("src", "images/sdunnLogo-teal.png");
        }
        else
        {
            mainLogo.attr("src", "images/sdunnLogo-teal.png");
        }

    });
});