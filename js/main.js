$(document).ready(function() 
{
    var body = $("body");
    $(".toggleTheme").click(function()
    {
        body.toggleClass("dark");

        //Change logo to black or teal based on light/dark theme
        if(body.hasClass("dark"))
        {
            $(this).text("Light Theme");
        }
        else
        {
            $(this).text("Dark Theme");
        }
    });
});